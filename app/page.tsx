import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { cn, sortPosts } from "@/components/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { Metadata } from "next";
import ProjectList from "@/components/project-list";

export const metadata: Metadata = {
	title: "Karl's Portfolio - React Dev and Technical Writer",
	description: "Karl's portfolio showcasing React projects and technical writing on front-end development concepts.",
};
	

export default function Home() {
	const latestPosts = sortPosts(posts).slice(0, 3);

	return (
		<>
			<section className="min-h-screen md:pb-12 md:mt-10 lg:py-28">
				<div className="container grid grid-cols-1 lg:grid-cols-3 gap-4 text-center">
					{/* Left Column */}
					<div className="hidden lg:flex flex-col gap-4 items-center justify-between">
						<Image
							width={200}
							height={200}
							src="/programming.svg"
							alt="Illustration of a person programming"
							loading="lazy"
						/>
						<Image
							width={200}
							height={200}
							src="/visual_data.svg"
							alt="Illustration of a person visualizing data"
							loading="lazy"
						/>
						<Image
							width={200}
							height={200}
							src="/biking.svg"
							alt="Illustration of a person biking"
							loading="lazy"
						/>
					</div>
					{/* Center Column */}
					<div className="flex flex-col gap-4 items-center pt-20">
						<Image
							width={200}
							height={200}
							src="/drink_coffee.svg"
							alt="Illustration of a person drinking coffee"
						/>
						<h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
							Hello, I&apos;m Karl
						</h1>
						<p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
							I work with React Ecosystem, and write to teach people how to
							rebuild and redefine fundamental concepts through mental models.
						</p>
						<div className="flex flex-col gap-4 justify-center sm:flex-row">
							<Link
								href="/blog"
								className={cn(
									buttonVariants({ size: "lg" }),
									"w-full sm:w-fit"
								)}>
								View my Blog
							</Link>
							<Link
								href={siteConfig.links.github}
								target="_blank"
								rel="noreferrer"
								className={cn(
									buttonVariants({ variant: "outline", size: "lg" }),
									"w-full sm:w-fit"
								)}>
								Github
							</Link>
						</div>
					</div>
					{/* Right Column */}
					<div className="hidden lg:flex flex-col gap-4 items-center justify-between">
						<Image
							width={200}
							height={200}
							src="/building_website.svg"
							alt="Illustration of a person building a website"
							loading="lazy"
						/>
						<Image
							width={200}
							height={200}
							src="/hacker_mind.svg"
							alt="Illustration of a person hacking"
							loading="lazy"
						/>
						<Image
							width={200}
							height={200}
							src="/running.svg"
							alt="Illustration of a person running"
							loading="lazy"
						/>
					</div>
				</div>
			</section>

			<section className="container max-w-4xl py-6 lg:lg:py-10 flex flex-col space-y-10 mt-30 justify-between items-center">
				<Image
					className=""
					width={200}
					height={200}
					src="/firmware.svg"
					alt="Illustration of a person working on firmware"
					loading="lazy"
				/>
				<h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
					Rebuild your mental model
				</h2>
				<p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance text-center">
					Breaking down front-end development makes learning more structured and
					predictable by understanding the fundamental workings of its
					components. In my blog, I share strategies for dissecting problems and
					describe my mental model for learning specific topics.
				</p>
				<ul className="flex flex-col">
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
			</section>
			<section className="container max-w-6xl py-6 lg:lg:py-10 flex flex-col space-y-10 mt-60">
				<h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
					My Projects
				</h2>
				<p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance text-center">
					Here are some of the projects I have worked on. I am always looking
					forward to new projects and collaborations.
				</p>
				<Suspense fallback={<div>Loading projects...</div>}>
					<ProjectList />
				</Suspense>
			</section>
		</>
	);
}
