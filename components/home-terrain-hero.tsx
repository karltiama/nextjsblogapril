'use client'

import dynamic from "next/dynamic";

const TerrainHero = dynamic(() => import("@/components/terrain-hero"), {
	ssr: false,
});

export default function HomeTerrainHero() {
	return <TerrainHero fullHeight />;
}
