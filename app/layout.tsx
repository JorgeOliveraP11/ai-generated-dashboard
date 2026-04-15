import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactElement, ReactNode } from "react";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Smart Personal Finance Dashboard",
  description: "Track spending, budgets, and goals in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
