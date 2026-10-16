import './globals.css'
import Navbar from '@/components/Navbar'; // Importar el Navbar
import Footer from '@/components/footer'; // Importar el Footer
import CustomCursor from '@/components/CustomCursor'; // <-- Importar el nuevo cursor animado
import OcultarEnAdmin from '@/components/OcultarEnAdmin'; // Oculta menú, footer y cursor en /admin

export const metadata = {
  title: 'Clínica Dignidad',
  description: 'Tu sonrisa nos importa',
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
        
      </body>
    </html>
  )
}
