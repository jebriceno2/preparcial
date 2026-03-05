import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io"
      },
      {
        protocol:"https",
        hostname:"www.clipartmax.com"
      }

    ]
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
