import './globals.css'
import Navbar from '@/components/Navbar'; // Importar el Navbar
import Footer from '@/components/footer'; // Importar el Footer

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
        
        {/* Aquí cargas el Navbar globalmente */}
        <Navbar />
        
        <main className="flex-grow">
          {children} {/* Aquí es donde se carga tu page.tsx actual */}
        </main>
        
        {/* Aquí cargas el Footer globalmente */}
        <Footer />
        
      </body>
    </html>
  )
}
