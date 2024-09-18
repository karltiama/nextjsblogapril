import { projects } from "@/content/projects/projectsData";
import { notFound } from "next/navigation";

function generateSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-');
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    projectName: generateSlug(project.title),
  }));
}

export default function ProjectPage({ params }: { params: { projectName: string } }) {
  const project = projects.find((p) => generateSlug(p.title) === params.projectName);

  if (!project) {
    notFound();
  }

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <img src={project.imageSrc} alt={project.altText} className="w-full mb-4" />
      <p className="text-lg mb-4">{project.description}</p>
      <h2 className="text-2xl font-semibold mb-2">Technologies Used:</h2>
      <ul className="list-disc list-inside mb-4">
        {project.technologies.map((tech, index) => (
          <li key={index}>{tech.name}</li>
        ))}
      </ul>
      {/* Add more detailed content about the project here */}
    </div>
  );
}
