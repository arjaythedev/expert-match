import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bureauSans = localFont({
  src: [
    { path: "../fonts/STKBureauSans-Book.ttf", weight: "400", style: "normal" },
    { path: "../fonts/STKBureauSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/STKBureauSans-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-bureau-sans",
});

const bureauSerif = localFont({
  src: [
    { path: "../fonts/STKBureauSerif-Book.ttf", weight: "300", style: "normal" },
  ],
  variable: "--font-bureau-serif",
});

export const metadata: Metadata = {
  title: "Expert Match | Learn from Humans. Find Your Expert.",
  description:
    "Take a 2 minute quiz to discover the perfect expert for your goals. Swipe through questions and get matched with world-class instructors.",
  openGraph: {
    title: "Expert Match | Learn from Humans. Find Your Expert.",
    description: "Take a 2 minute quiz to discover the perfect expert for your goals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bureauSans.variable} ${bureauSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
