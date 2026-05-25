import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dry Clean Master | Premium Sofa, Carpet & Furnishing Deep Cleaning Delhi",
  description:
    "Delhi's elite choice for premium on-site sofa, carpet, mattress, and upholstery dry cleaning and wet cleaning services. Doorstep service across Delhi NCR. Book a free inspection visit today.",
  keywords:
    "sofa dry cleaning Delhi, carpet cleaning Delhi, mattress cleaning, upholstery cleaning, wet cleaning, fabric shampoo, premium cleaning service",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${outfit.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
