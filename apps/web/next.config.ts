import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@packages/supabase"],
};

export default nextConfig;
