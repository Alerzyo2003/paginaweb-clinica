'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapPin, MessageCircle, Search, Wallet, X } from 'lucide-react';
import { dancing } from '@/lib/fuentes';
import { carrito } from '@/lib/tienda/carrito';
import { CATEGORIAS } from '@/lib/tienda/categorias';
import { linkWhatsApp } from '@/lib/tienda/config';
import type { CategoriaId, Producto } from '@/lib/tienda/tipos';
import TarjetaProducto from './TarjetaProducto';

const normalizar = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

const foco = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A9BB8] focus-visible:ring-offset-2';

export default function Catalogo({
  productos,
  categoriaInicial,
}: {
  productos: Producto[];
  categoriaInicial?: CategoriaId;
}) {
  const [filtro, setFiltro] = useState<CategoriaId | 'todo'>(categoriaInicial ?? 'todo');
  const [busqueda, setBusqueda] = useState('');

  // Mantiene el carrito al día con los precios y el stock actuales.
  useEffect(() => {
    carrito.sincronizar(productos);
  }, [productos]);

  const conteo = useMemo(() => {
    const m = new Map<CategoriaId, number>();
    productos.forEach((p) => m.set(p.categoria, (m.get(p.categoria) ?? 0) + 1));
    return m;
  }, [productos]);

  const categoriasConProductos = CATEGORIAS.filter((c) => conteo.has(c.id));

  const visibles = useMemo(() => {
    const q = normalizar(busqueda);
    return (
      productos
        .filter((p) => {
          if (filtro !== 'todo' && p.categoria !== filtro) return false;
          if (!q) return true;
          return normalizar(`${p.nombre} ${p.marca ?? ''} ${p.descripcion ?? ''}`).includes(q);
        })
        // Los agotados quedan al final (sort es estable: mantiene el orden del panel).
        .sort((a, b) => Number(a.agotado) - Number(b.agotado))
    );
  }, [productos, filtro, busqueda]);

  if (productos.length === 0) {
    return (
      <>
        <Encabezado />
        <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-10 md:px-8 md:pt-14">
          <div className="mx-auto max-w-xl rounded-[28px] border border-dashed border-[#C9D7E6] bg-white px-6 py-14 text-center">
            <h2 className="text-[22px] font-black text-[#0F2950]">Estamos llenando la vitrina</h2>
            <p className="mx-auto mt-2 max-w-[42ch] text-[15px] leading-relaxed text-slate-600">
              Muy pronto vas a poder pedir aquí tus cepillos, pastas y enjuagues. Mientras tanto, pregúntanos por
              WhatsApp qué tenemos disponible.
            </p>
            <a
              href={linkWhatsApp('Hola, quiero consultar por los productos que venden en la clínica.')}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex items-center gap-2 rounded-full bg-[#071B3A] px-6 py-3 text-[14.5px] font-extrabold text-white transition-colors hover:bg-[#0B2350] ${foco}`}
            >
              <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Encabezado>
        <label className="relative block w-full md:max-w-[340px]">
          <span className="sr-only">Buscar productos</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Busca por marca o producto"
            className="h-12 w-full rounded-full border-0 bg-white pl-11 pr-11 text-[15px] text-[#0F2950] placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#FDB92B]/60 [&::-webkit-search-cancel-button]:hidden"
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => setBusqueda('')}
              aria-label="Borrar búsqueda"
              className={`absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 ${foco}`}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </label>
      </Encabezado>

      <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 md:px-8 md:pt-11">
        <h2 className="sr-only">Productos</h2>
        <p className="sr-only" aria-live="polite">
          {visibles.length} {visibles.length === 1 ? 'producto' : 'productos'}
        </p>

        {/* ---------- Categorías ---------- */}
        <div
          role="toolbar"
          aria-label="Filtrar por categoría"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:-mx-8 md:px-8 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <BotonFiltro activo={filtro === 'todo'} onClick={() => setFiltro('todo')} color="#071B3A">
            Todo
            <Conteo>{productos.length}</Conteo>
          </BotonFiltro>
          {categoriasConProductos.map((c) => {
            const Icono = c.icono;
            return (
              <BotonFiltro key={c.id} activo={filtro === c.id} onClick={() => setFiltro(c.id)} color={c.color}>
                <Icono className="h-4 w-4" aria-hidden="true" />
                {c.nombre}
                <Conteo>{conteo.get(c.id)}</Conteo>
              </BotonFiltro>
            );
          })}
        </div>

        {/* ---------- Productos ---------- */}
        {visibles.length > 0 ? (
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {visibles.map((p) => (
              <li key={p.id}>
                <TarjetaProducto producto={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-[28px] bg-white px-6 py-12 text-center">
            <p className="text-[17px] font-bold text-[#0F2950]">
              No encontramos {busqueda ? `“${busqueda}”` : 'productos'} en esta categoría.
            </p>
            <p className="mt-1.5 text-[15px] text-slate-600">
              Prueba con otra palabra o{' '}
              <a
                href={linkWhatsApp(`Hola, ¿tienen ${busqueda || 'este producto'} en la clínica?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#07758C] underline underline-offset-2"
              >
                pregúntanos por WhatsApp
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </>
  );
}

/** Encabezado compacto: deja los productos a la vista apenas se entra. */
function Encabezado({ children }: { children?: React.ReactNode }) {
  return (
    <section className="relative bg-[#071B3A] text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 pb-5 pt-6 md:flex-row md:items-end md:justify-between md:gap-10 md:px-8 md:pb-6 md:pt-8">
        <div>
          <p className={`${dancing.className} text-[21px] leading-none text-[#FDB92B] md:text-[24px]`}>
            La vitrina de la clínica
          </p>
          <h1 className="mt-2 text-[26px] font-black leading-[1.1] tracking-[-0.01em] md:text-[36px]">
            Lo que te recomendamos en consulta
          </h1>
          <ul className="mt-3 hidden flex-wrap gap-x-6 gap-y-1.5 text-[14px] font-semibold text-slate-300 sm:flex">
            <li className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#FDB92B]" aria-hidden="true" />
              Retiro en la clínica, sin costo
            </li>
            <li className="inline-flex items-center gap-2">
              <Wallet className="h-4 w-4 text-[#FDB92B]" aria-hidden="true" />
              Transferencia o pago al retirar
            </li>
          </ul>
        </div>
        {children}
      </div>

      {/* Borde inferior con forma de sonrisa */}
      <svg
        className="block h-[18px] w-full translate-y-[17px] md:h-[28px] md:translate-y-[27px]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0H1440V6Q720 158 0 6Z" fill="#071B3A" />
        <path d="M0 6Q720 158 1440 6" fill="none" stroke="#FDB92B" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
    </section>
  );
}

function BotonFiltro({
  activo,
  onClick,
  color,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`inline-flex h-11 flex-shrink-0 items-center gap-2 rounded-full border px-4 text-[14px] font-bold transition-colors ${foco} ${
        activo ? 'border-transparent text-white' : 'border-[#DCE6F0] bg-white hover:border-current'
      }`}
      style={activo ? { backgroundColor: color } : { color }}
    >
      {children}
    </button>
  );
}

function Conteo({ children }: { children: React.ReactNode }) {
  return <span className="text-[12px] font-extrabold tabular-nums opacity-70">{children}</span>;
}
