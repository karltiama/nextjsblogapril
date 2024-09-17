import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";
import Script from "next/script"; // Import Script from 'next/script'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-pt-[3.5rem]" suppressHydrationWarning>
			<head>
				{/* Umami Tracking Script in Head */}
				<Script
					defer
					src="https://cloud.umami.is/script.js"
					data-website-id="3d15d7a9-0fe1-4f42-9846-8e817013dd3d"
				/>
			</head>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					inter.variable
				)}>
				<Providers>
					<div className="relative flex min-h-dvh flex-col bg-background">
						<SiteHeader />
						<main className="flex-1">{children}</main>
						<SiteFooter />
					</div>
					<SpeedInsights />
				</Providers>
			</body>
		</html>
	);
}
