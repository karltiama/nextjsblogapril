import Link from "next/link";
import { Suspense } from "react";
import HomeTerrainHero from "@/components/home-terrain-hero";
import ProjectList from "@/components/project-list";
import { PostItem } from "@/components/post-item";
import { sortPosts } from "@/components/lib/utils";
import { posts } from "#site/content";

export default function TerrainPage() {
	const latestPosts = sortPosts(posts.filter((post) => post.published)).slice(0, 3);

	return (
		<div className="relative min-h-screen bg-[#0a0a0f]">
			<div className="absolute left-6 top-6 z-30">
				<Link
					href="/"
					className="rounded-md border border-white/30 bg-black/40 px-3 py-2 text-sm text-white backdrop-blur hover:bg-black/60"
				>
					Back home
				</Link>
			</div>
			<HomeTerrainHero />

			<section className="container max-w-6xl py-16 lg:py-20 flex flex-col space-y-8">
				<h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
					Featured Projects
				</h2>
				<p className="max-w-[52rem] mx-auto text-muted-foreground sm:text-xl text-balance text-center">
					A selection of real-world systems and applications I&apos;ve built, with
					a focus on scalability, reliability, and measurable outcomes.
				</p>
				<Suspense fallback={<div>Loading projects...</div>}>
					<ProjectList />
				</Suspense>
			</section>

			<section className="relative isolate overflow-hidden bg-[#0a0a0f] py-12 lg:py-16">
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.16]"
					style={{
						backgroundImage:
							'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)',
						backgroundSize: '18px 18px',
					}}
				/>
				<div className="container relative z-[3] max-w-4xl flex flex-col space-y-8">
					<h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
						Writing & Mental Models
					</h2>
					<p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance text-center">
						After shipping systems, I document how they work. I write about
						architecture, engineering trade-offs, and the mental models that help
						turn complexity into clear decisions.
					</p>
					<ul className="flex flex-col w-full max-w-3xl mx-auto">
						{latestPosts.map((post) => (
							<li key={post.slug} className="first:border-t first:border-border">
								<PostItem
									slug={post.slug}
									title={post.title}
									description={post.description}
									date={post.date}
									tags={post.tags}
								/>
							</li>
						))}
					</ul>
				</div>
			</section>
		</div>
	);
}
