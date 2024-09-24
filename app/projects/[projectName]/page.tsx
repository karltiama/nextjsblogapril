import { projects } from "@/content/projects/projectsData";
import { notFound } from "next/navigation";
import Image from "next/image";

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
      <h1 className="font-black text-3xl md:text-4xl lg:text-5xl mb-4">{project.title}</h1>
      <img src={project.imageSrc} alt={project.altText} className="w-full mb-6" />
      <p className="text-xl text-muted-foreground mb-8">{project.description}</p>
      
      <h2 className="text-2xl font-semibold mb-2">Technologies Used:</h2>
      <ul className="list-disc list-inside mb-4">
        {project.technologies.map((tech, index) => (
          <li key={index}>{tech.name}</li>
        ))}
      </ul>

      {project.challenges && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Challenges:</h2>
          <ul className="list-disc list-inside mb-4">
            {project.challenges.map((challenge, index) => (
              <li key={index}>{challenge}</li>
            ))}
          </ul>
        </>
      )}

      {project.learnings && (
        <>
          <h2 className="text-2xl font-semibold mb-2">What I Learned:</h2>
          <ul className="list-disc list-inside mb-4">
            {project.learnings.map((learning, index) => (
              <li key={index}>{learning}</li>
            ))}
          </ul>
        </>
      )}

      {project.implementation && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Implementation Details:</h2>
          <p className="text-lg mb-4">{project.implementation}</p>
        </>
      )}

      {project.changes && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Changes:</h2>
          <p className="text-lg mb-4">{project.changes}</p>
        </>
      )}

      {project.screenshots && project.screenshots.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Screenshots:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {project.screenshots.map((screenshot, index) => (
              <div key={index} className="relative aspect-video">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
