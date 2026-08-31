import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import GoogleAnalytics from '@/components/GoogleAnalitics';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'El-Furkan.al - Kurani Fisnik në shqip',
	description: 'El-Furkan.al është website faqe webi për përkthim dhe komentim e Kuran-it famëlartë',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={cn("font-sans", inter.variable)}>
			<head>
				<GoogleAnalytics />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
				{/* TODO ? dark mode */}
				<AntdRegistry>
					<Navbar />
					<div>{children}</div>
					<Footer />
				</AntdRegistry>
			</body>
		</html>
	);
}
