import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // 75 is the default; 90 is used for the hero cut-out, where compression artefacts show most.
    qualities: [75, 90],
  },
};

export default nextConfig;
