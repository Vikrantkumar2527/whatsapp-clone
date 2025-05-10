/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 1488067480,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "959c8fe0ab98ab69156555e7e52aa8bf",
  },
  output: "export", // ✅ Recommended for Next.js 13.4+ static sites
  images: {
    unoptimized: true, // ✅ Disable image optimization for export
    domains: ["localhost", "twhat.onrender.com"], // You can keep this
  },
};

module.exports = nextConfig;

