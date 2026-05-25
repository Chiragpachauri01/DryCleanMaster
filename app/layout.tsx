import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
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
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
