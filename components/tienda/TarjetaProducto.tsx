import Link from 'next/link';
import { categoria as datosCategoria } from '@/lib/tienda/categorias';
import { precio } from '@/lib/tienda/formato';
import type { Producto } from '@/lib/tienda/tipos';
import BotonAgregar from './BotonAgregar';
import ImagenProducto from './ImagenProducto';

export default function TarjetaProducto({ producto }: { producto: Producto }) {
  const cat = datosCategoria(producto.categoria);
  const enOferta = producto.precio_anterior !== null && producto.precio_anterior > producto.precio;

  return (
    <article className="group relative flex h-full flex-col rounded-[26px] border border-[#DCE6F0] bg-white p-2.5 sm:p-3">
      <Link
        href={`/tienda/${producto.slug}`}
        className="relative block rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A9BB8] focus-visible:ring-offset-2"
        aria-label={producto.nombre}
      >
        <ImagenProducto
          nombre={producto.nombre}
          imagenUrl={producto.imagen_url}
          categoria={producto.categoria}
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 30vw, 46vw"
          className={`aspect-square rounded-[20px] transition-opacity ${producto.agotado ? 'opacity-55' : ''}`}
        />
        {(enOferta || producto.agotado) && (
          <span
            className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[11.5px] font-extrabold ${
              producto.agotado ? 'bg-white text-slate-600' : 'bg-[#B01C48] text-white'
            }`}
          >
            {producto.agotado ? 'Agotado' : 'Oferta'}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3">
        {producto.marca && (
          <p className="text-[12.5px] font-bold" style={{ color: cat.color }}>
            {producto.marca}
          </p>
        )}
        <h3 className="mt-0.5 line-clamp-2 text-[14.5px] font-bold leading-snug text-[#0F2950] sm:text-[15.5px]">
          <Link href={`/tienda/${producto.slug}`} className="hover:underline focus-visible:outline-none" tabIndex={-1}>
            {producto.nombre}
          </Link>
        </h3>
        {!producto.agotado && producto.stock > 0 && producto.stock <= 3 && (
          <p className="mt-1 text-[12.5px] font-bold text-[#8F5E05]">
            {producto.stock === 1 ? 'Última unidad' : `Quedan ${producto.stock}`}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-2 gap-y-2.5 pt-3">
          <p className="leading-none">
            <span className="block text-[18px] font-black tabular-nums text-[#071B3A] sm:text-[19px]">
              {precio(producto.precio)}
            </span>
            {enOferta && (
              <span className="mt-1 block text-[12.5px] font-semibold tabular-nums text-slate-500 line-through">
                {precio(producto.precio_anterior!)}
              </span>
            )}
          </p>
          <BotonAgregar producto={producto} />
        </div>
      </div>
    </article>
  );
}
