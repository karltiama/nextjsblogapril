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
			<section className="container max-w-4xl py-6 lg:lg:py-10 flex flex-col space-y-10 mt-60">
				<h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
					Rebuild your mental model
				</h2>
				<p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance text-center">
					Breaking down front-end development can make learning more structured
					and predictable by understanding the fundamental workings of its
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
		</>
	);
}
