import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, MessageCircle, Wallet } from 'lucide-react';
import BotonAgregar from '@/components/tienda/BotonAgregar';
import ImagenProducto from '@/components/tienda/ImagenProducto';
import TarjetaProducto from '@/components/tienda/TarjetaProducto';
import { categoria as datosCategoria } from '@/lib/tienda/categorias';
import { linkWhatsApp, TIENDA } from '@/lib/tienda/config';
import { obtenerProducto, obtenerProductos } from '@/lib/tienda/datos';
import { precio } from '@/lib/tienda/formato';
import { metaPagina } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const producto = await obtenerProducto(slug);
  if (!producto) return { title: 'Producto no encontrado', robots: { index: false } };

  // La plantilla del layout raíz agrega " | Clínica Dignidad" al final.
  const titulo = `${producto.nombre}${producto.marca ? ` ${producto.marca}` : ''} · Tienda`;
  const descripcion =
    producto.descripcion?.slice(0, 160) ??
    `${producto.nombre} a ${precio(producto.precio)}. Pide online y retira en la Clínica Dignidad, La Pintana.`;

  const meta = metaPagina({ titulo, descripcion, ruta: `/tienda/${slug}` });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: producto.imagen_url ? [{ url: producto.imagen_url }] : meta.openGraph?.images,
    },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto = await obtenerProducto(slug);
  if (!producto) notFound();

  const cat = datosCategoria(producto.categoria);
  const Icono = cat.icono;
  const enOferta = producto.precio_anterior !== null && producto.precio_anterior > producto.precio;
  const relacionados = (await obtenerProductos())
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-28 pt-6 md:px-8 md:pb-20 md:pt-10">
      <Link
        href="/tienda"
        className="inline-flex items-center gap-2 rounded-full py-2 pr-3 text-[14.5px] font-bold text-[#0F2950] hover:text-[#07758C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A9BB8]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver a la tienda
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative">
          <ImagenProducto
            nombre={producto.nombre}
            imagenUrl={producto.imagen_url}
            categoria={producto.categoria}
            sizes="(min-width: 1024px) 640px, 100vw"
            prioridad
            margen="11%"
            className="aspect-square rounded-[34px]"
          />
          {(enOferta || producto.agotado) && (
            <span
              className={`absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[13.5px] font-extrabold ${
                producto.agotado ? 'bg-white text-slate-600' : 'bg-[#B01C48] text-white'
              }`}
            >
              {producto.agotado ? 'Agotado' : 'Oferta'}
            </span>
          )}
        </div>

        <div className="lg:py-4">
          <Link
            href={`/tienda?categoria=${cat.id}`}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-bold"
            style={{ backgroundColor: cat.fondo, color: cat.color }}
          >
            <Icono className="h-4 w-4" aria-hidden="true" />
            {cat.nombre}
          </Link>

          {producto.marca && (
            <p className="mt-5 text-[16px] font-bold" style={{ color: cat.color }}>
              {producto.marca}
            </p>
          )}
          <h1 className="mt-1 text-[30px] font-black leading-[1.1] tracking-[-0.01em] text-[#071B3A] md:text-[40px]">
            {producto.nombre}
          </h1>

          <p className="mt-5 flex items-baseline gap-3">
            <span className="text-[32px] font-black tabular-nums text-[#071B3A]">{precio(producto.precio)}</span>
            {enOferta && (
              <span className="text-[18px] font-semibold tabular-nums text-slate-500 line-through">
                {precio(producto.precio_anterior!)}
              </span>
            )}
          </p>

          {!producto.agotado && producto.stock > 0 && producto.stock <= 5 && (
            <p className="mt-2 text-[15px] font-bold text-[#8F5E05]">
              {producto.stock === 1 ? 'Queda la última unidad' : `Quedan ${producto.stock} unidades`}
            </p>
          )}

          {producto.descripcion && (
            <p className="mt-5 max-w-[60ch] whitespace-pre-line text-[16px] leading-relaxed text-slate-600">
              {producto.descripcion}
            </p>
          )}

          <div className="mt-8 max-w-[440px]">
            <BotonAgregar producto={producto} tamano="grande" />
          </div>

          <ul className="mt-8 max-w-[520px] divide-y divide-[#E3EBF3] rounded-[24px] bg-white text-[14.5px] text-slate-600 ring-1 ring-[#E3EBF3]">
            <li className="flex items-start gap-3 p-4">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#07758C]" aria-hidden="true" />
              <span>
                <strong className="text-[#0F2950]">Retiro en la clínica, sin costo.</strong> {TIENDA.direccion}.
              </span>
            </li>
            <li className="flex items-start gap-3 p-4">
              <Wallet className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#07758C]" aria-hidden="true" />
              <span>Pagas por transferencia o en la clínica al retirar.</span>
            </li>
            <li className="flex items-start gap-3 p-4">
              <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#07758C]" aria-hidden="true" />
              <span>
                ¿No sabes si es el indicado para ti?{' '}
                <a
                  href={linkWhatsApp(`Hola, tengo una consulta sobre ${producto.nombre}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0F2950] underline decoration-[#C9D7E6] underline-offset-4 hover:decoration-[#0F2950]"
                >
                  Pregúntanos por WhatsApp
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="mt-16 md:mt-20">
          <h2 className="text-[22px] font-black text-[#071B3A] md:text-[26px]">Más en {cat.nombre.toLowerCase()}</h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {relacionados.map((p) => (
              <li key={p.id}>
                <TarjetaProducto producto={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
