import { projects } from "@/content/projects/projectsData";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"; // Make sure this path is correct

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
      
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2">Technologies Used:</h2>
          <div className="flex items-center gap-4">
            <TooltipProvider>
              {project.technologies.map((tech, index) => {
                const IconComponent = tech.icon;
                return (
                  <Tooltip key={index} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <span className="flex items-center">
                        <IconComponent className="w-8 h-8" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tech.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2">Project Links:</h2>
          <div className="space-y-2">
            {project.liveLink ? (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline flex items-center gap-2"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                <span>View Live Project</span>
              </a>
            ) : (
              <p className="text-muted-foreground">Live link not available</p>
            )}
            {project.githubRepo ? (
              <a 
                href={project.githubRepo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline flex items-center gap-2"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            ) : (
              <p className="text-muted-foreground">GitHub repository not available</p>
            )}
          </div>
        </div>
      </div>
      {project.situation && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Explanation:</h2>
          <p className="text-lg mb-4">{project.situation}</p>
        </>
      )}
      {project.challenges && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Challenges and Key Features:</h2>
          <ul className="list-disc list-inside mb-4">
            {project.challenges.map((challenge, index) => (
              <li key={index}>{challenge}</li>
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
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="relative w-full aspect-[16/9] cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <Button variant="ghost" className="text-white">
                        View Full Screenshot
                      </Button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="lg:max-w-screen-lg overflow-y-auto max-h-screen p-0">
                  <div className="w-full bg-background p-4">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={1920}
                      height={1080}
                      className="w-full h-auto"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
