import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/navbar/NavBar";
import ModeProvider from "./theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Project 4 - Availability Scheduler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ModeProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased flex flex-col items-center overflow-x-hidden",
            fontSans.variable
          )}
        >
          <NavBar />
          <Toaster />
          {children}
        </body>
      </ModeProvider>
    </html>
  );
}
