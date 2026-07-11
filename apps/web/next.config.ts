import { getBaseConfig } from "@packages/next-libs/next-config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...getBaseConfig(),
  transpilePackages: ["@packages/supabase"],
};

export default nextConfig;
