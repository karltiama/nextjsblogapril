"use client";

import Link from "next/link";
import { ArrowRight, Beaker, BookOpen, FolderKanban } from "lucide-react";
import { trackRelatedContentClick } from "@/lib/analytics";
import {
	relatedContentTypeLabel,
	type ResolvedRelatedItem,
	type RelatedContentType,
} from "@/lib/related-content";
import { cn } from "@/components/lib/utils";

interface ContinueExploringProps {
	sourceArticle: string;
	items: ResolvedRelatedItem[];
	className?: string;
}

const TYPE_ICONS: Record<RelatedContentType, typeof BookOpen> = {
	article: BookOpen,
	project: FolderKanban,
	lab: Beaker,
};

export function ContinueExploring({
	sourceArticle,
	items,
	className,
}: ContinueExploringProps) {
	if (items.length === 0) {
		return null;
	}

	return (
		<section
			aria-labelledby="continue-exploring-heading"
			className={cn("not-prose mt-12 border-t border-border pt-8", className)}
		>
			<div className="mb-5">
				<h2
					id="continue-exploring-heading"
					className="text-2xl font-bold tracking-tight"
				>
					Continue Exploring
				</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Related reading and implementations from this site.
				</p>
			</div>

			<ul className="grid gap-3">
				{items.map((item) => {
					const Icon = TYPE_ICONS[item.type];

					return (
						<li key={`${item.type}-${item.href}`}>
							<Link
								href={item.href}
								onClick={() =>
									trackRelatedContentClick({
										sourceArticle,
										destination: item.href,
										contentType: item.type,
									})
								}
								className="group block rounded-lg border border-border bg-card p-4 transition-colors hover:border-blue-400/50"
							>
								<div className="flex items-start gap-3">
									<Icon
										className="mt-0.5 h-5 w-5 shrink-0 text-blue-400"
										aria-hidden
									/>
									<div className="min-w-0 flex-1 space-y-1">
										<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
											{relatedContentTypeLabel(item.type)}
										</p>
										<h3 className="font-semibold leading-snug transition-colors group-hover:text-blue-400">
											{item.title}
										</h3>
										<p className="text-sm leading-relaxed text-muted-foreground">
											{item.description}
										</p>
									</div>
									<ArrowRight
										className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-blue-400"
										aria-hidden
									/>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
