import Link from "next/link";
import { Tag } from "./tag";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-2 border-border border-b py-3">
      <div>
        <h2 className="text-2xl font-bold">
          <Link href={"/projects/" + project.slug}>{project.title}</Link>
        </h2>
      </div>
      <div className="flex gap-2">
        {project.tags?.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      <div className="max-w-none text-muted-foreground">{project.description}</div>
      <div className="flex justify-between items-center">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={project.date}>{formatDate(project.date)}</time>
          </dd>
        </dl>
        <Link
          href={"/projects/" + project.slug}
          className={cn(buttonVariants({ variant: "link" }), "py-0")}>
          Read More →
        </Link>
      </div>
    </article>
  );
}