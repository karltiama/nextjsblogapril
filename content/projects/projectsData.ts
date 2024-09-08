// projectsData.ts

import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

export const projects = [
	{
		title: "Project 1",
		description: "A detailed description of the first project.",
		imageSrc: "/placeholder.svg",
		altText: "Project 1",
		projectLink: "#",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
		],
	},
	{
		title: "Project 2",
		description: "A detailed description of the second project.",
		imageSrc: "/placeholder.svg",
		altText: "Project 2",
		projectLink: "#",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
		],
	},
];
