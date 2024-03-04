import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";

import SidebarWrapper from "@/components/Sidebar/sidebar";
import BottomNavbar from "@/components/BottomNavbar";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
	],
	icons: {
		icon: "/fav-icon.ico",
		shortcut: "/fav-icon-16x16.png",
		apple: "/apple-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased text-white",
					fontSans.variable
				)}
				style={{
					backgroundImage: `url("/assets/banners/bus.jpg")`,
					backgroundColor: "green",
					backgroundRepeat: "repeat",
					backgroundSize: "cover",
				}}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>

					<div className="relative flex flex-col h-screen mb-20">
						<Navbar />
						<SidebarWrapper />
						<main className="container mx-auto max-w-7xl pt-0 px-6 flex-grow">
							{children}
						</main>
						<footer className="w-full flex items-center justify-center">
							<BottomNavbar className="flex w-full fixed bottom-0" />
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
