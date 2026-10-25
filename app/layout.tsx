import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'; // Importar el Navbar
import Footer from '@/components/footer'; // Importar el Footer
import CustomCursor from '@/components/CustomCursor'; // <-- Importar el nuevo cursor animado
import OcultarEnAdmin from '@/components/OcultarEnAdmin'; // Oculta menú, footer y cursor en /admin
import BarraContactoMovil from '@/components/BarraContactoMovil'; // Llamar / WhatsApp / agendar fijo en celular
import { CLINICA } from '@/lib/clinica';
import { SpeedInsights } from '@vercel/speed-insights/next'; // Velocidad real de los visitantes (Core Web Vitals) en Vercel

const descripcion =
  'Clínica dental en La Pintana. Evaluación gratis, urgencias dentales, ortodoncia, implantes y odontopediatría. Atendemos de lunes a sábado.'

// Título y descripción del inicio. Cada página define los suyos en su layout.tsx
// (con metaPagina de lib/seo.ts) y la plantilla agrega " | Clínica Dignidad" al final.
export const metadata: Metadata = {
  metadataBase: new URL(CLINICA.url),
  title: {
    default: 'Dentista en La Pintana · Evaluación gratis | Clínica Dignidad',
    template: '%s | Clínica Dignidad',
  },
  description: descripcion,
  alternates: { canonical: '/' },
  // Verificación de Google Search Console: pega el código en la variable GOOGLE_SITE_VERIFICATION de Vercel.
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: CLINICA.nombre,
    title: 'Clínica Dignidad · Dentista en La Pintana',
    description: descripcion,
    url: '/',
    images: [{ url: '/foto-paciente.png', alt: 'Paciente sonriendo en Clínica Dignidad' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">

        {/* Aquí cargas el cursor globalmente (invisible en móviles automáticamente) */}
        <OcultarEnAdmin><CustomCursor /></OcultarEnAdmin>

        {/* Aquí cargas el Navbar globalmente */}
        <OcultarEnAdmin><Navbar /></OcultarEnAdmin>

        <main className="flex-grow">
          {children} {/* Aquí es donde se carga tu page.tsx actual */}
        </main>

        {/* Aquí cargas el Footer globalmente */}
        <OcultarEnAdmin><Footer /></OcultarEnAdmin>

        {/* Barra fija de contacto en celular (se oculta sola en /admin y /tienda) */}
        <BarraContactoMovil />

        <SpeedInsights />

      </body>
    </html>
  )
}
