import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Mail, Github, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "About Karl Tiama - Full-Stack Developer",
	description: "Learn about Karl Tiama's journey from engineering to full-stack development, specializing in React, Next.js, and modern web technologies.",
};

const skills = {
	"Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
	"Backend": ["Node.js", "Express", "Supabase", "PostgreSQL", "REST APIs"],
	"Tools & DevOps": ["Git", "GitHub", "Docker", "Vercel", "CI/CD"],
	"Mobile": ["React Native", "Expo"],
	"Other": ["Zustand", "TanStack Query", "MDX", "OAuth"]
};

const achievements = [
	{
		metric: "4+",
		label: "Years of Development Experience",
		description: "Since transitioning to web development in 2020"
	},
	{
		metric: "28+",
		label: "Technical Articles Published",
		description: "Sharing knowledge and insights on modern web development"
	},
	{
		metric: "15+",
		label: "Projects Completed",
		description: "From personal projects to client solutions"
	}
];

export default async function AboutPage() {
	return (
		<div className="container max-w-6xl py-6 lg:py-10">
			<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-x-4">
					<h1 className="inline-block font-black text-4xl lg:text-5xl">
						About Me
					</h1>
					<p className="text-xl text-muted-foreground mt-4">
						Full-Stack Developer passionate about creating scalable, user-focused web applications
					</p>
				</div>
			</div>
			<hr className="my-8" />
			
			<div className="grid gap-8 md:grid-cols-3">
				{/* Profile Section */}
				<div className="md:col-span-1">
					<Card>
						<CardContent className="p-6">
							<div className="flex flex-col items-center text-center space-y-4">
								<Avatar className="h-32 w-32">
									<AvatarImage src="/memoji.png" alt={siteConfig.author} />
									<AvatarFallback>KT</AvatarFallback>
								</Avatar>
								<div>
									<h2 className="text-2xl font-bold">{siteConfig.author} Tiama</h2>
									<p className="text-muted-foreground">Full-Stack Developer</p>
								</div>
								
								<div className="flex flex-col space-y-2 text-sm text-muted-foreground">
									<div className="flex items-center gap-2">
										<Calendar className="w-4 h-4" />
										<span>Available for opportunities</span>
									</div>
									<div className="flex items-center gap-2">
										<MapPin className="w-4 h-4" />
										<span>Open to remote work</span>
									</div>
								</div>

								<div className="flex gap-2 w-full">
									<Button asChild className="flex-1" size="sm">
										<Link href="mailto:karl@karltiama.dev">
											<Mail className="w-4 h-4 mr-2" />
											Contact
										</Link>
									</Button>
									<Button asChild variant="outline" size="sm">
										<Link href={siteConfig.links.github} target="_blank">
											<Github className="w-4 h-4" />
										</Link>
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Achievements */}
					<Card className="mt-6">
						<CardContent className="p-6">
							<h3 className="font-semibold mb-4">Key Metrics</h3>
							<div className="space-y-4">
								{achievements.map((achievement, index) => (
									<div key={index} className="text-center">
										<div className="text-2xl font-bold text-primary">{achievement.metric}</div>
										<div className="text-sm font-medium">{achievement.label}</div>
										<div className="text-xs text-muted-foreground">{achievement.description}</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Main Content */}
				<div className="md:col-span-2 space-y-8">
					{/* Professional Journey */}
					<div>
						<h3 className="text-2xl font-semibold mb-4">Professional Journey</h3>
						<div className="prose prose-neutral dark:prose-invert max-w-none">
							<p className="text-lg leading-relaxed">
								With a <strong>Computer Engineering background</strong> and <strong>4+ years of web development experience</strong>, 
								I specialize in building robust, scalable applications using modern technologies. My transition 
								into web development in 2020 was driven by a passion for creating solutions that make a real impact.
							</p>
							<p>
								I've successfully delivered projects ranging from <strong>fitness tracking applications</strong> integrating 
								complex APIs like Strava, to <strong>full-stack applications</strong> with authentication, database management, 
								and real-time features. My approach combines technical excellence with user-centered design principles.
							</p>
							<p>
								Beyond coding, I'm passionate about <strong>knowledge sharing</strong> through technical writing, 
								having published <strong>28+ articles</strong> that help other developers understand complex concepts 
								through practical examples and mental models.
							</p>
						</div>
					</div>

					{/* Technical Skills */}
					<div>
						<h3 className="text-2xl font-semibold mb-4">Technical Skills</h3>
						<div className="space-y-4">
							{Object.entries(skills).map(([category, techList]) => (
								<div key={category}>
									<h4 className="font-medium mb-2 text-muted-foreground">{category}</h4>
									<div className="flex flex-wrap gap-2">
										{techList.map((tech) => (
											<Badge key={tech} variant="secondary">
												{tech}
											</Badge>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* What I Bring */}
					<div>
						<h3 className="text-2xl font-semibold mb-4">What I Bring to Teams</h3>
						<div className="grid gap-4 sm:grid-cols-2">
							<Card>
								<CardContent className="p-4">
									<h4 className="font-semibold mb-2">🚀 Full-Stack Expertise</h4>
									<p className="text-sm text-muted-foreground">
										End-to-end development from UI/UX to database design and API development
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h4 className="font-semibold mb-2">📊 Data-Driven Approach</h4>
									<p className="text-sm text-muted-foreground">
										Experience with API integrations, data visualization, and performance optimization
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h4 className="font-semibold mb-2">✍️ Communication Skills</h4>
									<p className="text-sm text-muted-foreground">
										Strong technical writing and documentation skills, proven through published articles
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-4">
									<h4 className="font-semibold mb-2">🔄 Continuous Learning</h4>
									<p className="text-sm text-muted-foreground">
										Staying current with modern web technologies and best practices
									</p>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Personal Interests */}
					<div>
						<h3 className="text-2xl font-semibold mb-4">Beyond Coding</h3>
						<p className="text-muted-foreground">
							When I'm not coding, you'll find me running (training for marathons), exploring new hiking trails, 
							or experimenting with the latest web technologies. I believe in maintaining a healthy work-life balance 
							and find that physical activities often lead to creative solutions for coding challenges.
						</p>
					</div>

					{/* Call to Action */}
					<Card className="bg-muted/50">
						<CardContent className="p-6 text-center">
							<h3 className="text-xl font-semibold mb-2">Let's Work Together</h3>
							<p className="text-muted-foreground mb-4">
								I'm always interested in discussing new opportunities and innovative projects
							</p>
							<div className="flex gap-4 justify-center">
								<Button asChild>
									<Link href="/projects">
										View My Projects
										<ExternalLink className="w-4 h-4 ml-2" />
									</Link>
								</Button>
								<Button asChild variant="outline">
									<Link href="mailto:karl@karltiama.dev">
										Get In Touch
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
