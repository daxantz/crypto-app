import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["coin-images.coingecko.com"], // Add the domain here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        port: "",
        pathname: "/coins/images/**",
      },
    ],
  },
};

export default nextConfig;
