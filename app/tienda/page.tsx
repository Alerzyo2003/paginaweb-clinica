import type { Metadata } from 'next';
import { Clock, MapPin, MessageCircle, Wallet } from 'lucide-react';
import type { ReactNode } from 'react';
import Catalogo from '@/components/tienda/Catalogo';
import { linkWhatsApp, TIENDA } from '@/lib/tienda/config';
import { CATEGORIAS } from '@/lib/tienda/categorias';
import { obtenerProductos } from '@/lib/tienda/datos';
import { metaPagina } from '@/lib/seo';
import type { CategoriaId } from '@/lib/tienda/tipos';

// Siempre muestra los precios y el stock más recientes del panel.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = metaPagina({
  titulo: 'Tienda de higiene oral en La Pintana',
  descripcion:
    'Cepillos, pastas, enjuagues y productos de higiene oral recomendados por la Clínica Dignidad. Pide online y retira en La Pintana.',
  ruta: '/tienda',
});

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
      <Catalogo key={categoriaInicial ?? 'todo'} productos={productos} categoriaInicial={categoriaInicial} />

      {/* ===== Información de compra ===== */}
      <section className="border-t border-[#E3EBF3] bg-white">
        <div className="mx-auto max-w-[1400px] px-4 pb-28 pt-12 md:px-8 md:pb-16">
          <h2 className="text-[22px] font-black text-[#071B3A]">Cómo comprar</h2>
          <ol className="mt-5 grid gap-5 md:grid-cols-3 md:gap-10">
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
                  <span className="block text-[16px] font-extrabold text-[#0F2950]">{paso.titulo}</span>
                  <span className="mt-0.5 block text-[14.5px] text-slate-600">{paso.detalle}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-8 border-t border-[#E3EBF3] pt-10 md:grid-cols-3 md:gap-10">
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
                <strong className="text-[#0F2950]">Transferencia:</strong> te mostramos los datos al confirmar el
                pedido.
              </span>
              <span className="mt-2 block">
                <strong className="text-[#0F2950]">Pago al retirar:</strong> pagas en recepción cuando vienes a
                buscarlo.
              </span>
            </BloqueInfo>

            <BloqueInfo
              icono={<MessageCircle className="h-5 w-5" aria-hidden="true" />}
              titulo="Dudas, cambios y devoluciones"
            >
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
