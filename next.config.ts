import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.226.159.122"],
  // Canonicals across the site (blog, web stories) use trailing slashes; make
  // the served URLs match so canonical === served URL (no redirect mismatch).
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
