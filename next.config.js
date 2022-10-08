/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["icatcare.org"]
  }
};

module.exports = nextConfig;
