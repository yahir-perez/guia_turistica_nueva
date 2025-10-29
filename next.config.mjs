/** @type {import('next').NextConfig} */
const nextConfig = {
  // Es probable que ya tengas otras configuraciones aquí...

  // Agrega esta sección:
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;