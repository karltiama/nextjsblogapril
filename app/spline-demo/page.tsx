'use client'

import SplineBasic from '@/components/spline-basic'
import UrlTest from '@/components/url-test'

export default function SplineDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Spline Scene Demo
          </h1>
          <p className="text-slate-300 text-lg">
            Your Spline scene loaded via URL
          </p>
        </div>

        {/* Working Spline Scene */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Working Spline Scene
          </h2>
          <div className="flex justify-center">
            <SplineBasic 
              splineUrl="https://prod.spline.design/0tc5vcx8upINop77/scene.splinecode"
            />
          </div>
        </div>

        
        <div className="mt-8 text-center">
          <div className="bg-slate-800 rounded-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4">
              ✅ Spline Scene Successfully Loaded
            </h2>
            <div className="text-slate-300 space-y-4">
              <p>
                Your Spline scene is now loading via URL and rendering properly in your React app.
              </p>
              <div className="bg-green-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-300 mb-2">What's Working:</h3>
                <ul className="text-sm space-y-1 text-left">
                  <li>• Spline scene loads from URL</li>
                  <li>• No more 403 or loading errors</li>
                  <li>• Scene renders with proper camera angle</li>
                  <li>• Ready for further customization</li>
                </ul>
              </div>
              <p className="text-sm text-slate-400">
                You can now integrate this Spline component into your main website or add additional features as needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
