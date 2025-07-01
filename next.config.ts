import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: "standalone",
  images: {
    // Allow images from the specified domain
    domains: ["ebusiness-api.helixhub.info"], // <-- replace with your domain
  },
};

export default nextConfig;
