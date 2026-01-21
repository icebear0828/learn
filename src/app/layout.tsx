import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/themes/index.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Developer Showcase",
  description: "A portfolio showcasing projects and learning journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Script to prevent FOUC by setting theme before paint
  const themeScript = `
    (function() {
      try {
        var theme = localStorage.getItem('app-theme');
        if (theme && ['dark-elegance','light-clean','ocean-blue','forest-green','sunset-orange','royal-purple','sakura-pink'].includes(theme)) {
          document.documentElement.setAttribute('data-theme', theme);
        } else {
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.setAttribute('data-theme', prefersDark ? 'dark-elegance' : 'light-clean');
        }
      } catch(e) {
        document.documentElement.setAttribute('data-theme', 'dark-elegance');
      }
    })();
  `;

  return (
    <html lang="zh" suppressHydrationWarning data-theme="dark-elegance">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        style={{
          backgroundColor: 'var(--bg-base)',
          color: 'var(--text-primary)',
        }}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

