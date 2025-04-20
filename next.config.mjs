/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-static.aiease.ai",
      },
    ],
  },
};

export default nextConfig;
