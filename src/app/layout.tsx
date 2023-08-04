import "./globals.css";
import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const libreFranklin = Libre_Franklin({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Admin Dashboard",
	description: "Admin Dashboard",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={cn(libreFranklin.className, "bg-background")}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
