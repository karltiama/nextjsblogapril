import Link from 'next/link'
import { StackLayersTestClient } from '@/components/stack-layers-test-client'

export default function StackLayersTestPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-foreground">
      <div className="absolute left-6 top-6 z-10">
        <Link
          href="/"
          className="rounded-md border border-white/30 bg-black/40 px-3 py-2 text-sm text-white backdrop-blur hover:bg-black/60"
        >
          Back home
        </Link>
      </div>

      <div className="container max-w-4xl px-4 py-24">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Stacked GLB layer hover (test)
        </h1>
        <p className="mb-8 max-w-prose text-muted-foreground text-sm leading-relaxed">
          Top layer (index 0) ignores direct hover. Hover the middle layer to lift the
          top slightly; hover the bottom to lift the top more and the middle a bit.
          Orbit with drag. Pointer leave resets the stack.
        </p>
        <StackLayersTestClient />
      </div>
    </div>
  )
}
