import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PharmaQuest",
  description: "Master the science of natural drugs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}