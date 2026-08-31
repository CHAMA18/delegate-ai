import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Delegate.ai — Your meeting notes, executed.",
  description:
    "Delegate.ai turns meeting notes into autonomous actions across Google Workspace. Powered by Gemini. No prompts, no reminders — just work, done.",
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
    title: "Delegate.ai — Your meeting notes, executed.",
    description:
      "Turn meeting notes into autonomous actions across Google Workspace.",
    siteName: "Delegate.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delegate.ai — Your meeting notes, executed.",
    description:
      "Turn meeting notes into autonomous actions across Google Workspace.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
