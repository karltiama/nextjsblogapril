'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

/**
 * Client boundary that lazy-loads the WebGL terrain.
 *
 * `dynamic(..., { ssr: false })` is not allowed inside Server Components, so this
 * client wrapper exists to keep the `three` bundle code-split and out of the
 * critical request chain. The server-rendered shell (`terrain-hero.tsx`) already
 * reserves the layout, so this mounting causes no shift.
 *
 * We also defer the mount until the browser is idle: this keeps `three`'s
 * download / parse / WebGL init out of the initial load window (better TBT), then
 * the terrain fades in. The background is preserved, just started a beat later.
 */
const TerrainCanvas = dynamic(() => import('@/components/terrain-canvas'), {
  ssr: false,
})

/** Fallback delay (ms) when requestIdleCallback is unavailable (e.g. Safari). */
const IDLE_FALLBACK_MS = 1200
/** Cap on how long we wait for idle before mounting anyway. */
const IDLE_TIMEOUT_MS = 2000

export default function TerrainCanvasLoader() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const start = () => setReady(true)

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: IDLE_TIMEOUT_MS })
      return () => window.cancelIdleCallback?.(id)
    }

    const timer = setTimeout(start, IDLE_FALLBACK_MS)
    return () => clearTimeout(timer)
  }, [])

  if (!ready) return null

  return <TerrainCanvas />
}
