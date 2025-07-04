import { siteConfig } from "@/config/site";
import { Mail, BarChart3 } from "lucide-react";
import { Icons } from "./icons";
import { Separator } from "./ui/separator";

export function SiteFooter() {
	return (
		<footer>
			<Separator />
			<div className="mb-6 mt-14 flex flex-col items-center">
				<div className="mb-3 flex space-x-4">
					<a target="_blank" rel="noreferrer" href="mailto:karltiama@gmail.com">
						<span className="sr-only">Mail</span>
						<Mail className="h-6 w-6" />
					</a>
					<a target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
						<span className="sr-only">Twitter</span>
						<Icons.twitter className="h-6 w-6" />
					</a>
					<a target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
						<span className="sr-only">Github</span>
						<Icons.gitHub className="h-6 w-6" />
					</a>
					<a 
						target="_blank" 
						rel="noreferrer" 
						href="https://us.umami.is/share/coBNgikJPsY7bIhK/www.karltiama.dev"
						title="View Analytics"
					>
						<span className="sr-only">Analytics</span>
						<BarChart3 className="h-6 w-6" />
					</a>
				</div>
				<div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
					<div>{siteConfig.author}</div>
				</div>
			</div>
		</footer>
	);
}
