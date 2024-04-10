import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link  from "next/link";
import { buttonVariants } from "./ui/button";

export function SiteHeader() {
  return (
      <header className="sticky top-0 w-full border-b border-border bg-background/95 blackdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center">
              <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <div className={cn(buttonVariants({ variant: "ghost"}),
                "w-10 px-"
              )}
              >

                </div>
              </Link>
            </nav>
          </div>
        </div>
      </header>
    );
}