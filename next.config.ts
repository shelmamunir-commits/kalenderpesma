import type { NextConfig } from "next";

// GitHub Pages (project site) hanya bisa serve file statis,
// jadi build production diekspor penuh ke folder ./out.
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  // Berlaku saat build production agar aset & route ter-prefix
  // /kalenderpesma. Saat dev lokal (npm run dev) tetap di root.
  basePath: isProd ? "/kalenderpesma" : undefined,
  trailingSlash: true,
  images: {
    // next/image optimization server tidak tersedia di Pages.
    unoptimized: true,
  },
};

export default nextConfig;
