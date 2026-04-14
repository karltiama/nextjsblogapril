import Link from "next/link";
import { slug } from "github-slugger";
import { cn } from "@/components/lib/utils";
import { badgeVariants } from "./ui/badge";

interface TagProps {
	tag: string;
	current?: boolean;
	count?: number;
	/** Softer outline style for dense strips (e.g. under page headers). */
	subtle?: boolean;
}

export function Tag({ tag, current, count, subtle }: TagProps) {
	const variant = current
		? "default"
		: subtle
			? "outline"
			: "secondary";

	return (
		<Link
			className={cn(
				badgeVariants({
					variant,
					className: "no-underline rounded-md",
				}),
				current &&
					"border-transparent bg-blue-400 text-slate-950 hover:bg-blue-300 focus-visible:ring-blue-400 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400",
				subtle &&
					!current &&
					"border-border/60 font-normal text-muted-foreground hover:bg-muted/60 hover:text-foreground"
			)}
			href={`/tags/${slug(tag)}`}>
			{tag} {count ? `(${count})` : null}
		</Link>
	);
}
