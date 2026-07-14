import type { NextConfig } from "next";

export function getBaseConfig(): NextConfig {
  return {
    cacheComponents: true,
    poweredByHeader: false,
    typedRoutes: true,
    allowedDevOrigins: ['*.localhost'],
  };
}
