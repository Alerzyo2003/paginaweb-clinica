'use client';

import { useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Banknote, CalendarDays, ChevronDown, CircleAlert, Landmark, LoaderCircle, MessageCircle, RefreshCw } from 'lucide-react';
import { fechaHora, precio, telefono } from '@/lib/tienda/formato';
import { fechaCorta, hoyEnChile } from '@/lib/tienda/retiro';
import { linkMensaje, mensajeSugerido, plantilla, PLANTILLAS, telefonoWhatsApp } from '@/lib/tienda/mensajes';
import type { EstadoPedido, Pedido } from '@/lib/tienda/tipos';
import { botonOscuro, botonSuave, foco, tarjeta } from './ui';

const ESTADOS: { id: EstadoPedido; nombre: string; fondo: string; texto: string }[] = [
  { id: 'pendiente', nombre: 'Pendiente', fondo: '#FDF3DD', texto: '#8F5E05' },
  { id: 'pagado', nombre: 'Pagado', fondo: '#E3F4F8', texto: '#07758C' },
  { id: 'listo', nombre: 'Listo para retirar', fondo: '#EDF4E2', texto: '#4A711D' },
  { id: 'entregado', nombre: 'Entregado', fondo: '#EEF2F6', texto: '#475569' },
  { id: 'cancelado', nombre: 'Cancelado', fondo: '#FBE7ED', texto: '#B01C48' },
];

const FILTROS = [
  { id: 'activos', nombre: 'Por atender', estados: ['pendiente', 'pagado', 'listo'] },
  { id: 'entregados', nombre: 'Entregados', estados: ['entregado'] },
  { id: 'cancelados', nombre: 'Cancelados', estados: ['cancelado'] },
  { id: 'todos', nombre: 'Todos', estados: ESTADOS.map((e) => e.id) },
] as const;

type FiltroId = (typeof FILTROS)[number]['id'];

function traerPedidos(db: SupabaseClient) {
  return db.from('tienda_pedidos').select('*').order('created_at', { ascending: false }).limit(300);
}

export default function Pedidos({
  db,
  onPendientes,
  onStockCambiado,
}: {
  db: SupabaseClient;
  onPendientes: (n: number) => void;
  /** Avisa que el stock pudo cambiar (pedidos nuevos o cancelados). */
  onStockCambiado: () => void;
}) {
  const [pedidos, setPedidos] = useState<Pedido[] | null>(null);
  const [error, setError] = useState('');
  const [filtro, setFiltro] = useState<FiltroId>('activos');
  const [actualizando, setActualizando] = useState(false);

  useEffect(() => {
    let vigente = true;
    traerPedidos(db).then(({ data, error: err }) => {
      if (!vigente) return;
      setError(err ? 'No pudimos cargar los pedidos.' : '');
      setPedidos(err ? [] : (data as Pedido[]));
    });
    return () => {
      vigente = false;
    };
  }, [db]);

  const recargar = async () => {
    setActualizando(true);
    const { data, error: err } = await traerPedidos(db);
    setActualizando(false);
    if (err) {
      setError('No pudimos actualizar los pedidos. Revisa tu conexión.');
      return;
    }
    setError('');
    setPedidos(data as Pedido[]);
    onStockCambiado();
  };

  const pendientes = pedidos?.filter((p) => p.estado === 'pendiente').length ?? 0;
  useEffect(() => {
    onPendientes(pendientes);
  }, [pendientes, onPendientes]);

  const filtrados = useMemo(() => {
    const estados = FILTROS.find((f) => f.id === filtro)!.estados as readonly EstadoPedido[];
    return (pedidos ?? []).filter((p) => estados.includes(p.estado));
  }, [pedidos, filtro]);

  const cambiarEstado = async (pedido: Pedido, estado: EstadoPedido) => {
    const anterior = pedido.estado;
    setPedidos((lista) => lista?.map((p) => (p.id === pedido.id ? { ...p, estado } : p)) ?? null);
    const { error: err } = await db.from('tienda_pedidos').update({ estado }).eq('id', pedido.id);
    if (err) {
      setPedidos((lista) => lista?.map((p) => (p.id === pedido.id ? { ...p, estado: anterior } : p)) ?? null);
      setError(
        err.code === 'P0001'
          ? `Pedido N° ${pedido.numero}: ${err.message}`
          : `No se pudo cambiar el estado del pedido N° ${pedido.numero}.`,
      );
      return;
    }
    setError('');
    if (anterior === 'cancelado' || estado === 'cancelado') onStockCambiado();
  };

  const cambiarFecha = async (pedido: Pedido, fecha: string | null) => {
    const anterior = pedido.fecha_retiro;
    const poner = (f: string | null) =>
      setPedidos((lista) => lista?.map((p) => (p.id === pedido.id ? { ...p, fecha_retiro: f } : p)) ?? null);
    poner(fecha);
    const { error: err } = await db.from('tienda_pedidos').update({ fecha_retiro: fecha }).eq('id', pedido.id);
    if (err) {
      poner(anterior);
      setError(`No se pudo cambiar el día de retiro del pedido N° ${pedido.numero}.`);
      return;
    }
    setError('');
  };

  return (
    <section aria-labelledby="titulo-pedidos">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 id="titulo-pedidos" className="text-[26px] font-black text-[#071B3A]">
            Pedidos
          </h1>
          <p className="mt-0.5 text-[14.5px] text-slate-600">
            {pendientes === 0 ? 'No hay pedidos pendientes.' : `${pendientes} ${pendientes === 1 ? 'pedido pendiente' : 'pedidos pendientes'}.`}
          </p>
        </div>
        <button type="button" onClick={recargar} disabled={actualizando} className={botonSuave}>
          <RefreshCw className={`h-4 w-4 ${actualizando ? 'animate-spin' : ''}`} aria-hidden="true" />
          Actualizar
        </button>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1" role="toolbar" aria-label="Filtrar pedidos">
        {FILTROS.map((f) => {
          const cantidad = (pedidos ?? []).filter((p) => (f.estados as readonly string[]).includes(p.estado)).length;
          const activo = filtro === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={activo}
              onClick={() => setFiltro(f.id)}
              className={`inline-flex h-10 flex-shrink-0 items-center gap-2 rounded-full border px-4 text-[14px] font-bold transition-colors ${foco} ${
                activo ? 'border-[#071B3A] bg-[#071B3A] text-white' : 'border-[#D5E0EB] bg-white text-[#0F2950] hover:border-[#0F2950]'
              }`}
            >
              {f.nombre}
              <span className="text-[12px] font-extrabold tabular-nums opacity-70">{cantidad}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-[13.5px] text-slate-500">
        Cada pedido descuenta su stock al llegar. Si lo cancelas, los productos vuelven al stock.
      </p>

      {error && (
        <p role="alert" className="mt-4 flex items-start gap-2 rounded-2xl bg-[#FBE7ED] px-4 py-3 text-[14.5px] font-semibold text-[#8E1239]">
          <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {pedidos === null ? (
        <div className="flex justify-center py-20 text-slate-400">
          <LoaderCircle className="h-7 w-7 animate-spin" aria-label="Cargando pedidos" />
        </div>
      ) : filtrados.length === 0 ? (
        <div className={`${tarjeta} mt-6 px-6 py-14 text-center`}>
          <p className="text-[18px] font-black text-[#071B3A]">
            {pedidos.length === 0 ? 'Todavía no llegan pedidos' : 'No hay pedidos en esta lista'}
          </p>
          <p className="mx-auto mt-1.5 max-w-[42ch] text-[15px] text-slate-600">
            {pedidos.length === 0
              ? 'Cuando alguien compre en la tienda, su pedido aparecerá aquí con sus datos y productos.'
              : 'Cambia el filtro para ver otros pedidos.'}
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 lg:grid-cols-2">
          {filtrados.map((p) => (
            <TarjetaPedido key={p.id} pedido={p} onEstado={(e) => cambiarEstado(p, e)} onFecha={(f) => cambiarFecha(p, f)} />
          ))}
        </ul>
      )}
    </section>
  );
}

function TarjetaPedido({
  pedido: p,
  onEstado,
  onFecha,
}: {
  pedido: Pedido;
  onEstado: (e: EstadoPedido) => void;
  onFecha: (fecha: string | null) => void;
}) {
  const estado = ESTADOS.find((e) => e.id === p.estado) ?? ESTADOS[0];
  const transferencia = p.metodo_pago === 'transferencia';
  const mensaje = `Hola ${p.cliente_nombre.split(' ')[0]}, te escribimos de Clínica Dignidad por tu pedido N° ${p.numero}.`;
  const sugerido = mensajeSugerido(p);

  return (
    <li className={`${tarjeta} flex flex-col p-5`}>
      <div className="flex flex-wrap items-start gap-3">
        <div className="mr-auto">
          <p className="text-[19px] font-black tabular-nums text-[#071B3A]">N° {p.numero}</p>
          <p className="text-[13px] font-semibold text-slate-500">{fechaHora(p.created_at)}</p>
        </div>
        <label className="relative">
          <span className="sr-only">Estado del pedido N° {p.numero}</span>
          <select
            value={p.estado}
            onChange={(e) => onEstado(e.target.value as EstadoPedido)}
            className={`h-10 cursor-pointer appearance-none rounded-full border-0 py-0 pl-4 pr-9 text-[14px] font-extrabold ${foco}`}
            style={{ backgroundColor: estado.fondo, color: estado.texto }}
          >
            {ESTADOS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3.5 top-1/2 h-3 w-3 -translate-y-1/2"
            viewBox="0 0 12 12"
            fill="none"
            stroke={estado.texto}
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M2.5 4.5 6 8l3.5-3.5" />
          </svg>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14.5px]">
        <span className="font-extrabold text-[#0F2950]">{p.cliente_nombre}</span>
        <a
          href={`https://wa.me/${telefonoWhatsApp(p.cliente_telefono)}?text=${encodeURIComponent(mensaje)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-full font-bold text-[#07758C] hover:underline ${foco}`}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {telefono(p.cliente_telefono)}
        </a>
        {p.cliente_email && <span className="text-slate-500">{p.cliente_email}</span>}
      </div>

      <DiaRetiro pedido={p} onFecha={onFecha} />

      <ul className="mt-4 divide-y divide-[#EEF3F8] rounded-2xl bg-[#F7FAFD] px-4 text-[14.5px]">
        {p.items.map((item) => (
          <li key={item.producto_id} className="flex items-baseline gap-3 py-2.5">
            <span className="w-8 flex-shrink-0 font-extrabold tabular-nums text-[#071B3A]">{item.cantidad}×</span>
            <span className="min-w-0 flex-1 text-[#0F2950]">
              {item.nombre}
              {item.marca && <span className="text-slate-500"> ({item.marca})</span>}
            </span>
            <span className="font-bold tabular-nums text-[#0F2950]">{precio(item.subtotal)}</span>
          </li>
        ))}
      </ul>

      {p.nota && (
        <p className="mt-3 rounded-2xl bg-[#FDF3DD] px-4 py-2.5 text-[14px] text-[#5C3D03]">
          <strong>Comentario:</strong> {p.nota}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <span className="inline-flex items-center gap-2 text-[14px] font-bold text-slate-600">
          {transferencia ? (
            <Landmark className="h-[18px] w-[18px] text-[#07758C]" aria-hidden="true" />
          ) : (
            <Banknote className="h-[18px] w-[18px] text-[#07758C]" aria-hidden="true" />
          )}
          {transferencia ? 'Transferencia' : 'Pago al retirar'}
        </span>
        <span className="text-[20px] font-black tabular-nums text-[#071B3A]">{precio(p.total)}</span>
      </div>

      {/* Mensajes listos para WhatsApp */}
      <div className="mt-4 border-t border-[#EEF3F8] pt-4">
        <a
          href={linkMensaje(p, sugerido)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${botonOscuro} w-full`}
        >
          <MessageCircle className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{plantilla(sugerido).nombre}</span>
        </a>
        <details className="group mt-2">
          <summary
            className={`flex h-10 cursor-pointer list-none items-center justify-center gap-1.5 rounded-full text-[14px] font-bold text-[#07758C] hover:bg-[#F3F7FB] [&::-webkit-details-marker]:hidden ${foco}`}
          >
            Otros mensajes
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <ul className="mt-2 flex flex-wrap gap-2">
            {PLANTILLAS.filter((m) => m.id !== sugerido).map((m) => (
              <li key={m.id}>
                <a
                  href={linkMensaje(p, m.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-10 items-center gap-1.5 rounded-full border border-[#D5E0EB] bg-white px-3.5 text-[13.5px] font-bold text-[#0F2950] transition-colors hover:border-[#0F2950] ${foco}`}
                >
                  <MessageCircle className="h-4 w-4 text-[#07758C]" aria-hidden="true" />
                  {m.nombre}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </li>
  );
}

/** Día en que el cliente dijo que viene. Se puede cambiar si avisa otro día. */
function DiaRetiro({ pedido: p, onFecha }: { pedido: Pedido; onFecha: (fecha: string | null) => void }) {
  const hoy = hoyEnChile();
  const activo = p.estado !== 'entregado' && p.estado !== 'cancelado';
  const f = p.fecha_retiro;
  const tono = !f
    ? 'bg-slate-100 text-slate-600'
    : activo && f === hoy
      ? 'bg-[#FDB92B] text-[#071B3A]'
      : activo && f < hoy
        ? 'bg-[#FBE7ED] text-[#8E1239]'
        : 'bg-[#EDF4E2] text-[#3B5A17]';
  const texto = !f ? 'Sin día' : activo && f < hoy ? `${fechaCorta(f)} (ya pasó)` : fechaCorta(f);

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-[14px]">
      <span className="inline-flex items-center gap-1.5 font-bold text-slate-600">
        <CalendarDays className="h-4 w-4 text-[#07758C]" aria-hidden="true" />
        Retira
      </span>
      <span className={`rounded-full px-3 py-1 text-[13.5px] font-extrabold first-letter:uppercase ${tono}`}>{texto}</span>
      <label className={`relative inline-flex h-8 cursor-pointer items-center rounded-full px-3 text-[13px] font-bold text-[#07758C] hover:bg-[#F3F7FB] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#0A9BB8]`}>
        Cambiar
        <input
          type="date"
          value={f ?? ''}
          onChange={(e) => onFecha(e.target.value || null)}
          onClick={(e) => {
            try {
              e.currentTarget.showPicker?.();
            } catch {
              /* algunos navegadores no lo permiten; el campo igual se puede escribir */
            }
          }}
          aria-label={`Cambiar día de retiro del pedido N° ${p.numero}`}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </label>
    </div>
  );
}
