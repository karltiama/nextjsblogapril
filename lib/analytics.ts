import type { RelatedContentType } from "@/lib/related-content";

declare global {
	interface Window {
		umami?: {
			track: (
				event: string,
				data?: Record<string, string | number>
			) => void;
		};
	}
}

export function trackRelatedContentClick(props: {
	sourceArticle: string;
	destination: string;
	contentType: RelatedContentType;
	position?: string;
}): void {
	if (typeof window === "undefined" || !window.umami?.track) {
		return;
	}

	window.umami.track("related_content_click", {
		source_article: props.sourceArticle,
		destination: props.destination,
		content_type: props.contentType,
		position: props.position ?? "article-footer",
	});
}
