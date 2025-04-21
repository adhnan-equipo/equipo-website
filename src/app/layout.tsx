import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Equipe Healthcare',
    default: 'Equipe Healthcare - Advanced Healthcare Operations Platform',
  },
  description: "Equipe delivers advanced healthcare operations solutions with integrated systems for better patient care and operational efficiency.",
  keywords: ["healthcare", "healthcare technology", "interoperability", "healthcare operations", "medical software"],
  authors: [{ name: "Equipe Healthcare" }],
  creator: "Equipe Healthcare",
  publisher: "Equipe Healthcare",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://equipe-healthcare.com',
    siteName: 'Equipe Healthcare',
    title: 'Equipe Healthcare - Advanced Healthcare Operations Platform',
    description: 'Equipe delivers advanced healthcare operations solutions with integrated systems for better patient care and operational efficiency.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipe Healthcare',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Equipe Healthcare - Advanced Healthcare Operations Platform',
    description: 'Equipe delivers advanced healthcare operations solutions with integrated systems for better patient care and operational efficiency.',
    images: ['/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans text-darkBlue`}
      >
        {children}
      </body>
    </html>
  );
}