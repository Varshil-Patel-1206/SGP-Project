import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

/* Body Font */
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

/* Mono  */
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

/* PREMIUM HEADING FONT */
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "WoodMaps Co.",
  description: "Handcrafted wooden maps that bring your walls to life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${playfair.variable}
          font-sans
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
