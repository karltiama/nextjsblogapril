import { AboutSection } from '@/components/about-section'
import TerrainCanvasLoader from '@/components/terrain-canvas-loader'

interface TerrainHeroProps {
  children?: React.ReactNode
  /** When true, uses min-h-screen for full-viewport landing pages */
  fullHeight?: boolean
}

/**
 * Server-rendered hero shell.
 *
 * Everything here is static HTML (height, text overlay, gradients, scroll bridge,
 * About section) so it paints on first byte and reserves the full layout. The only
 * client-only piece is `<TerrainCanvasLoader />`, an absolutely-positioned WebGL
 * layer that fades in behind the text without shifting anything (CLS ~0).
 */
export default function TerrainHero({ children, fullHeight }: TerrainHeroProps) {
  const heroHeightClass = fullHeight
    ? 'h-[100svh] min-h-[100svh]'
    : 'h-[600px]'

  const scrollBridgeClass = fullHeight
    ? '-mt-[100svh] pt-[84svh]'
    : '-mt-[600px] pt-[600px]'

  return (
    <div className="relative w-full">
      <div
        className={`sticky top-0 z-0 w-full overflow-hidden bg-black ${heroHeightClass}`}
      >
        <TerrainCanvasLoader />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-0.5 pointer-events-auto z-10">
            {children || (
              <>
                <h1 className="text-5xl md:text-7xl font-bold text-blue-400 mb-6 drop-shadow-lg">
                  Hi I&apos;m Karl
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 drop-shadow-md max-w-3xl mx-auto">
                  I build scalable systems and data-driven applications that solve real problems.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />
      </div>

      <div className={`relative z-10 ${scrollBridgeClass}`}>
        <div
          className="pointer-events-none h-10"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #0a0a0f 100%)',
          }}
          aria-hidden
        />
        <AboutSection />
      </div>
    </div>
  )
}
