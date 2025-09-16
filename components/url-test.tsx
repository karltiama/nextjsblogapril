'use client'

import { useState } from 'react'

interface UrlTestProps {
  url: string
}

export default function UrlTest({ url }: UrlTestProps) {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testUrl = async () => {
    setLoading(true)
    setResult('')
    
    try {
      const response = await fetch(url)
      const text = await response.text()
      
      setResult(`
Status: ${response.status}
Content-Type: ${response.headers.get('content-type')}
First 200 chars: ${text.substring(0, 200)}
      `)
    } catch (error) {
      setResult(`Error: ${error}`)
    }
    
    setLoading(false)
  }

  return (
    <div className="bg-slate-800 rounded-lg p-4 mb-4">
      <h3 className="text-white font-semibold mb-2">URL Test</h3>
      <p className="text-slate-300 text-sm mb-3">Test what the URL is actually returning:</p>
      
      <div className="space-y-2">
        <div className="text-xs text-slate-400 break-all">
          <strong>URL:</strong> {url}
        </div>
        
        <button
          onClick={testUrl}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test URL'}
        </button>
        
        {result && (
          <div className="mt-3">
            <h4 className="text-white font-medium mb-2">Result:</h4>
            <pre className="text-xs text-slate-300 bg-slate-900 p-3 rounded overflow-auto max-h-40">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
