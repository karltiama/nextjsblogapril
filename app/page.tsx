import { Metadata } from "next";
import { HomeHero } from "@/components/home-hero";
import { HomeBlogSection } from "@/components/home-blog-section";
import { HomeProjectsSection } from "@/components/home-projects-section";

export const metadata: Metadata = {
	title: "Karl Tiama - Full-Stack Developer & Technical Writer",
	description: "Experienced React developer specializing in Next.js, TypeScript, and API integrations. Building scalable web applications and sharing knowledge through technical writing.",
};



export default function Home() {
	return (
		<>
			<HomeHero />
			<HomeBlogSection />
			<HomeProjectsSection />
		</>
	);
}
