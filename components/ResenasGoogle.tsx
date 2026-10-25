import { ExternalLink, MessageSquareHeart, Star } from 'lucide-react';
import { CLINICA } from '@/lib/clinica';

const focusLight =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071B3A] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

/**
 * Bloque de reseñas: lleva a las opiniones reales de pacientes en el perfil de Google
 * y a dejar una nueva. No copia reseñas ni la nota al sitio (se desactualizarían).
 */
export default function ResenasGoogle({ className = '' }: { className?: string }) {
  return (
    <section aria-labelledby="resenas-titulo" className={`px-4 md:px-8 ${className}`}>
      <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-6 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_50px_-20px_rgba(7,27,58,0.18)] md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <div className="flex gap-1 text-[#FDB92B]" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-6 w-6 fill-current" />
            ))}
          </div>
          <h2 id="resenas-titulo" className="mt-3 text-2xl font-black tracking-tight text-[#071B3A] md:text-3xl">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-slate-600">
            Lee las reseñas de quienes ya se atendieron con nosotros en Google. Si ya eres paciente, tu opinión ayuda a
            otras familias de La Pintana a elegir.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:flex-col lg:flex-row">
          <a
            href={CLINICA.google.resenasUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 rounded-full bg-[#071B3A] px-7 py-3.5 text-[15px] font-extrabold text-white transition-colors hover:bg-[#0B2350] ${focusLight}`}
          >
            Ver reseñas en Google
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={CLINICA.google.escribirResenaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 rounded-full border-2 border-[#071B3A] px-7 py-3 text-[15px] font-extrabold text-[#071B3A] transition-colors hover:border-[#FDB92B] hover:bg-[#FDB92B] ${focusLight}`}
          >
            <MessageSquareHeart className="h-5 w-5" aria-hidden="true" />
            Dejar una reseña
          </a>
        </div>
      </div>
    </section>
  );
}
