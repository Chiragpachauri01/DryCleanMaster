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
  title: "Premium Sofa and Carpet Cleaning in Delhi: Dry Clean Master",
  description:
    "Looking for professional dry cleaning services in Delhi? Dry Clean Master offers same-day dry clean service at home for sofas, carpets, etc. Contact us today!",
  keywords:
    "sofa dry cleaning Delhi, carpet cleaning Delhi, mattress cleaning, upholstery cleaning, wet cleaning, fabric shampoo, premium cleaning service",
  manifest: "/site.webmanifest",
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
