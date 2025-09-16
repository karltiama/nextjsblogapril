'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Spline from '@splinetool/react-spline/next'

interface SplineOpacityDemoProps {
  splineUrl: string
  layerNames?: string[]
  opacityValue?: number
  transitionDuration?: number
}

export default function SplineOpacityAdvanced({ 
  splineUrl,
  layerNames = [
    'Layer1', // Top layer
    'Layer2', // Second layer  
    'Layer3', // Third layer
    'Layer4', // Fourth layer
    'Layer5', // Fifth layer
    'OpacityLayer' // Opacity layer
  ],
  opacityValue = 0.3,
  transitionDuration = 300
}: SplineOpacityDemoProps) {
  const splineRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const onLoad = useCallback((splineApp: any) => {
    splineRef.current = splineApp
    setIsLoaded(true)
    console.log('Spline scene loaded successfully')
    
    // Set up event listeners for your Spline objects
    setupEventListeners(splineApp)
  }, [])

  const onError = useCallback((error: any) => {
    console.error('Spline loading error:', error)
  }, [])

  // Set up event listeners for layer hover detection
  const setupEventListeners = (splineApp: any) => {
    try {
      // You'll need to configure your Spline scene to emit events
      // This is where you'd set up the actual hover detection
      layerNames.forEach((layerName, index) => {
        if (index < layerNames.length - 1) { // Skip the opacity layer
          const object = splineApp.findObjectByName(layerName)
          if (object) {
            // Set up hover events - this depends on your Spline scene configuration
            // You might need to add event listeners in your Spline scene itself
            console.log(`Setting up events for ${layerName}`)
          }
        }
      })
    } catch (error) {
      console.warn('Error setting up event listeners:', error)
    }
  }

  // Function to set layer opacity with smooth transition
  const setLayerOpacity = useCallback((layerName: string, opacity: number) => {
    if (!splineRef.current) return

    try {
      const object = splineRef.current.findObjectByName(layerName)
      if (object && object.material) {
        // Smooth transition
        const startOpacity = object.material.opacity || 1
        const duration = transitionDuration
        const startTime = Date.now()

        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function for smooth transition
          const easeInOut = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2

          const currentOpacity = startOpacity + (opacity - startOpacity) * easeInOut
          
          object.material.opacity = currentOpacity
          object.material.transparent = currentOpacity < 1
          object.material.needsUpdate = true

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        animate()
      }
    } catch (error) {
      console.warn(`Could not find layer: ${layerName}`, error)
    }
  }, [transitionDuration])

  // Function to handle layer hover
  const handleLayerHover = useCallback((layerIndex: number) => {
    if (!isLoaded || isTransitioning) return

    setIsTransitioning(true)
    setHoveredLayer(layerIndex)
    
    // Calculate how many layers should transition to opacity
    const layersToTransition = layerIndex - 1 // layer 2 = 1 layer, layer 3 = 2 layers, etc.
    
    // Reset all layers to full opacity first
    layerNames.forEach((layerName, index) => {
      if (index < layerNames.length - 1) { // Don't modify the opacity layer itself
        setLayerOpacity(layerName, 1)
      }
    })

    // Transition the appropriate number of top layers to opacity
    for (let i = 0; i < layersToTransition && i < layerNames.length - 1; i++) {
      const layerName = layerNames[i] // Start from top layer
      setLayerOpacity(layerName, opacityValue) // Set to semi-transparent
    }

    // Reset transition flag after animation
    setTimeout(() => setIsTransitioning(false), transitionDuration)
  }, [isLoaded, isTransitioning, layerNames, opacityValue, setLayerOpacity, transitionDuration])

  // Function to reset all layers to normal opacity
  const resetLayers = useCallback(() => {
    if (!isLoaded || isTransitioning) return

    setIsTransitioning(true)
    setHoveredLayer(null)
    
    // Reset all layers to full opacity
    layerNames.forEach((layerName, index) => {
      if (index < layerNames.length - 1) { // Don't modify the opacity layer itself
        setLayerOpacity(layerName, 1)
      }
    })

    // Reset transition flag after animation
    setTimeout(() => setIsTransitioning(false), transitionDuration)
  }, [isLoaded, isTransitioning, layerNames, setLayerOpacity, transitionDuration])

  // Expose methods for external control
  useEffect(() => {
    if (isLoaded && splineRef.current) {
      // You can expose these methods to parent components if needed
      (splineRef.current as any).handleLayerHover = handleLayerHover
      ;(splineRef.current as any).resetLayers = resetLayers
    }
  }, [isLoaded, handleLayerHover, resetLayers])

  return (
    <div className="relative">
      {/* Spline Scene */}
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-2xl">
        <Spline
          scene={splineUrl}
          onLoad={onLoad}
          onError={onError}
        />
      </div>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-lg">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading Spline scene...</p>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      {isLoaded && (
        <div className="absolute top-4 right-4">
          <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                Scene Loaded
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center text-slate-300">
        <p className="text-sm">
          {isLoaded 
            ? 'Hover over the layers in your Spline scene to see the opacity transitions'
            : 'Loading your Spline scene...'
          }
        </p>
        {isTransitioning && (
          <p className="text-xs text-blue-400 mt-1">
            Transitioning layers...
          </p>
        )}
      </div>
    </div>
  )
}
