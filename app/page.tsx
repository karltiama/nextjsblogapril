import Link from "next/link";
import { cn, sortPosts } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";

export default function Home() {
	const latestPosts = sortPosts(posts).slice(0, 3);

	return (
		<>
			<section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
				<div className="container flex flex-col gap-4 text-center">
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
							className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}>
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
			</section>
			<section className="container max-w-4xl py-6 lg:lg:py-10 flex flex-col space-y-6 mt-20">
				<h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
					Learning By Teaching
				</h2>
				<p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance text-center">
					Breaking down front-end development will make learning more
					predictable by seeing how they work fundamentally. In my blog, I share
					how breakdown problems and how my mental model to learn a certain
					topic.
				</p>
				<ul className="flex flex-col">
					{latestPosts.map((post) => (
						<li key={post.slug} className="first:border-t first:border-border">
							<PostItem
								slug={post.slug}
								title={post.title}
								description={post.description}
								date={post.date}
							/>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
