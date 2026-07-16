/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export → la carpeta out/ se puede hostear en cualquier lado.
  // En Vercel funciona tal cual (detecta Next.js automáticamente).
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
