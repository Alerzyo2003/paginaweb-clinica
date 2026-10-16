'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { CircleAlert, EyeOff, LoaderCircle, Minus, Pencil, Plus, Search, Star } from 'lucide-react';
import ImagenProducto from '@/components/tienda/ImagenProducto';
import { CATEGORIAS, categoria as datosCategoria } from '@/lib/tienda/categorias';
import { precio } from '@/lib/tienda/formato';
import type { CategoriaId, Producto } from '@/lib/tienda/tipos';
import EditorProducto from './EditorProducto';
import { botonPrimario, foco, input, tarjeta } from './ui';

type Editor = { modo: 'nuevo' } | { modo: 'editar'; producto: Producto } | null;

const ERROR_CARGA = 'No pudimos cargar los productos. ¿Ejecutaste el archivo supabase/tienda.sql en Supabase?';

function traerProductos(db: SupabaseClient) {
  return db.from('tienda_productos').select('*').order('nombre');
}

export default function Productos({ db, version = 0 }: { db: SupabaseClient; version?: number }) {
  const [productos, setProductos] = useState<Producto[] | null>(null);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState<CategoriaId | 'todo'>('todo');
  const [editor, setEditor] = useState<Editor>(null);
  const [guardandoId, setGuardandoId] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    const { data, error: err } = await traerProductos(db);
    setError(err ? ERROR_CARGA : '');
    setProductos(err ? [] : (data as Producto[]));
  }, [db]);

  useEffect(() => {
    let vigente = true;
    traerProductos(db).then(({ data, error: err }) => {
      if (!vigente) return;
      setError(err ? ERROR_CARGA : '');
      setProductos(err ? [] : (data as Producto[]));
    });
    return () => {
      vigente = false;
    };
  }, [db, version]);

  const visibles = useMemo(() => {
    const q = busqueda.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
    return (productos ?? []).filter((p) => {
      if (filtro !== 'todo' && p.categoria !== filtro) return false;
      if (!q) return true;
      return `${p.nombre} ${p.marca ?? ''}`
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .includes(q);
    });
  }, [productos, busqueda, filtro]);

  /** Mostrar u ocultar en la tienda, con actualización optimista. */
  const alternarVisible = async (p: Producto) => {
    const valor = !p.visible;
    setGuardandoId(p.id);
    setProductos((lista) => lista?.map((x) => (x.id === p.id ? { ...x, visible: valor } : x)) ?? null);
    const { error: err } = await db.from('tienda_productos').update({ visible: valor }).eq('id', p.id);
    setGuardandoId(null);
    if (err) {
      setProductos((lista) => lista?.map((x) => (x.id === p.id ? { ...x, visible: !valor } : x)) ?? null);
      setError('No se pudo guardar el cambio. Inténtalo de nuevo.');
    }
  };

  /** Botones + y −: suma o resta en la base de datos sin pisar pedidos simultáneos. */
  const ajustarStock = async (p: Producto, cambio: number) => {
    setGuardandoId(p.id);
    const { data, error: err } = await db.rpc('tienda_ajustar_stock', { p_producto: p.id, p_cambio: cambio });
    setGuardandoId(null);
    if (err) {
      setError('No se pudo cambiar el stock. Inténtalo de nuevo.');
      return;
    }
    const stock = Number(data);
    setProductos((lista) => lista?.map((x) => (x.id === p.id ? { ...x, stock, agotado: stock <= 0 } : x)) ?? null);
  };

  const total = productos?.length ?? 0;
  const ocultos = productos?.filter((p) => !p.visible).length ?? 0;
  const sinStock = productos?.filter((p) => p.stock <= 0).length ?? 0;

  return (
    <section aria-labelledby="titulo-productos">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 id="titulo-productos" className="text-[26px] font-black text-[#071B3A]">
            Productos
          </h1>
          {productos && (
            <p className="mt-0.5 text-[14.5px] text-slate-600">
              {total} en total
              {ocultos > 0 && `, ${ocultos} ${ocultos === 1 ? 'oculto' : 'ocultos'}`}
              {sinStock > 0 && `, ${sinStock} sin stock`}
            </p>
          )}
        </div>
        <button type="button" onClick={() => setEditor({ modo: 'nuevo' })} className={botonPrimario}>
          <Plus className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
          Nuevo producto
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="relative block flex-1">
          <span className="sr-only">Buscar</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o marca"
            className={`${input} pl-11`}
          />
        </label>
        <label className="block sm:w-[220px]">
          <span className="sr-only">Categoría</span>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value as CategoriaId | 'todo')} className={input}>
            <option value="todo">Todas las categorías</option>
            {CATEGORIAS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-4 flex items-start gap-2 rounded-2xl bg-[#FBE7ED] px-4 py-3 text-[14.5px] font-semibold text-[#8E1239]">
          <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {productos === null ? (
        <div className="flex justify-center py-20 text-slate-400">
          <LoaderCircle className="h-7 w-7 animate-spin" aria-label="Cargando productos" />
        </div>
      ) : productos.length === 0 ? (
        <div className={`${tarjeta} mt-6 px-6 py-14 text-center`}>
          <p className="text-[19px] font-black text-[#071B3A]">Tu vitrina está vacía</p>
          <p className="mx-auto mt-1.5 max-w-[40ch] text-[15px] text-slate-600">
            Agrega tu primer producto con su foto y precio. Aparecerá en la tienda apenas lo guardes.
          </p>
          <button type="button" onClick={() => setEditor({ modo: 'nuevo' })} className={`${botonPrimario} mt-6`}>
            <Plus className="h-5 w-5" strokeWidth={3} aria-hidden="true" />
            Agregar el primero
          </button>
        </div>
      ) : visibles.length === 0 ? (
        <p className="py-16 text-center text-[15px] text-slate-600">Ningún producto coincide con la búsqueda.</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {visibles.map((p) => (
            <FilaProducto
              key={p.id}
              producto={p}
              guardando={guardandoId === p.id}
              onEditar={() => setEditor({ modo: 'editar', producto: p })}
              onAlternarVisible={() => alternarVisible(p)}
              onAjustarStock={(cambio) => ajustarStock(p, cambio)}
            />
          ))}
        </ul>
      )}

      {editor && (
        <EditorProducto
          db={db}
          producto={editor.modo === 'editar' ? editor.producto : null}
          onCerrar={() => setEditor(null)}
          onGuardado={() => {
            setEditor(null);
            cargar();
          }}
        />
      )}
    </section>
  );
}

function FilaProducto({
  producto: p,
  guardando,
  onEditar,
  onAlternarVisible,
  onAjustarStock,
}: {
  producto: Producto;
  guardando: boolean;
  onEditar: () => void;
  onAlternarVisible: () => void;
  onAjustarStock: (cambio: number) => void;
}) {
  const cat = datosCategoria(p.categoria);
  return (
    <li className={`${tarjeta} flex min-w-0 flex-wrap items-center gap-x-4 gap-y-3 p-3 sm:flex-nowrap`}>
      <button
        type="button"
        onClick={onEditar}
        className={`flex min-w-0 flex-1 items-center gap-4 rounded-2xl text-left ${foco}`}
        aria-label={`Editar ${p.nombre}`}
      >
        <ImagenProducto
          nombre={p.nombre}
          imagenUrl={p.imagen_url}
          categoria={p.categoria}
          sizes="72px"
          margen="7%"
          className={`h-[68px] w-[68px] flex-shrink-0 rounded-2xl ${p.visible ? '' : 'opacity-50'}`}
        />
        <span className="block min-w-0 flex-1">
          <span className="flex min-w-0 items-center gap-1.5">
            {p.destacado && <Star className="h-4 w-4 flex-shrink-0 fill-[#FDB92B] text-[#FDB92B]" aria-label="Destacado" />}
            <span className="min-w-0 truncate text-[15.5px] font-extrabold text-[#0F2950]">{p.nombre}</span>
          </span>
          <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
            {p.marca && <span className="font-semibold text-slate-500">{p.marca}</span>}
            <span className="rounded-full px-2 py-0.5 text-[12px] font-bold" style={{ backgroundColor: cat.fondo, color: cat.color }}>
              {cat.nombre}
            </span>
            {!p.visible && (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[12px] font-bold text-slate-600">
                <EyeOff className="h-3 w-3" aria-hidden="true" />
                Oculto
              </span>
            )}
          </span>
        </span>
      </button>

      <div className="flex w-full min-w-0 items-center gap-1 sm:w-auto sm:gap-2">
        <span className="mr-auto text-[17px] font-black tabular-nums text-[#071B3A] sm:mr-3 sm:w-[90px] sm:text-right">
          {precio(p.precio)}
        </span>
        <Interruptor activo={p.visible} onClick={onAlternarVisible} disabled={guardando} etiqueta="Visible" />
        <ControlStock stock={p.stock} nombre={p.nombre} disabled={guardando} onAjustar={onAjustarStock} />
        <button
          type="button"
          onClick={onEditar}
          className={`hidden h-10 w-10 items-center justify-center rounded-full text-[#0F2950] hover:bg-slate-100 sm:flex ${foco}`}
          aria-label={`Editar ${p.nombre}`}
        >
          <Pencil className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

function ControlStock({
  stock,
  nombre,
  disabled,
  onAjustar,
}: {
  stock: number;
  nombre: string;
  disabled: boolean;
  onAjustar: (cambio: number) => void;
}) {
  const color = stock <= 0 ? '#B01C48' : stock <= 3 ? '#8F5E05' : '#0F2950';
  const fondo = stock <= 0 ? '#FBE7ED' : stock <= 3 ? '#FDF3DD' : '#F1F5F9';
  return (
    <div
      role="group"
      aria-label={`Stock de ${nombre}`}
      className="inline-flex h-10 flex-shrink-0 items-center rounded-full px-1"
      style={{ backgroundColor: fondo, color }}
    >
      <button
        type="button"
        onClick={() => onAjustar(-1)}
        disabled={disabled || stock <= 0}
        aria-label="Restar una unidad"
        className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/70 disabled:opacity-35 ${foco}`}
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
      </button>
      <span className="min-w-[64px] text-center text-[13px] font-extrabold tabular-nums" aria-live="polite">
        {stock <= 0 ? 'Sin stock' : `${stock} ${stock === 1 ? 'unidad' : 'unid.'}`}
      </span>
      <button
        type="button"
        onClick={() => onAjustar(1)}
        disabled={disabled}
        aria-label="Sumar una unidad"
        className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/70 disabled:opacity-35 ${foco}`}
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
      </button>
    </div>
  );
}

export function Interruptor({
  activo,
  onClick,
  disabled,
  etiqueta,
  colorActivo = '#0A9BB8',
}: {
  activo: boolean;
  onClick: () => void;
  disabled?: boolean;
  etiqueta: string;
  colorActivo?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={activo}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-10 flex-shrink-0 items-center gap-1.5 rounded-full px-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-60 sm:gap-2 sm:px-2.5 ${foco}`}
    >
      <span
        className="relative h-6 w-10 flex-shrink-0 rounded-full transition-colors"
        style={{ backgroundColor: activo ? colorActivo : '#CBD5E1' }}
        aria-hidden="true"
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] ${activo ? 'left-[18px]' : 'left-0.5'}`}
        />
      </span>
      {etiqueta}
    </button>
  );
}
