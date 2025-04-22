import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    RESUME_PARSER_KEY: process.env.RESUME_PARSER_KEY,
  },
};

export default nextConfig;
