'use client';

import mermaid, { MermaidConfig } from 'mermaid';
import { useEffect, useRef, useState } from 'react';

// Initialize mermaid config
const config: MermaidConfig = {
  startOnLoad: false,  // Changed to false since we'll manually initialize
  theme: 'dark' as const,  // Explicitly type as const
  securityLevel: 'loose' as const,  // Explicitly type as const
  fontFamily: 'inherit',
};

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize only on client side
    mermaid.initialize(config);

    const renderChart = async () => {
      if (ref.current) {
        try {
          // Clear previous content
          ref.current.innerHTML = '';
          
          // Generate unique ID for this chart
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          
          const { svg } = await mermaid.render(id, chart);
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        } catch (err) {
          console.error('Mermaid rendering failed:', err);
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
        }
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded">
        Failed to render diagram: {error}
      </div>
    );
  }

  return (
    <div className="my-4">
      <div ref={ref} className="flex justify-center overflow-x-auto" />
    </div>
  );
} 