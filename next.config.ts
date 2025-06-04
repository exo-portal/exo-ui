import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import webpackPlugin from "unplugin-tailwindcss-mangle";

const nextIntlPlugin = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    if (options.dev === false) {
      config.plugins?.push(webpackPlugin.webpack());
    }
    return config;
  },
};

export default nextIntlPlugin(nextConfig);
