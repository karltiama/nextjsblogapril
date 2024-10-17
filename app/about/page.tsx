import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "About Me",
	description: "Information about me",
};

export default async function AboutPage() {
	return (
		<div className="container max-w-6xl py-6 lg:py-10">
			<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-x-4">
					<h1 className="inline-block font-black text-4xl lg:text-5xl">
						About Me
					</h1>
				</div>
			</div>
			<hr className="my-8" />
			<div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
				<div className="min-w-48 max-w-48 flex flex-col gap-2">
					<Avatar className="h-48 w-48">
						<AvatarImage src="/memoji.png" alt={siteConfig.author} />
						<AvatarFallback>JC</AvatarFallback>
					</Avatar>
					<h2 className="text-2xl font-bold text-center break-words">
						{siteConfig.author}
					</h2>
					<p className="text-muted-foreground text-center break-words">
						Software Developer
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<p className="text-lg">
						As a passionate Software Developer, I specialize in building robust and scalable applications using modern web technologies. With a strong foundation in TypeScript, React, and Next.js, I strive to create efficient and user-friendly solutions.
					</p>
					<h3 className="text-xl font-semibold mt-4">Professional Journey</h3>
					<p>
						My career in software development has been marked by continuous learning and growth. In 2020, I began my journey as a Web Developer. With an engineering degree in Computer Engineering and a passion for technology, the transition was natural. 
						I&apos;ve had the opportunity to work on diverse projects, ranging from e-commerce platforms to data-intensive applications, which has honed my skills in full-stack development.

						In this website I will be writing about my journey as a developer and my experiences. I will also be sharing some of the projects I have worked on and the technologies I have used. I believe that sharing knowledge is one of the best ways to grow as a developer, and I am always looking to share my knowledge with the community, So contact me if you want to work together or just want to chat about web development.
					</p>
					<h3 className="text-xl font-semibold mt-4">Skills & Expertise</h3>
					<ul className="list-disc list-inside">
						<li>Frontend: React, Next.js, Tailwind CSS</li>
						<li>Backend: Node.js, Express, Supabase</li>
						<li>Mobile: React Native, Expo</li>
						<li>State Management: Zustand, TanStack Query</li>
						<li>DevOps: Git, CI/CD, Docker</li>
					</ul>
					<h3 className="text-xl font-semibold mt-4">Beyond Coding</h3>
					<p>
						When I&apos;m not coding, you can find me exploring new hiking trails, experimenting with photography, or contributing to open-source projects. I&apos;m also passionate about mentoring junior developers and sharing knowledge within the tech community.
					</p>
				</div>
			</div>
		</div>
	);
}
