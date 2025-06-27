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
  status: "Live" | "Completed" | "Refactoring v2";
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