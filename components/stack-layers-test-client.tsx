'use client'

import dynamic from 'next/dynamic'

const StackLayersScene = dynamic(
  () =>
    import('@/components/stack-layers-scene').then((m) => ({
      default: m.StackLayersScene,
    })),
  { ssr: false },
)

export function StackLayersTestClient() {
  return <StackLayersScene />
}
