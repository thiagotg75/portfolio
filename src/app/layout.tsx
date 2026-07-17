import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Portfolio | Full-Stack Developer",
  description:
    "Portfólio de desenvolvedor full-stack especializado em React, Next.js, Python e mais.",
  keywords: ["portfolio", "developer", "react", "nextjs", "python", "fullstack"],
  authors: [{ name: "Thiago Diovane" }],
  openGraph: {
    title: "Dev Portfolio",
    description: "Full-Stack Developer Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
