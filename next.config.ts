import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/MY-PF",
  images: { unoptimized: true },
};

export default nextConfig;
