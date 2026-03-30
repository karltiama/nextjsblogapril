import Link from "next/link";
import { Suspense } from "react";
import HomeTerrainHero from "@/components/home-terrain-hero";
import ProjectList from "@/components/project-list";
import { PostItem } from "@/components/post-item";
import { cn, sortPosts } from "@/components/lib/utils";
import { posts } from "#site/content";
import { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Karl Tiama - Mental Models & Technical Writing",
	description: "Software Engineer specializing in scalable web systems and technical mental models. I build robust applications and write about the engineering trade-offs that turn complexity into clear decisions.",
};

export default function TerrainPage() {
	const latestPosts = sortPosts(posts.filter((post) => post.published)).slice(0, 3);

	return (
		<div className="relative min-h-screen bg-[#0a0a0f]">
			<HomeTerrainHero>
				<h1 className="text-5xl md:text-7xl font-black text-blue-400 mb-6 drop-shadow-lg tracking-tight">
					Architecting Mental Models
				</h1>
				<p className="text-xl md:text-2xl text-gray-200 drop-shadow-md max-w-3xl mx-auto mb-10 leading-relaxed">
					I build scalable systems and share the engineering trade-offs and mental models 
					that turn complex problems into clear, structured decisions.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
					<Link
						href="/blog"
						className={cn(buttonVariants({ size: "lg" }), "min-w-[160px]")}
					>
						Read the Blog
					</Link>
					<Link
						href="/projects"
						className={cn(
							buttonVariants({ variant: "outline", size: "lg" }),
							"min-w-[160px] backdrop-blur-sm bg-white/5 border-white/20 hover:bg-white/10"
						)}
					>
						View Projects
					</Link>
				</div>
			</HomeTerrainHero>

			{/* Writing Section - Moved Up for Focus */}
			<section className="relative isolate overflow-hidden bg-[#0a0a0f] py-16 lg:py-24">
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.16]"
					style={{
						backgroundImage:
							'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)',
						backgroundSize: '18px 18px',
					}}
				/>
				<div className="container relative z-[3] max-w-4xl flex flex-col space-y-10">
					<div className="flex flex-col space-y-4 text-center">
						<h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
							Writing & Thinking
						</h2>
						<p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
							After shipping systems, I document how they work. I write about
							architecture, engineering trade-offs, and the mental models that help
							turn complexity into clear decisions.
						</p>
					</div>
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
					<div className="flex justify-center pt-8">
						<Link
							href="/blog"
							className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "group")}
						>
							View all posts
							<span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section className="container max-w-6xl py-20 lg:py-32 flex flex-col space-y-12">
				<div className="flex flex-col space-y-4 text-center">
					<h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
						Featured Systems
					</h2>
					<p className="max-w-[52rem] mx-auto text-muted-foreground sm:text-xl text-balance">
						A selection of real-world systems and applications I&apos;ve built, with
						a focus on scalability, reliability, and measurable outcomes.
					</p>
				</div>
				<Suspense fallback={<div>Loading projects...</div>}>
					<ProjectList />
				</Suspense>
			</section>
		</div>
	);
}
