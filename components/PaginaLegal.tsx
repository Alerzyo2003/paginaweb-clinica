import type { ReactNode } from 'react';
import { nunito } from '@/lib/fuentes';

/** Plantilla sobria para páginas legales: título, fecha de actualización y texto legible. */
export default function PaginaLegal({
  titulo,
  actualizado,
  children,
}: {
  titulo: string;
  /** 'AAAA-MM-DD' */
  actualizado: string;
  children: ReactNode;
}) {
  const [a, m, d] = actualizado.split('-').map(Number);
  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  return (
    <div className={`${nunito.className} bg-white`}>
      <div className="bg-[#071B3A] px-4 py-14 text-white md:px-8 md:py-20">
        <div className="mx-auto max-w-[800px]">
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">{titulo}</h1>
          <p className="mt-4 text-slate-300">
            Última actualización: <time dateTime={actualizado}>{`${d} de ${MESES[m - 1]} de ${a}`}</time>
          </p>
        </div>
      </div>
      <article className="mx-auto max-w-[800px] px-4 py-14 text-[16.5px] leading-relaxed text-slate-700 md:px-8 md:py-20 [&_a]:font-bold [&_a]:text-[#0A9BB8] [&_a:hover]:underline [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-[#071B3A] [&_li]:mt-1.5 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </article>
    </div>
  );
}
