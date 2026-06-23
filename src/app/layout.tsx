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
  title: "UWIMPUHWE Regis | Full-Stack Developer",
  description:
    "Professional portfolio of UWIMPUHWE Regis — Full-Stack Developer specializing in Next.js, React, TypeScript, and modern web applications.",
  openGraph: {
    title: "UWIMPUHWE Regis | Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in Next.js, React, TypeScript, and modern web applications.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%23000'/><text x='16' y='22' font-size='16' font-weight='bold' text-anchor='middle' fill='%2322c55e'>~$</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})();`,
        }} />
      </head>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
