/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // This enables static HTML export
  trailingSlash: true,  // This helps with Firebase static hosting paths
  images: {
    unoptimized: true,  // For static export, we need unoptimized images
    domains: ['contigo.equipo.io', 'res.cloudinary.com'],
  },
  // Enable static asset copying from public to out
  // This ensures all images will be copied correctly
  // Next.js now handles this differently in newer versions
  distDir: 'out',
};

export default nextConfig;