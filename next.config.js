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
    domains: [
      "unsplash.com",
      "images.unsplash.com",
      "hotpot.ai",
      "hotpotmedia.s3.us-east-2.amazonaws.com",
      "res.cloudinary.com",
      "apumpkinandaprincess.com",
      "avatars.githubusercontent.com",
      "cdn.pixabay.com",
    ],
  },
};

module.exports = nextConfig;
