import Link from "next/link";
import HomeTerrainHero from "@/components/home-terrain-hero";

export default function TerrainPage() {
	return (
		<div className="relative min-h-screen bg-black">
			<div className="absolute left-6 top-6 z-30">
				<Link
					href="/"
					className="rounded-md border border-white/30 bg-black/40 px-3 py-2 text-sm text-white backdrop-blur hover:bg-black/60"
				>
					Back home
				</Link>
			</div>
			<HomeTerrainHero />
		</div>
	);
}
