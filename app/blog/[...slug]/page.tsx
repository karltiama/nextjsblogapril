import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { TableOfContents } from "@/components/toc";
import { MobileToc } from "@/components/mobile-toc";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import { CommentSection } from "@/components/comment-section";

interface PostPageProps {
	params: Promise<{
		slug: string[];
	}>;
}

async function getPostFromParams(params: PostPageProps["params"]) {
	const resolvedParams = await params;
	const slug = resolvedParams?.slug?.join("/");
	const post = posts.find((post) => post.slugAsParams === slug);

	return post;
}

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const post = await getPostFromParams(params);

	if (!post) {
		return {};
	}

	const ogSearchParams = new URLSearchParams();
	ogSearchParams.set("title", post.title);

	return {
		title: post.title,
		description: post.description,
		authors: { name: siteConfig.author },
		openGraph: {
			title: post.title,
			description: post.description,
			type: "article",
			url: post.slug,
			images: [
				{
					url: `/api/og?${ogSearchParams.toString()}`,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: [`/api/og?${ogSearchParams.toString()}`],
		},
	};
}

export async function generateStaticParams(): Promise<
	{ slug: string[] }[]
> {
	return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
	const post = await getPostFromParams(params);

	if (!post || !post.published) {
		notFound();
	}

	return (
		<div className="container py-6 max-w-7xl mx-auto">
			{/* Article Section with Sidebar */}
			<div className="flex gap-8 mb-16">
				{/* Main Content */}
				<article className="flex-1 prose dark:prose-invert max-w-4xl">
					<h1 className="mb-2">{post.title}</h1>
					<div className="flex gap-2 mb-2">
						{post.tags?.map((tag) => (
							<Tag tag={tag} key={tag} />
						))}
					</div>
					{post.description ? (
						<p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
					) : null}
					
					{/* Mobile TOC */}
					<MobileToc />
					
					<hr className="my-4" />
					<MDXContent code={post.body} />
				</article>

				{/* Sidebar - Table of Contents only for article */}
				<aside className="hidden lg:block w-64 shrink-0">
					<div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
						<TableOfContents />
					</div>
				</aside>
			</div>

			{/* Comments Section - Full width, no sidebar */}
			<div className="w-full">
				<CommentSection postSlug={post.slug} postTitle={post.title} />
			</div>
		</div>
	);
}
