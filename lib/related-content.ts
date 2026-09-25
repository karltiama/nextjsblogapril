import { posts } from "#site/content";
import { projects } from "@/content/projects/projectsData";
import { projectSlugFromTitle } from "@/lib/project-slug";

export type RelatedContentType = "article" | "project" | "lab";

export interface RelatedContentEntry {
	type: RelatedContentType;
	slug?: string;
	href?: string;
	title?: string;
	description?: string;
}

export interface ResolvedRelatedItem {
	type: RelatedContentType;
	title: string;
	description: string;
	href: string;
}

type Post = (typeof posts)[number];

const TYPE_LABELS: Record<RelatedContentType, string> = {
	article: "Article",
	project: "Project",
	lab: "Lab",
};

export function relatedContentTypeLabel(type: RelatedContentType): string {
	return TYPE_LABELS[type];
}

function resolveArticleEntry(
	entry: RelatedContentEntry,
	currentSlug: string
): ResolvedRelatedItem | null {
	if (!entry.slug || entry.slug === currentSlug) {
		return null;
	}

	const article = posts.find(
		(post) => post.slugAsParams === entry.slug && post.published
	);

	if (!article) {
		return null;
	}

	return {
		type: "article",
		title: entry.title ?? article.title,
		description: entry.description ?? article.description ?? "",
		href: `/blog/${article.slugAsParams}`,
	};
}

function resolveProjectEntry(
	entry: RelatedContentEntry
): ResolvedRelatedItem | null {
	if (!entry.slug) {
		return null;
	}

	const project = projects.find(
		(item) => projectSlugFromTitle(item.title) === entry.slug
	);

	if (!project) {
		return null;
	}

	return {
		type: "project",
		title: entry.title ?? project.title,
		description: entry.description ?? project.description,
		href: `/projects/${entry.slug}`,
	};
}

function resolveLabEntry(
	entry: RelatedContentEntry
): ResolvedRelatedItem | null {
	if (!entry.href || !entry.title || !entry.description) {
		return null;
	}

	return {
		type: "lab",
		title: entry.title,
		description: entry.description,
		href: entry.href,
	};
}

function resolveConfiguredEntry(
	entry: RelatedContentEntry,
	currentSlug: string
): ResolvedRelatedItem | null {
	switch (entry.type) {
		case "article":
			return resolveArticleEntry(entry, currentSlug);
		case "project":
			return resolveProjectEntry(entry);
		case "lab":
			return resolveLabEntry(entry);
		default:
			return null;
	}
}

function resolveTagFallback(post: Post): ResolvedRelatedItem[] {
	const currentTags = post.tags ?? [];
	if (currentTags.length === 0) {
		return [];
	}

	const candidates = posts
		.filter(
			(candidate) =>
				candidate.published &&
				candidate.slugAsParams !== post.slugAsParams
		)
		.map((candidate) => {
			const sharedTags =
				candidate.tags?.filter((tag) => currentTags.includes(tag)) ??
				[];

			return {
				candidate,
				sharedTagCount: sharedTags.length,
			};
		})
		.filter(({ sharedTagCount }) => sharedTagCount > 0)
		.sort((a, b) => {
			if (b.sharedTagCount !== a.sharedTagCount) {
				return b.sharedTagCount - a.sharedTagCount;
			}

			return (
				new Date(b.candidate.date).getTime() -
				new Date(a.candidate.date).getTime()
			);
		})
		.slice(0, 3);

	return candidates.map(({ candidate }) => ({
		type: "article" as const,
		title: candidate.title,
		description: candidate.description ?? "",
		href: `/blog/${candidate.slugAsParams}`,
	}));
}

export function resolveRelatedContent(post: Post): ResolvedRelatedItem[] {
	const configured = post.relatedContent ?? [];

	if (configured.length > 0) {
		const resolved = configured
			.map((entry) => resolveConfiguredEntry(entry, post.slugAsParams))
			.filter((item): item is ResolvedRelatedItem => item !== null)
			.slice(0, 3);

		return resolved;
	}

	return resolveTagFallback(post);
}
