'use client'

import { useState, useEffect } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineLocalTestProps {
  splineFile: string
}

export default function SplineLocalTest({ splineFile }: SplineLocalTestProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [splineApp, setSplineApp] = useState<any>(null)
  const [objectsFound, setObjectsFound] = useState<string[]>([])
  const [testResults, setTestResults] = useState<string[]>([])
  
  // Layer names from your scene
  const layerNames = ['Monitor', 'UI', 'Puzzle', 'Framework', 'Cloud']
  const opacityLayerName = 'OverlayViel'

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onLoad = (app: any) => {
    console.log('Local Spline scene loaded successfully!')
    console.log('Spline app object:', app)
    
    // Wait for scene to fully load
    setTimeout(() => {
      console.log('=== TESTING LOCAL SPLINE OBJECTS ===')
      const foundObjects: string[] = []
      const results: string[] = []
      
      if (app) {
        // Test different ways to find objects
        console.log('Available methods on app:', Object.keys(app))
        
        // Try findObjectByName
        if (app.findObjectByName) {
          console.log('Testing findObjectByName...')
          const allObjects = [...layerNames, opacityLayerName]
          allObjects.forEach(name => {
            const obj = app.findObjectByName(name)
            if (obj) {
              foundObjects.push(name)
              results.push(`✅ Found: ${name} (${obj.type})`)
              console.log(`Object "${name}":`, obj)
              console.log(`  - Type: ${obj.type}`)
              console.log(`  - Visible: ${obj.visible}`)
              console.log(`  - Position:`, obj.position)
              console.log(`  - Scale:`, obj.scale)
              console.log(`  - Material:`, obj.material)
            } else {
              results.push(`❌ Not found: ${name}`)
            }
          })
        }
        
        // Try scene traversal
        if (app.scene && app.scene.traverse) {
          console.log('Traversing scene...')
          app.scene.traverse((child: any) => {
            if (child.name) {
              console.log(`Scene object: ${child.name} (${child.type})`)
              if (!foundObjects.includes(child.name)) {
                foundObjects.push(child.name)
              }
            }
          })
        }
        
        // Test object manipulation
        if (foundObjects.length > 0) {
          results.push('--- Testing Object Manipulation ---')
          
          // Test hiding OverlayViel
          const overlayLayer = app.findObjectByName(opacityLayerName)
          if (overlayLayer) {
            overlayLayer.visible = false
            results.push(`✅ Hidden ${opacityLayerName} layer`)
            console.log(`Hidden ${opacityLayerName} layer`)
          }
          
          // Test opacity changes
          layerNames.forEach(layerName => {
            const layer = app.findObjectByName(layerName)
            if (layer && layer.material) {
              const originalOpacity = layer.material.opacity
              layer.material.opacity = 0.5
              layer.material.transparent = true
              layer.material.needsUpdate = true
              results.push(`✅ Set ${layerName} opacity to 0.5`)
              console.log(`Set ${layerName} opacity to 0.5`)
              
              // Reset after 2 seconds
              setTimeout(() => {
                if (layer.material) {
                  layer.material.opacity = originalOpacity
                  layer.material.needsUpdate = true
                  console.log(`Reset ${layerName} opacity to ${originalOpacity}`)
                }
              }, 2000)
            }
          })
        }
      }
      
      setSplineApp(app)
      setIsLoaded(true)
      setError(null)
      setObjectsFound(foundObjects)
      setTestResults(results)
    }, 2000) // Wait 2 seconds for full scene load
  }

  const onError = (error: any) => {
    console.error('Spline loading error:', error)
    setError(`Failed to load scene: ${error.message || 'Unknown error'}`)
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
        {splineFile && (
          <Spline
            scene={splineFile}
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
            <p>Loading local Spline scene...</p>
            <p className="text-sm text-slate-400 mt-2">Testing object access...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 backdrop-blur-sm rounded-lg">
          <div className="text-white text-center p-4">
            <div className="text-red-400 text-lg mb-2">⚠️ Error</div>
            <p className="text-sm">{error}</p>
            <p className="text-xs text-slate-300 mt-2">
              Make sure the Spline file exists in the public/spline/ folder
            </p>
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
                Local Scene Loaded!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Test Results */}
      {isLoaded && !error && testResults.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 max-h-60 overflow-y-auto">
            <h3 className="text-white font-medium mb-2">Object Detection Results:</h3>
            <div className="space-y-1">
              {testResults.map((result, index) => (
                <div key={index} className="text-xs text-slate-300">
                  {result}
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-slate-400">
              <p>Found {objectsFound.length} objects total</p>
              <p>Check browser console for detailed logs</p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center text-slate-300">
        <p className="text-sm">
          {isLoaded && !error
            ? 'Local Spline scene loaded! Check the test results below.'
            : error
            ? 'Fix the error above to continue'
            : 'Loading your local Spline scene...'
          }
        </p>
      </div>
    </div>
  )
}
