'use client';

import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { carrito, maximoPermitido, useCantidadEnCarrito } from '@/lib/tienda/carrito';
import type { Producto } from '@/lib/tienda/tipos';
import { usePanelCarrito } from './PanelCarritoContext';

const foco =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A9BB8] focus-visible:ring-offset-2';

type Props = {
  producto: Producto;
  tamano?: 'normal' | 'grande';
};

export default function BotonAgregar({ producto, tamano = 'normal' }: Props) {
  const cantidad = useCantidadEnCarrito(producto.id);
  const { avisarAgregado, abrir } = usePanelCarrito();
  const grande = tamano === 'grande';
  const maximo = maximoPermitido(producto.stock);

  if (producto.agotado || maximo === 0) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-slate-100 font-bold text-slate-500 ${
          grande ? 'h-14 w-full px-6 text-[16px]' : 'h-10 px-4 text-[13px]'
        }`}
      >
        Agotado
      </span>
    );
  }

  if (cantidad === 0) {
    return (
      <button
        type="button"
        onClick={() => {
          carrito.agregar(producto);
          avisarAgregado();
        }}
        aria-label={`Agregar ${producto.nombre} al carrito`}
        className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FDB92B] font-extrabold text-[#071B3A] shadow-[0_6px_16px_-8px_rgba(253,185,43,0.9)] transition-[background-color,transform] hover:bg-[#FFC94F] active:scale-[0.96] ${foco} ${
          grande ? 'h-14 w-full px-6 text-[16px]' : 'h-10 px-4 text-[13.5px]'
        }`}
      >
        {grande ? <ShoppingBag className="h-5 w-5" aria-hidden="true" /> : <Plus className="h-4 w-4" strokeWidth={3} aria-hidden="true" />}
        {grande ? 'Agregar al carrito' : 'Agregar'}
      </button>
    );
  }

  const stepper = (
    <div
      className={`inline-flex items-center justify-between rounded-full bg-[#071B3A] text-white ${
        grande ? 'h-14 w-full max-w-[220px] px-2' : 'h-10 px-1'
      }`}
      role="group"
      aria-label={`Cantidad de ${producto.nombre}`}
    >
      <button
        type="button"
        onClick={() => carrito.cambiar(producto.id, cantidad - 1)}
        aria-label={cantidad === 1 ? `Quitar ${producto.nombre} del carrito` : 'Quitar uno'}
        className={`flex items-center justify-center rounded-full transition-colors hover:bg-white/10 ${foco} ${
          grande ? 'h-10 w-10' : 'h-8 w-8'
        }`}
      >
        <Minus className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
      </button>
      <span className={`min-w-7 text-center font-extrabold tabular-nums ${grande ? 'text-[17px]' : 'text-[14px]'}`} aria-live="polite">
        {cantidad}
      </span>
      <button
        type="button"
        onClick={() => {
          carrito.cambiar(producto.id, cantidad + 1);
          avisarAgregado();
        }}
        disabled={cantidad >= maximo}
        aria-label={cantidad >= maximo ? 'No quedan más unidades disponibles' : 'Agregar uno más'}
        className={`flex items-center justify-center rounded-full transition-colors hover:bg-white/10 disabled:opacity-40 ${foco} ${
          grande ? 'h-10 w-10' : 'h-8 w-8'
        }`}
      >
        <Plus className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
      </button>
    </div>
  );

  if (!grande) return stepper;

  return (
    <div className="flex w-full flex-wrap items-center gap-3">
      {stepper}
      <button
        type="button"
        onClick={abrir}
        className={`inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#071B3A] px-6 text-[15px] font-extrabold text-[#071B3A] transition-colors hover:bg-[#071B3A] hover:text-white ${foco}`}
      >
        Ver carrito
      </button>
    </div>
  );
}
