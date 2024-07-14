import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
