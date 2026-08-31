import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Delegate.ai — Stop summarizing. Start executing.",
  description:
    "Delegate.ai transforms meeting notes into real-world actions across Google Workspace autonomously. Powered by Gemini.",
  keywords: [
    "Delegate.ai",
    "AI agents",
    "autonomous execution",
    "Gemini",
    "Google Workspace",
    "meeting notes",
    "workflow automation",
  ],
  authors: [{ name: "Delegate.ai" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Delegate.ai — Stop summarizing. Start executing.",
    description:
      "Transform meeting notes into real-world actions across Google Workspace autonomously.",
    siteName: "Delegate.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delegate.ai — Stop summarizing. Start executing.",
    description:
      "Transform meeting notes into real-world actions across Google Workspace autonomously.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
