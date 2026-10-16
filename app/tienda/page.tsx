import type { Metadata } from 'next';
import { Clock, MapPin, MessageCircle, Wallet } from 'lucide-react';
import type { ReactNode } from 'react';
import Catalogo from '@/components/tienda/Catalogo';
import { dancing } from '@/lib/fuentes';
import { linkWhatsApp, TIENDA } from '@/lib/tienda/config';
import { CATEGORIAS } from '@/lib/tienda/categorias';
import { obtenerProductos } from '@/lib/tienda/datos';
import type { CategoriaId } from '@/lib/tienda/tipos';

// Siempre muestra los precios y el stock más recientes del panel.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tienda | Clínica Dignidad',
  description:
    'Cepillos, pastas, enjuagues y productos de higiene oral recomendados por la Clínica Dignidad. Pide online y retira en La Pintana.',
};

const PASOS = [
  {
    color: '#22B3CF',
    titulo: 'Elige tus productos',
    detalle: 'Agrégalos al carrito desde esta página.',
  },
  {
    color: '#FDB92B',
    titulo: 'Confirma y elige cómo pagar',
    detalle: 'Por transferencia o en la clínica al retirar.',
  },
  {
    color: '#8DBF3F',
    titulo: 'Retíralo en la clínica',
    detalle: `Lo guardamos ${TIENDA.diasReserva} días hábiles. Sin costo de envío.`,
  },
];

type Props = { searchParams: Promise<{ categoria?: string | string[] }> };

export default async function TiendaPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const categoriaInicial = CATEGORIAS.find((c) => c.id === categoria)?.id as CategoriaId | undefined;
  const productos = await obtenerProductos();

  return (
    <>
      {/* ===== Portada ===== */}
      <section className="relative bg-[#071B3A] text-white">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 pb-2 pt-8 md:px-8 md:pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
          <div>
            <p className={`${dancing.className} text-[26px] leading-none text-[#FDB92B] md:text-[30px]`}>
              La vitrina de la clínica
            </p>
            <h1 className="mt-3 max-w-[20ch] text-[32px] font-black leading-[1.05] tracking-[-0.015em] sm:text-[42px] lg:text-[50px]">
              Lo que te recomendamos en consulta, listo para llevar
            </h1>
            <p className="mt-5 max-w-[48ch] text-[16.5px] leading-relaxed text-slate-300 md:text-[18px]">
              Cepillos, pastas y enjuagues que usamos y recomendamos en la clínica. Haz tu pedido aquí y retíralo en{' '}
              {TIENDA.direccion}.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2 lg:hidden">
              <li className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3.5 py-2 text-[13.5px] font-bold text-slate-100">
                <MapPin className="h-4 w-4 text-[#FDB92B]" aria-hidden="true" />
                Retiro en la clínica, sin costo
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3.5 py-2 text-[13.5px] font-bold text-slate-100">
                <Wallet className="h-4 w-4 text-[#FDB92B]" aria-hidden="true" />
                Transferencia o pago al retirar
              </li>
            </ul>
          </div>

          <div className="hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-7 lg:block">
            <h2 className="text-[17px] font-extrabold text-white">Cómo comprar</h2>
            <ol className="mt-5 space-y-5">
              {PASOS.map((paso, i) => (
                <li key={paso.titulo} className="flex items-start gap-4">
                  <span
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[17px] font-black text-[#071B3A]"
                    style={{ backgroundColor: paso.color }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="pt-0.5">
                    <span className="block text-[16px] font-extrabold">{paso.titulo}</span>
                    <span className="mt-0.5 block text-[14.5px] text-slate-300">{paso.detalle}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Borde inferior con forma de sonrisa */}
        <svg
          className="block h-[34px] w-full translate-y-[33px] md:h-[56px] md:translate-y-[55px]"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 0H1440V6Q720 158 0 6Z" fill="#071B3A" />
          <path d="M0 6Q720 158 1440 6" fill="none" stroke="#FDB92B" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
      </section>

      {/* ===== Productos ===== */}
      <section aria-label="Productos" className="mx-auto max-w-[1400px] px-4 pb-16 pt-14 md:px-8 md:pt-20">
        <Catalogo key={categoriaInicial ?? 'todo'} productos={productos} categoriaInicial={categoriaInicial} />
      </section>

      {/* ===== Información de compra ===== */}
      <section className="border-t border-[#E3EBF3] bg-white">
        <div className="mx-auto max-w-[1400px] px-4 pb-28 pt-12 md:px-8 md:pb-16">
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            <BloqueInfo icono={<MapPin className="h-5 w-5" aria-hidden="true" />} titulo="Retiro en la clínica">
              <a
                href={TIENDA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#0F2950] underline decoration-[#C9D7E6] underline-offset-4 hover:decoration-[#0F2950]"
              >
                {TIENDA.direccion}
              </a>
              <span className="mt-2 flex items-start gap-2">
                <Clock className="mt-[3px] h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden="true" />
                <span>
                  {TIENDA.horario.map((h) => (
                    <span key={h} className="block">
                      {h}
                    </span>
                  ))}
                </span>
              </span>
              <span className="mt-2 block">Guardamos tu pedido {TIENDA.diasReserva} días hábiles.</span>
            </BloqueInfo>

            <BloqueInfo icono={<Wallet className="h-5 w-5" aria-hidden="true" />} titulo="Formas de pago">
              <span className="block">
                <strong className="text-[#0F2950]">Transferencia:</strong> te mostramos los datos al confirmar el pedido.
              </span>
              <span className="mt-2 block">
                <strong className="text-[#0F2950]">Pago al retirar:</strong> pagas en recepción cuando vienes a
                buscarlo.
              </span>
            </BloqueInfo>

            <BloqueInfo icono={<MessageCircle className="h-5 w-5" aria-hidden="true" />} titulo="Dudas, cambios y devoluciones">
              <span className="block">Escríbenos y te ayudamos con tu pedido.</span>
              <a
                href={linkWhatsApp('Hola, tengo una consulta sobre la tienda de la clínica.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-bold text-[#0F2950] underline decoration-[#C9D7E6] underline-offset-4 hover:decoration-[#0F2950]"
              >
                WhatsApp {TIENDA.telefonoVisible}
              </a>
            </BloqueInfo>
          </div>
          <p className="mt-10 text-[13px] text-slate-500">Precios en pesos chilenos con IVA incluido.</p>
        </div>
      </section>
    </>
  );
}

function BloqueInfo({ icono, titulo, children }: { icono: ReactNode; titulo: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#E3F4F8] text-[#07758C]">
        {icono}
      </span>
      <div className="text-[15px] leading-relaxed text-slate-600">
        <h2 className="mb-1.5 text-[16.5px] font-black text-[#0F2950]">{titulo}</h2>
        {children}
      </div>
    </div>
  );
}
