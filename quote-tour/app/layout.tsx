import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Timber Quote | Valley Mill",
  description: "Get a timber quote in minutes — guided by a specialist.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-forest-900 antialiased">
        {children}
      </body>
    </html>
  );
}
