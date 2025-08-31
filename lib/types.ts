import { IconType } from "react-icons";

export interface BlogPost {
  title: string;
  slug: string;
  description: string;
}

export interface Technology {
  icon: IconType;
  name: string;
}

export interface Screenshot {
  src: string;
  alt: string;
}

export interface Project {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
  technologies: Technology[];
  liveLink?: string;
  githubRepo?: string;
  status: "Live" | "In Development" | "Completed" | "Refactoring v2" | "Archived";
  featured: boolean;
  situation?: string;
  challenges?: string[];
  task?: string[];
  implementation?: string;
  learnings?: string[];
  changes?: string[];
  screenshots?: Screenshot[];
  relatedBlogPosts?: BlogPost[];
} 