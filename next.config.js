/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // ppr: true,
    typedRoutes: true,
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/map",
      permanent: false,
    },
    {
      source: "/highscore",
      destination: "/highscores",
      permanent: true,
    },
  ],
  images: {
    // unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { hostname: "kcdnccuifliyyw5b.public.blob.vercel-storage.com" },
      { hostname: "*.googleusercontent.com" },
      { hostname: "maps.googleapis.com" },
      { hostname: "picsum.photos" },
    ],
  },
};

const withPWA = require("@imbios/next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);
