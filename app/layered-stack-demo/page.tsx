import Link from "next/link"
import { LayeredStackDemo } from "@/components/layered-stack-demo"

export default function LayeredStackDemoPage() {
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

      <div className="container flex max-w-4xl flex-col items-center px-4 py-24">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
          Layered SVG stack (demo)
        </h1>
        <p className="mb-10 max-w-prose text-center text-sm leading-relaxed text-white/70">
          Two overlapping plate-scale rectangles (layer 2 / layer 3 targets — tune{' '}
          <code className="text-white/90">ZONE_*</code> in{' '}
          <code className="text-white/90">layered-stack-demo-constants.ts</code>): zone 1 →{' '}
          <code className="text-white/90">activeLayer = 1</code>, zone 2 →{' '}
          <code className="text-white/90">2</code> (wins in the overlap). Mouse leave
          resets.
        </p>
        <LayeredStackDemo />
      </div>
    </div>
  )
}
