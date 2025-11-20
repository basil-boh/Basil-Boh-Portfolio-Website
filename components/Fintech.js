import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function Fintech() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const modelRef = useRef(null)
  const animationFrameRef = useRef(null)
  const isDraggingRef = useRef(false)
  const previousMousePositionRef = useRef({ x: 0, y: 0 })
  const loaderRef = useRef(null)
  const pointLightRef = useRef(null)
  const pointLight2Ref = useRef(null) // Ref for second light
  const spotLightRef = useRef(null)
  const [currentModelIndex, setCurrentModelIndex] = useState(0)
  
  const models = [
    { path: '/credit_card.glb', name: 'Credit Card' },
    { path: '/bitcoin-2.glb', name: 'Bitcoin' },
    { path: '/payment_terminal_test.glb', name: 'Payment Terminal' }
  ]

  // 1. INITIAL SCENE SETUP
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()
    scene.background = null // Transparent background
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 30, 50)
    camera.lookAt(0, 0, -20)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    // Important for correct color output
    renderer.outputColorSpace = THREE.SRGBColorSpace 
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Base lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight1.position.set(5, 5, 5)
    directionalLight1.castShadow = true
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0x4ecdc4, 0.4)
    directionalLight2.position.set(-5, -5, -5)
    scene.add(directionalLight2)

    loaderRef.current = new GLTFLoader()

    // -- CONTROLS LOGIC --
    const handleMouseDown = (event) => {
      isDraggingRef.current = true
      const rect = container.getBoundingClientRect()
      previousMousePositionRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
      container.style.cursor = 'grabbing'
      event.preventDefault()
      event.stopPropagation()
    }

    const handleMouseMove = (event) => {
      if (!isDraggingRef.current || !modelRef.current) return

      const rect = container.getBoundingClientRect()
      const currentX = event.clientX - rect.left
      const currentY = event.clientY - rect.top
      
      const deltaX = currentX - previousMousePositionRef.current.x
      const deltaY = currentY - previousMousePositionRef.current.y

      if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
        modelRef.current.rotation.y += deltaX * 0.01
        modelRef.current.rotation.x += deltaY * 0.01
        modelRef.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, modelRef.current.rotation.x))

        previousMousePositionRef.current = { x: currentX, y: currentY }
      }
    }

    const handleMouseUp = () => { isDraggingRef.current = false; container.style.cursor = 'grab'; }
    const handleMouseLeave = () => { isDraggingRef.current = false; container.style.cursor = 'grab'; }

    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.style.cursor = 'grab'

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
      // Initial cleanup of model
      if (modelRef.current) {
        scene.remove(modelRef.current)
      }
    }
  }, [])

  // 2. MODEL LOADING AND MATERIAL FIXES
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current || !containerRef.current || !loaderRef.current) return

    const scene = sceneRef.current
    const camera = cameraRef.current
    const container = containerRef.current
    const loader = loaderRef.current
    const modelPath = models[currentModelIndex].path

    // Cleanup previous model
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose()
          if (child.material) {
            if (Array.isArray(child.material)) child.material.forEach((mat) => mat.dispose())
            else child.material.dispose()
          }
        }
      })
      scene.remove(modelRef.current)
      modelRef.current = null
    }

    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene.clone()
        
        // --- MATERIAL AND APPEARANCE SETTINGS ---
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            
              if (child.material) {
                if (currentModelIndex === 1) {
                  // === BITCOIN - PRESERVE DETAILS WITH SHINE ===
                  
                  // Don't override color - let the original texture show through
                  // Only slightly enhance the color if it exists, don't force it
                  if (child.material.color) {
                    // Slightly brighten the existing color to enhance visibility
                    child.material.color.multiplyScalar(1.2)
                  }
                  
                  // High Shine Settings - but preserve texture details
                  child.material.metalness = 0.9 // High but not 1.0 to preserve some detail
                  child.material.roughness = 0.2 // Smooth but not too smooth to show details
                  
                  // Remove or minimize emissive - it washes out details
                  if (child.material.emissive) {
                    child.material.emissiveIntensity = 0
                  }

                  child.material.needsUpdate = true
                } else if (currentModelIndex === 2) {
                  // Payment Terminal - standard properties
                  child.material.metalness = 0.3
                  child.material.roughness = 0.4
                  if(child.material.emissive) child.material.emissiveIntensity = 0
                } else {
                  // Credit card - standard properties
                  child.material.metalness = 0.3
                  child.material.roughness = 0.4
                  // Reset emissive in case reused material
                  if(child.material.emissive) child.material.emissiveIntensity = 0
                }
              }
          }
        })

        // Group and Pivot Logic
        const pivotGroup = new THREE.Group()
        if (currentModelIndex === 0) pivotGroup.position.set(0.2, 8.2, 0)
        else pivotGroup.position.set(0, 0, 0)
        
        pivotGroup.add(model)
        
        // Centering Logic
        const box = new THREE.Box3().setFromObject(model)
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = camera.fov * (Math.PI / 180)
        const cameraZ = camera.position.z
        const visibleHeight = 2 * Math.tan(fov / 2) * cameraZ
        const visibleWidth = visibleHeight * (container.clientWidth / container.clientHeight)
        // Different scale for each model
        const scaleMultiplier = currentModelIndex === 1 ? 0.6 : currentModelIndex === 2 ? 0.7 : 0.9
        const scale = Math.min(visibleWidth, visibleHeight) / maxDim * scaleMultiplier
        
        model.scale.set(scale, scale, scale)
        
        const boxAfterScale = new THREE.Box3().setFromObject(model)
        const centerAfterScale = boxAfterScale.getCenter(new THREE.Vector3())
        model.position.copy(centerAfterScale).multiplyScalar(-1)
        
        if (currentModelIndex === 0) {
          pivotGroup.rotation.y = (-70 * Math.PI) / 180 
          pivotGroup.rotation.x = (-28 * Math.PI) / 180 
        } else if (currentModelIndex === 1) {
          // Bitcoin - show from the front
          pivotGroup.rotation.y = 5.15
          pivotGroup.rotation.x = -0.2
        } else {
          // Payment Terminal - show from the front (convert degrees to radians)
          pivotGroup.rotation.y = (-130 * Math.PI) / 180
          pivotGroup.rotation.x = (50 * Math.PI) / 180
        }
        
        scene.add(pivotGroup)
        modelRef.current = pivotGroup
        
        // Camera Position
        if (currentModelIndex === 1) {
          camera.position.set(0, 0, 50)
          camera.lookAt(0, 0, 0)
        } else if (currentModelIndex === 2) {
          camera.position.set(0, 0, 50)
          camera.lookAt(0, 0, 0)
        } else {
          camera.position.set(0, 30, 50)
          camera.lookAt(0, 0, -20)
        }
        
        // --- LIGHTING ADJUSTMENTS FOR SHINE ---
        // Clear specific lights first
        if (pointLightRef.current) { scene.remove(pointLightRef.current); pointLightRef.current.dispose(); pointLightRef.current = null; }
        if (pointLight2Ref.current) { scene.remove(pointLight2Ref.current); pointLight2Ref.current.dispose(); pointLight2Ref.current = null; }
        if (spotLightRef.current) { scene.remove(spotLightRef.current); scene.remove(spotLightRef.current.target); spotLightRef.current.dispose(); spotLightRef.current = null; }

          if (currentModelIndex === 1) {
            // BITCOIN LIGHTING - Maximum brightness for visibility
            
            // 1. Bright point lights for additional illumination
            const pointLight1 = new THREE.PointLight(0xffffff, 3.0, 100)
            pointLight1.position.set(15, 15, 20)
            scene.add(pointLight1)
            pointLightRef.current = pointLight1
            
            // 2. Bright fill light
            const pointLight2 = new THREE.PointLight(0xffffff, 2.5, 100)
            pointLight2.position.set(-15, -10, 15)
            scene.add(pointLight2)
            pointLight2Ref.current = pointLight2
            
            // 3. Additional top light for overall brightness
            const pointLight3 = new THREE.PointLight(0xffffff, 2.0, 100)
            pointLight3.position.set(0, 20, 10)
            scene.add(pointLight3)
            
            // 4. Maximum Ambient - very bright base lighting
            scene.children.forEach((child) => {
              if (child.type === 'AmbientLight') child.intensity = 25.5 // Increased from 2.5
              // Very strong white directional light for base illumination
              if (child.type === 'DirectionalLight' && child.color.getHex() === 0xffffff) child.intensity = 4.0 // Increased from 3.0
              // Increased cyan light for more fill
              if (child.type === 'DirectionalLight' && child.color.getHex() === 0x4ecdc4) child.intensity = 1.0
            })

        } else if (currentModelIndex === 2) {
          // PAYMENT TERMINAL LIGHTING - Increased brightness
          
          // 1. Bright point lights for additional illumination
          const pointLight1 = new THREE.PointLight(0xffffff, 2.0, 100)
          pointLight1.position.set(15, 15, 20)
          scene.add(pointLight1)
          pointLightRef.current = pointLight1
          
          // 2. Bright fill light
          const pointLight2 = new THREE.PointLight(0xffffff, 1.5, 100)
          pointLight2.position.set(-15, -10, 15)
          scene.add(pointLight2)
          pointLight2Ref.current = pointLight2
          
          // 3. Additional top light for overall brightness
          const pointLight3 = new THREE.PointLight(0xffffff, 1.2, 100)
          pointLight3.position.set(0, 20, 10)
          scene.add(pointLight3)
          
          // 4. Increased Ambient and Directional lights
          scene.children.forEach((child) => {
            if (child.type === 'AmbientLight') child.intensity = 1.5 // Increased from 0.6
            // Stronger white directional light
            if (child.type === 'DirectionalLight' && child.color.getHex() === 0xffffff) child.intensity = 1.5 // Increased from 0.8
            // Increased cyan light for more fill
            if (child.type === 'DirectionalLight' && child.color.getHex() === 0x4ecdc4) child.intensity = 0.6 // Increased from 0.4
          })

        } else {
          // CREDIT CARD LIGHTING (Reset)
          // Remove any extra point lights
          const lightsToRemove = []
          scene.children.forEach((child) => {
            if (child.type === 'PointLight' && child !== pointLightRef.current && child !== pointLight2Ref.current) {
              lightsToRemove.push(child)
            }
          })
          lightsToRemove.forEach((light) => {
            scene.remove(light)
            light.dispose()
          })
          
          scene.children.forEach((child) => {
            if (child.type === 'AmbientLight') child.intensity = 0.6
            if (child.type === 'DirectionalLight' && child.color.getHex() === 0x4ecdc4) child.intensity = 0.4
            if (child.type === 'DirectionalLight' && child.color.getHex() === 0xffffff) child.intensity = 0.8
          })
        }
      },
      (progress) => console.log('Loading:', (progress.loaded / progress.total) * 100 + '%'),
      (error) => console.error('Error loading:', error)
    )
  }, [currentModelIndex])

  const handlePrevious = () => setCurrentModelIndex((prev) => (prev === 0 ? models.length - 1 : prev - 1))
  const handleNext = () => setCurrentModelIndex((prev) => (prev === models.length - 1 ? 0 : prev + 1))

  return (
    <section id="fintech" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto fade-in-section">
        <h2 className="text-4xl font-bold mb-8 flex items-center">
          <span className="text-[#4ecdc4] text-2xl mr-4">04.</span> Fintech
        </h2>

        <div className="glass-panel p-8 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* 3D Model Container */}
            <div className="w-full relative">
              <div className="flex items-center justify-center mb-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-75">
                  <path d="M24 8L28 12L24 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M28 12C28 12 30 14 30 20" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M16 32L12 28L16 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M12 28C12 28 10 26 10 20" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <circle cx="20" cy="20" r="3" fill="white" opacity="0.8"/>
                </svg>
              </div>
              <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden relative">
                <div ref={containerRef} className="w-full h-full" />
                
                 <button onClick={handlePrevious} className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#4ecdc4]/20 hover:bg-[#4ecdc4]/40 backdrop-blur-sm rounded-full p-2 transition-all duration-200 z-10 border border-[#4ecdc4]/30" aria-label="Previous model">
                   <i className="ph ph-caret-left text-[#4ecdc4] text-lg"></i>
                 </button>
                 
                 <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#4ecdc4]/20 hover:bg-[#4ecdc4]/40 backdrop-blur-sm rounded-full p-2 transition-all duration-200 z-10 border border-[#4ecdc4]/30" aria-label="Next model">
                   <i className="ph ph-caret-right text-[#4ecdc4] text-lg"></i>
                 </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {models.map((_, index) => (
                    <button key={index} onClick={() => setCurrentModelIndex(index)} className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentModelIndex ? 'bg-[#4ecdc4] w-8' : 'bg-white/30 hover:bg-white/50'}`} aria-label={`Go to ${models[index].name}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-4">Financial Technology Innovation</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Exploring the intersection of technology and finance, I'm passionate about 
                building innovative solutions that make financial services more accessible, 
                secure, and efficient. From payment systems to blockchain technology, I'm 
                excited about the future of fintech.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <i className="ph ph-check-circle text-[#4ecdc4] text-xl mr-3"></i>
                  <span>Payment Processing Systems</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="ph ph-check-circle text-[#4ecdc4] text-xl mr-3"></i>
                  <span>Blockchain & Cryptocurrency</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="ph ph-check-circle text-[#4ecdc4] text-xl mr-3"></i>
                  <span>Financial Data Analytics</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <i className="ph ph-check-circle text-[#4ecdc4] text-xl mr-3"></i>
                  <span>Secure Transaction Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}