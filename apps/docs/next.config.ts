import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Let phones and other machines on the LAN (http://192.168.x.x:3100) use
  // hot reload in `next dev`. Dev-only; has no effect on production builds.
  allowedDevOrigins: ["192.168.*.*"],
}

export default nextConfig
