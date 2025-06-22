import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
	title: "Perplexity AI Clone - Intelligent Search & AI Summarization",
	description:
		"A sophisticated AI-powered search engine that combines real-time web search with intelligent content summarization. Built with Next.js and React, it leverages Google's Gemini AI to provide comprehensive, well-structured answers to user queries.",
	keywords: [
		"AI search engine",
		"content summarization",
		"Next.js",
		"React",
		"Gemini AI",
		"real-time search",
		"web application",
		"full-stack development",
		"AI integration",
		"search engine clone",
		"artificial intelligence",
		"web search",
		"content analysis",
	],
	authors: [{ name: "Hrishubh Bhandari" }],
	creator: "Hrishubh Bhandari",
	publisher: "Hrishubh Bhandari",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://perplexity-ai-clone-theta.vercel.app"), // Replace with your actual domain
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "Perplexity AI Clone - Intelligent Search & AI Summarization",
		description:
			"A sophisticated AI-powered search engine that combines real-time web search with intelligent content summarization. Get comprehensive answers instantly with our Perplexity-inspired search engine.",
		url: "https://perplexity-ai-clone-theta.vercel.app", // Replace with your actual domain
		siteName: "Perplexity AI Clone",
		images: [
			{
				url: "/og-image.png", // You can create this image for better social sharing
				width: 1200,
				height: 630,
				alt: "Perplexity AI Clone - AI-powered search engine",
			},
		],
		locale: "en_US",
		type: "website",
	},
	linkedin: {
		title: "Perplexity AI Clone - Intelligent Search & AI Summarization",
		description:
			"A sophisticated AI-powered search engine that combines real-time web search with intelligent content summarization.",
		images: ["/og-image.png"], // Same image as OpenGraph
		author: "Hrishubh Bhandari", // Replace with your LinkedIn profile name
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		google: "SasUsH7xsyuV3e-ymgtTxMah03RQAuUu_V_GBS1fZps", // Add your Google Search Console verification code
		// yandex: 'your-yandex-verification-code',
		// yahoo: 'your-yahoo-verification-code',
	},
};

export default function RootLayout({ children }) {
  return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<SidebarProvider>
						<AppSidebar />
						<SidebarTrigger />
						<Provider>{children}</Provider>
						{/* {children} */}
					</SidebarProvider>
				</body>
			</html>
		</ClerkProvider>
  )
}
