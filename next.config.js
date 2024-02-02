/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "hotpot.ai",
        port: "",
      },
      {
        protocol: "https",
        hostname: "hotpotmedia.s3.us-east-2.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "apumpkinandaprincess.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
