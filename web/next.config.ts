import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";
import path from "path";

// Load environment variables from the workspace root (.env) instead of web/.env
loadEnvConfig(path.resolve(process.cwd(), ".."));

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  transpilePackages: ["@portfolio/core", "@portfolio/packages", "@portfolio/database"],
  reactCompiler: true,
};

export default nextConfig;

