import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Setup Scene, Camera, Renderer
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
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight1.position.set(5, 5, 5)
    directionalLight1.castShadow = true
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0x4ecdc4, 0.4)
    directionalLight2.position.set(-5, -5, -5)
    scene.add(directionalLight2)

    // Load GLB model
    const loader = new GLTFLoader()
    loader.load(
      '/credit_card.glb',
      (gltf) => {
        const model = gltf.scene
        
        // Enable shadows and materials
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            // Add some material properties for better appearance
            if (child.material) {
              child.material.metalness = 0.3
              child.material.roughness = 0.4
            }
          }
        })

        // Create a parent group first - this will be our rotation pivot
        const pivotGroup = new THREE.Group()
        pivotGroup.position.set(0.2, 8.2, 0) // Shift more left (negative X) and more up (positive Y)
        pivotGroup.add(model)
        
        // Calculate bounding box to find center and size (after adding to group)
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        
        // Calculate scale to fit in view (leave some padding)
        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = camera.fov * (Math.PI / 180)
        const cameraZ = camera.position.z
        const visibleHeight = 2 * Math.tan(fov / 2) * cameraZ
        const visibleWidth = visibleHeight * (container.clientWidth / container.clientHeight)
        const scale = Math.min(visibleWidth, visibleHeight) / maxDim * 0.9 // Increased from 0.6 to 0.9 for larger card
        
        model.scale.set(scale, scale, scale)
        
        // Recalculate bounding box after scaling to get the new center
        const boxAfterScale = new THREE.Box3().setFromObject(model)
        const centerAfterScale = boxAfterScale.getCenter(new THREE.Vector3())
        
        // Center the model within the pivot group by offsetting its position
        // This ensures rotation happens around the card's center
        model.position.x = -centerAfterScale.x
        model.position.y = -centerAfterScale.y
        model.position.z = -centerAfterScale.z
        // Rotate to show front face of the card (with card information)
        pivotGroup.rotation.y = (-70 * Math.PI) / 180 
        pivotGroup.rotation.x = (-28 * Math.PI) / 180 
        pivotGroup.rotation.z = 0 // No roll
        
        scene.add(pivotGroup)
        modelRef.current = pivotGroup // Store the pivot group for rotation
      },
      (progress) => {
        // Loading progress
        console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%')
      },
      (error) => {
        console.error('Error loading model:', error)
      }
    )

    // Mouse drag controls
    const handleMouseDown = (event) => {
      isDraggingRef.current = true
      // Capture mouse position relative to the container, not the window
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

      // Only apply rotation if there's meaningful movement (threshold to prevent micro-movements)
      if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
        modelRef.current.rotation.y += deltaX * 0.01
        modelRef.current.rotation.x += deltaY * 0.01

        // Limit vertical rotation
        modelRef.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, modelRef.current.rotation.x))

        previousMousePositionRef.current = {
          x: currentX,
          y: currentY
        }
      }
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      container.style.cursor = 'grab'
    }

    const handleMouseLeave = () => {
      isDraggingRef.current = false
      container.style.cursor = 'grab'
    }

    // Add event listeners
    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.style.cursor = 'grab'

    // Animation loop (just for rendering, no automatic rotation)
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose()
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => mat.dispose())
              } else {
                child.material.dispose()
              }
            }
          }
        })
      }
    }
  }, [])

  return (
    <section id="fintech" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto fade-in-section">
        <h2 className="text-4xl font-bold mb-8 flex items-center">
          <span className="text-[#4ecdc4] text-2xl mr-4">04.</span> Fintech
        </h2>

        <div className="glass-panel p-8 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* 3D Model Container */}
            <div className="w-full">
              <div className="flex items-center justify-center mb-2">
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/009/312/392/non_2x/360-rotate-3d-icon-model-cartoon-style-concept-render-illustration-free-png.png" 
                  alt="Rotate icon" 
                  className="w-16 h-16 opacity-70"
                />
              </div>
              <div className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
                <div ref={containerRef} className="w-full h-full" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-4">
                Financial Technology Innovation
              </h3>
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

