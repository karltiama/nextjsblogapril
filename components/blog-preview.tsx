import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/components/lib/utils";
import { buttonVariants } from "./ui/button";

interface BlogPreviewProps {
	slug: string;
	title: string;
	description: string;
	status: "upcoming" | "published";
	estimatedDate?: string;
	icon?: React.ReactNode;
	className?: string;
}

export function BlogPreview({
	slug,
	title,
	description,
	status,
	estimatedDate,
	icon,
	className,
}: BlogPreviewProps) {
	const isPublished = status === "published";

	return (
		<div
			className={cn(
				"group relative rounded-lg border bg-card p-6 transition-all hover:shadow-md",
				className
			)}
		>
			<div className="flex items-start gap-4">
				{icon && (
					<div className="flex-shrink-0 text-primary">
						{icon}
					</div>
				)}
				<div className="flex-1 space-y-3">
					<div className="flex items-center gap-2">
						<h3 className="text-lg font-semibold leading-tight">
							{title}
						</h3>
						{!isPublished && (
							<span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
								Coming Soon
							</span>
						)}
					</div>
					<p className="text-sm text-muted-foreground leading-relaxed">
						{description}
					</p>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4 text-xs text-muted-foreground">
							{estimatedDate && (
								<div className="flex items-center gap-1">
									<Clock className="h-3 w-3" />
									<span>Est. {estimatedDate}</span>
								</div>
							)}
						</div>
						{isPublished ? (
							<Link
								href={`/blog/${slug}`}
								className={cn(
									buttonVariants({ variant: "outline", size: "sm" }),
									"group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
								)}
							>
								Read Article
								<ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
							</Link>
						) : (
							<div className="text-xs text-muted-foreground">
								Stay tuned for updates
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
} 