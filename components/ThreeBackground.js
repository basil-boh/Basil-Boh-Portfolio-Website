import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const shapeRef = useRef(null)
  const starsRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050505, 0.002)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 30
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 2. Create Geometry (Particles)

    // A. Background Starfield
    const starGeometry = new THREE.BufferGeometry()
    const starCount = 2000
    const starPositions = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 150
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
    })
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)
    starsRef.current = stars

    // B. The "Brain/Network" - Torus Knot Particles
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16)
    const material = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x4ecdc4,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const particlesGeometry = new THREE.BufferGeometry()
    const originalPositions = geometry.attributes.position.array
    const count = originalPositions.length / 3
    const densityMultiplier = 3
    const newPositions = new Float32Array(count * densityMultiplier * 3)
    const colors = new Float32Array(count * densityMultiplier * 3)

    const color1 = new THREE.Color(0x4ecdc4)
    const color2 = new THREE.Color(0x556270)

    for (let i = 0; i < count; i++) {
      const x = originalPositions[i * 3]
      const y = originalPositions[i * 3 + 1]
      const z = originalPositions[i * 3 + 2]

      for (let j = 0; j < densityMultiplier; j++) {
        const index = (i * densityMultiplier + j) * 3
        const noise = 0.5
        newPositions[index] = x + (Math.random() - 0.5) * noise
        newPositions[index + 1] = y + (Math.random() - 0.5) * noise
        newPositions[index + 2] = z + (Math.random() - 0.5) * noise

        const mixedColor = color1.clone().lerp(color2, Math.random())
        colors[index] = mixedColor.r
        colors[index + 1] = mixedColor.g
        colors[index + 2] = mixedColor.b
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    material.vertexColors = true
    material.color = new THREE.Color(0xffffff)

    const shape = new THREE.Points(particlesGeometry, material)
    scene.add(shape)
    shapeRef.current = shape

    // 3. Mouse Interaction & Animation Variables
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let scrollY = 0
    let isMouseDown = false
    let previousMouseX = 0
    let previousMouseY = 0

    const windowHalfX = window.innerWidth / 2
    const windowHalfY = window.innerHeight / 2

    const handleMouseMove = (event) => {
      mouseX = event.clientX - windowHalfX
      mouseY = event.clientY - windowHalfY
      
      if (isMouseDown) {
        // Calculate delta for smooth dragging
        const deltaX = (mouseX - previousMouseX) * 0.001
        const deltaY = (mouseY - previousMouseY) * 0.001
        
        targetX += deltaX
        targetY += deltaY
      }
      
      previousMouseX = mouseX
      previousMouseY = mouseY
    }

    const handleMouseDown = (event) => {
      isMouseDown = true
      mouseX = event.clientX - windowHalfX
      mouseY = event.clientY - windowHalfY
      previousMouseX = mouseX
      previousMouseY = mouseY
    }

    const handleMouseUp = () => {
      isMouseDown = false
    }

    const handleMouseLeave = () => {
      isMouseDown = false
    }

    const handleScroll = () => {
      scrollY = window.scrollY
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll)

    // 4. Animation Loop
    const clock = new THREE.Clock()

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()

      if (shapeRef.current) {
        shapeRef.current.rotation.y += 0.003
        shapeRef.current.rotation.x += 0.001
        shapeRef.current.rotation.z = scrollY * 0.002
        shapeRef.current.position.y = scrollY * 0.005
      }

      if (starsRef.current) {
        starsRef.current.rotation.y -= 0.0005
      }

      if (cameraRef.current) {
        if (isMouseDown) {
          // Smooth camera rotation while dragging
          cameraRef.current.rotation.y += 0.05 * (targetX - cameraRef.current.rotation.y)
          cameraRef.current.rotation.x += 0.05 * (targetY - cameraRef.current.rotation.x)
        } else {
          // Gradually return to center when not dragging
          targetX *= 0.95
          targetY *= 0.95
          cameraRef.current.rotation.y += 0.05 * (targetX - cameraRef.current.rotation.y)
          cameraRef.current.rotation.x += 0.05 * (targetY - cameraRef.current.rotation.x)
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }

      animationFrameRef.current = window.requestAnimationFrame(tick)
    }

    tick()

    // 5. Resize Handler
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener('resize', handleResize)

    // 6. Fade In Canvas
    setTimeout(() => {
      if (container) {
        container.style.opacity = 1
      }
    }, 100)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (rendererRef.current && container) {
        container.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }

      // Dispose geometries and materials
      if (shapeRef.current) {
        shapeRef.current.geometry.dispose()
        shapeRef.current.material.dispose()
      }
      if (starsRef.current) {
        starsRef.current.geometry.dispose()
        starsRef.current.material.dispose()
      }
    }
  }, [])

  return <div id="canvas-container" ref={containerRef} />
}

