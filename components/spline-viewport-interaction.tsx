'use client'

import { useState, useEffect } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineViewportInteractionProps {
  splineUrl: string
}

export default function SplineViewportInteraction({ splineUrl }: SplineViewportInteractionProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [splineApp, setSplineApp] = useState<any>(null)
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null)
  
  // Layer names from your scene (in order from top to bottom)
  const layerNames = ['Monitor', 'UI', 'Puzzle', 'Framework', 'Cloud']
  const opacityLayerName = 'OverlayViel'

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onLoad = (app: any) => {
    setIsLoaded(true)
    setError(null)
    setSplineApp(app)
    console.log('Spline scene loaded successfully!')
    console.log('Spline app object:', app)
    
    // Wait for scene to fully load
    setTimeout(() => {
      console.log('=== SETTING UP SPLINE EVENTS ===')
      
      if (app) {
        // Hide the OverlayViel layer initially
        const overlayLayer = app.findObjectByName(opacityLayerName)
        if (overlayLayer) {
          overlayLayer.visible = false
          console.log(`Hidden ${opacityLayerName} layer initially`)
        } else {
          console.log(`Could not find ${opacityLayerName} layer`)
        }
        
        // Set up hover events for each layer
        layerNames.forEach((layerName, index) => {
          const layer = app.findObjectByName(layerName)
          if (layer) {
            console.log(`Setting up events for ${layerName}`)
            
            // Add hover event listener
            layer.addEventListener('mouseHover', () => {
              console.log(`Hovered over ${layerName} in viewport`)
              handleLayerHover(index)
            })
            
            // Add mouse leave event listener
            layer.addEventListener('mouseLeave', () => {
              console.log(`Left ${layerName} in viewport`)
              handleLayerLeave()
            })
          } else {
            console.log(`Could not find layer: ${layerName}`)
          }
        })
        
        // Debug: List all available objects
        if (app.scene && app.scene.traverse) {
          console.log('All objects in scene:')
          app.scene.traverse((child: any) => {
            if (child.name) {
              console.log(`- ${child.name} (${child.type})`)
            }
          })
        }
      }
    }, 2000) // Wait 2 seconds for full scene load
  }

  const onError = (error: any) => {
    console.error('Spline loading error:', error)
    setError(`Failed to load scene: ${error.message || 'Unknown error'}`)
  }

  // Handle layer hover from Spline viewport
  const handleLayerHover = (layerIndex: number) => {
    if (!splineApp || !isLoaded) return
    
    const layerName = layerNames[layerIndex]
    setHoveredLayer(layerName)
    console.log(`Viewport hover: Layer ${layerIndex + 1} (${layerName})`)
    
    // Show the OverlayViel layer when hovering over any layer (except the top one)
    if (layerIndex > 0) {
      const overlayLayer = splineApp.findObjectByName(opacityLayerName)
      if (overlayLayer) {
        overlayLayer.visible = true
        console.log(`Showing ${opacityLayerName} layer`)
      }
    }
    
    // Trigger Spline animations for layers above the hovered layer
    for (let i = 0; i < layerIndex; i++) {
      const aboveLayerName = layerNames[i]
      const layer = splineApp.findObjectByName(aboveLayerName)
      
      if (layer) {
        // Try to play Spline animations
        if (layer.play) {
          // Play fadeOut animation if it exists
          layer.play('fadeOut')
          console.log(`Playing fadeOut animation for ${aboveLayerName}`)
        } else if (layer.animations) {
          // Alternative: access animations directly
          const fadeOutAnim = layer.animations.find((anim: any) => anim.name === 'fadeOut')
          if (fadeOutAnim) {
            fadeOutAnim.play()
            console.log(`Playing fadeOut animation for ${aboveLayerName}`)
          }
        } else {
          console.log(`No animation system found for ${aboveLayerName}`)
        }
      }
    }
  }

  // Handle layer leave from Spline viewport
  const handleLayerLeave = () => {
    if (!splineApp || !isLoaded) return
    
    setHoveredLayer(null)
    console.log('Left layer hover - resetting all animations')
    
    // Hide the OverlayViel layer
    const overlayLayer = splineApp.findObjectByName(opacityLayerName)
    if (overlayLayer) {
      overlayLayer.visible = false
      console.log(`Hidden ${opacityLayerName} layer`)
    }
    
    // Reset all layers by playing fadeIn animations
    layerNames.forEach(layerName => {
      const layer = splineApp.findObjectByName(layerName)
      
      if (layer) {
        // Try to play Spline animations
        if (layer.play) {
          // Play fadeIn animation if it exists
          layer.play('fadeIn')
          console.log(`Playing fadeIn animation for ${layerName}`)
        } else if (layer.animations) {
          // Alternative: access animations directly
          const fadeInAnim = layer.animations.find((anim: any) => anim.name === 'fadeIn')
          if (fadeInAnim) {
            fadeInAnim.play()
            console.log(`Playing fadeIn animation for ${layerName}`)
          }
        } else {
          console.log(`No animation system found for ${layerName}`)
        }
      }
    })
  }

  if (!isClient) {
    return (
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-2xl bg-slate-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Spline component...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Spline Scene */}
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-2xl">
        {splineUrl && (
          <Spline
            scene={splineUrl}
            onLoad={onLoad}
            onError={onError}
          />
        )}
      </div>

      {/* Loading State */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-lg">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading Spline scene...</p>
            <p className="text-sm text-slate-400 mt-2">Setting up viewport interactions...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 backdrop-blur-sm rounded-lg">
          <div className="text-white text-center p-4">
            <div className="text-red-400 text-lg mb-2">⚠️ Error</div>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Success State */}
      {isLoaded && !error && (
        <div className="absolute top-4 right-4">
          <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                Viewport Interaction Ready!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Hover Status */}
      {isLoaded && !error && hoveredLayer && (
        <div className="absolute top-4 left-4">
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-3">
            <div className="text-blue-400 text-sm">
              <p className="font-medium">Hovering: {hoveredLayer}</p>
              <p className="text-xs">Layers above are semi-transparent</p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Viewport Interaction</h3>
          <p className="text-slate-300 text-sm mb-2">
            Hover directly over the 3D objects in the scene to see opacity effects.
          </p>
          <div className="text-xs text-slate-400">
            <p>• Hover over Layer 2 → Layer 1 becomes transparent</p>
            <p>• Hover over Layer 3 → Layers 1 & 2 become transparent</p>
            <p>• Move mouse away → All layers return to normal</p>
          </div>
        </div>
      </div>
    </div>
  )
}
