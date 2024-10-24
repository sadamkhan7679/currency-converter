/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flagsapi.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
