import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // URL antigua que quedó enlazada; la página real es /especialidades/odontologia.
      {
        source: "/especialidades/odontologia-general",
        destination: "/especialidades/odontologia",
        permanent: true,
      },
    ];
  },
  images: {
    // Fotos de productos de la tienda, guardadas en Supabase Storage.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
