import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/components/lib/utils";
import { Tag } from "./tag";

interface PostItemProps {
	slug: string;
	title: string;
	description?: string;
	date: string;
	tags?: Array<string>;
}

export function PostItem({
	slug,
	title,
	description,
	date,
	tags,
}: PostItemProps) {
	return (
		<article className="flex flex-col gap-3 border-border border-b py-4 px-2 sm:px-4">
			<div>
				<h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
					<Link 
						href={"/" + slug}
						className="break-words hyphens-auto hover:text-primary transition-colors"
					>
						{title}
					</Link>
				</h2>
			</div>
			{tags && tags.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<Tag tag={tag} key={tag} />
					))}
				</div>
			)}
			{description && (
				<div className="text-muted-foreground text-sm sm:text-base leading-relaxed">
					{description}
				</div>
			)}
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-2">
				<dl>
					<dt className="sr-only">Published on</dt>
					<dd className="text-sm sm:text-base font-medium flex items-center gap-1 text-muted-foreground">
						<Calendar className="h-4 w-4" />
						<time dateTime={date}>{formatDate(date)}</time>
					</dd>
				</dl>
				<Link
					href={slug}
					className={cn(buttonVariants({ variant: "link" }), "py-0 h-auto self-start sm:self-auto")}>
					Read More →
				</Link>
			</div>
		</article>
	);
}
