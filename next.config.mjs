/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Игнорировать ошибки TypeScript при сборке
    ignoreBuildErrors: true,
  },
  eslint: {
    // Игнорировать предупреждения/ошибки ESLint при сборке
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;