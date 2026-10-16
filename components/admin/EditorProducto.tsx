'use client';

import { useEffect, useId, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { CircleAlert, ImagePlus, LoaderCircle, Trash2, X } from 'lucide-react';
import ImagenProducto from '@/components/tienda/ImagenProducto';
import { CATEGORIAS, categoria as datosCategoria } from '@/lib/tienda/categorias';
import { precio as formatoPrecio, slugify } from '@/lib/tienda/formato';
import { comprimirImagen } from '@/lib/tienda/imagen';
import type { CategoriaId, Producto } from '@/lib/tienda/tipos';
import { Interruptor } from './Productos';
import { botonPrimario, botonSuave, etiqueta, foco, input } from './ui';

const BUCKET = 'tienda';
const MAX_MB = 15;

type Props = {
  db: SupabaseClient;
  producto: Producto | null;
  onCerrar: () => void;
  onGuardado: () => void;
};

/** "4.500" o "$4500" → 4500. Vacío → null. */
function leerPrecio(texto: string): number | null {
  const digitos = texto.replace(/\D/g, '');
  return digitos ? Number(digitos) : null;
}

export default function EditorProducto({ db, producto, onCerrar, onGuardado }: Props) {
  const id = useId();
  const editando = producto !== null;

  const [nombre, setNombre] = useState(producto?.nombre ?? '');
  const [marca, setMarca] = useState(producto?.marca ?? '');
  const [categoria, setCategoria] = useState<CategoriaId | ''>(producto?.categoria ?? '');
  const [precioTexto, setPrecioTexto] = useState(producto ? String(producto.precio) : '');
  const [anteriorTexto, setAnteriorTexto] = useState(producto?.precio_anterior ? String(producto.precio_anterior) : '');
  const [descripcion, setDescripcion] = useState(producto?.descripcion ?? '');
  const [visible, setVisible] = useState(producto?.visible ?? true);
  const [stockTexto, setStockTexto] = useState(producto ? String(producto.stock) : '');
  const [destacado, setDestacado] = useState(producto?.destacado ?? false);

  const [archivo, setArchivo] = useState<File | null>(null);
  const [vistaLocal, setVistaLocal] = useState<string | null>(null);
  const [quitarFoto, setQuitarFoto] = useState(false);
  const [arrastrando, setArrastrando] = useState(false);

  const [guardando, setGuardando] = useState(false);
  const [confirmarBorrar, setConfirmarBorrar] = useState(false);
  const [errorFoto, setErrorFoto] = useState('');
  // Los errores se muestran desde el primer intento de guardar y se actualizan al escribir.
  const [intentado, setIntentado] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');

  const inputArchivo = useRef<HTMLInputElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const urlLocal = useRef<string | null>(null);

  // Bloquea el scroll del fondo y libera la vista previa local al cerrar.
  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cerrarRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      if (urlLocal.current) URL.revokeObjectURL(urlLocal.current);
    };
  }, []);

  const elegirArchivo = (f: File | undefined) => {
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setErrorFoto('Ese archivo no es una imagen.');
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setErrorFoto(`La foto pesa más de ${MAX_MB} MB.`);
      return;
    }
    if (urlLocal.current) URL.revokeObjectURL(urlLocal.current);
    const url = URL.createObjectURL(f);
    urlLocal.current = url;
    setArchivo(f);
    setVistaLocal(url);
    setQuitarFoto(false);
    setErrorFoto('');
  };

  const fotoActual = vistaLocal ?? (quitarFoto ? null : producto?.imagen_url ?? null);
  const precioNumero = leerPrecio(precioTexto);
  const anteriorNumero = leerPrecio(anteriorTexto);
  const stockNumero = leerPrecio(stockTexto);
  const agotado = stockNumero === 0;

  const validar = () => {
    const e: Record<string, string> = {};
    if (nombre.trim().length < 2) e.nombre = 'Escribe el nombre del producto.';
    if (!categoria) e.categoria = 'Elige una categoría.';
    if (precioNumero === null) e.precio = 'Escribe el precio.';
    if (anteriorNumero !== null && precioNumero !== null && anteriorNumero <= precioNumero)
      e.anterior = 'El precio anterior debe ser mayor al precio actual.';
    if (stockNumero === null) e.stock = 'Escribe cuántas unidades tienes (puede ser 0).';
    else if (stockNumero > 100000) e.stock = 'Revisa el stock: es un número muy alto.';
    return e;
  };
  const errores: Record<string, string> = intentado ? validar() : {};

  const guardar = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validar();
    setIntentado(true);
    setErrorGeneral('');
    if (Object.keys(e).length > 0 || !categoria || precioNumero === null || stockNumero === null) {
      document.getElementById(`${id}-${Object.keys(e)[0]}`)?.focus();
      return;
    }

    setGuardando(true);
    let rutaNueva: string | null = null;

    try {
      let imagen_url = quitarFoto ? null : producto?.imagen_url ?? null;
      let imagen_path = quitarFoto ? null : producto?.imagen_path ?? null;

      if (archivo) {
        const { blob, extension } = await comprimirImagen(archivo);
        rutaNueva = `productos/${crypto.randomUUID()}.${extension}`;
        const { error: errSubida } = await db.storage.from(BUCKET).upload(rutaNueva, blob, {
          contentType: blob.type,
          cacheControl: '31536000',
        });
        if (errSubida) {
          rutaNueva = null;
          throw new Error('No se pudo subir la foto. Revisa tu conexión e inténtalo de nuevo.');
        }
        imagen_path = rutaNueva;
        imagen_url = db.storage.from(BUCKET).getPublicUrl(rutaNueva).data.publicUrl;
      }

      const datos = {
        nombre: nombre.trim(),
        marca: marca.trim() || null,
        descripcion: descripcion.trim() || null,
        categoria,
        precio: precioNumero,
        precio_anterior: anteriorNumero,
        visible,
        destacado,
        // El stock solo se envía si cambió, para no pisar pedidos que llegaron mientras editabas.
        ...(!editando || stockNumero !== producto.stock ? { stock: stockNumero } : {}),
        imagen_url,
        imagen_path,
      };

      if (editando) {
        const { error: err } = await db.from('tienda_productos').update(datos).eq('id', producto.id);
        if (err) throw new Error('No se pudieron guardar los cambios.');
      } else {
        await crearConSlugUnico(db, datos);
      }

      // La foto anterior ya no se usa: se borra para no acumular archivos.
      const rutaVieja = producto?.imagen_path;
      if (rutaVieja && rutaVieja !== imagen_path) {
        await db.storage.from(BUCKET).remove([rutaVieja]);
      }

      onGuardado();
    } catch (err) {
      if (rutaNueva) await db.storage.from(BUCKET).remove([rutaNueva]);
      setErrorGeneral(err instanceof Error ? err.message : 'Algo salió mal. Inténtalo de nuevo.');
      setGuardando(false);
    }
  };

  const borrar = async () => {
    if (!producto) return;
    setGuardando(true);
    const { error: err } = await db.from('tienda_productos').delete().eq('id', producto.id);
    if (err) {
      setErrorGeneral('No se pudo eliminar el producto.');
      setGuardando(false);
      return;
    }
    if (producto.imagen_path) await db.storage.from(BUCKET).remove([producto.imagen_path]);
    onGuardado();
  };

  const alSoltar = (e: DragEvent) => {
    e.preventDefault();
    setArrastrando(false);
    elegirArchivo(e.dataTransfer.files?.[0]);
  };

  const cat = categoria ? datosCategoria(categoria) : null;

  return (
    <div
      className="fixed inset-0 z-50"
      onKeyDown={(e) => {
        if (e.key === 'Escape' && !guardando) onCerrar();
      }}
    >
      <div className="absolute inset-0 bg-[#071B3A]/55 backdrop-blur-[2px]" onClick={() => !guardando && onCerrar()} aria-hidden="true" />

      <form
        onSubmit={guardar}
        noValidate
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-titulo`}
        className="absolute inset-y-0 right-0 flex w-full max-w-[920px] flex-col bg-[#F7FAFD] shadow-[-24px_0_60px_-30px_rgba(7,27,58,0.6)]"
      >
        <div className="flex items-center gap-3 border-b border-[#E3EBF3] bg-white px-5 py-4">
          <h2 id={`${id}-titulo`} className="flex-1 text-[20px] font-black text-[#071B3A]">
            {editando ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button
            ref={cerrarRef}
            type="button"
            onClick={onCerrar}
            disabled={guardando}
            aria-label="Cerrar sin guardar"
            className={`flex h-10 w-10 items-center justify-center rounded-full text-[#071B3A] hover:bg-slate-100 ${foco}`}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-8 p-5 md:grid-cols-[minmax(0,1fr)_280px] md:p-7">
            {/* ---------- Formulario ---------- */}
            <div className="space-y-5">
              {/* Foto */}
              <div>
                <p className={etiqueta}>Foto</p>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setArrastrando(true);
                  }}
                  onDragLeave={() => setArrastrando(false)}
                  onDrop={alSoltar}
                  className={`flex items-center gap-4 rounded-[22px] border-2 border-dashed p-3 transition-colors ${
                    arrastrando ? 'border-[#0A9BB8] bg-[#F1FAFC]' : 'border-[#D5E0EB] bg-white'
                  }`}
                >
                  <ImagenProducto
                    nombre={nombre || 'Producto'}
                    imagenUrl={fotoActual}
                    categoria={categoria || 'cepillos'}
                    sizes="96px"
                    margen="6%"
                    className="h-24 w-24 flex-shrink-0 rounded-2xl"
                  />
                  <div className="min-w-0 flex-1">
                    <button type="button" onClick={() => inputArchivo.current?.click()} className={botonSuave}>
                      <ImagePlus className="h-[18px] w-[18px]" aria-hidden="true" />
                      {fotoActual ? 'Cambiar foto' : 'Subir foto'}
                    </button>
                    {fotoActual && (
                      <button
                        type="button"
                        onClick={() => {
                          setArchivo(null);
                          setVistaLocal(null);
                          setQuitarFoto(true);
                        }}
                        className={`ml-1 mt-2 inline-flex h-10 items-center rounded-full px-3 text-[13.5px] font-bold text-slate-500 hover:text-[#B01C48] sm:mt-0 ${foco}`}
                      >
                        Quitar
                      </button>
                    )}
                    <p className="mt-2 text-[13px] leading-snug text-slate-500">
                      Arrastra una foto aquí o elígela. Se ve mejor con fondo blanco; la achicamos automáticamente.
                    </p>
                  </div>
                  <input
                    ref={inputArchivo}
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    tabIndex={-1}
                    aria-label="Elegir foto"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      elegirArchivo(e.target.files?.[0]);
                      e.target.value = '';
                    }}
                  />
                </div>
                {errorFoto && <ErrorCampo>{errorFoto}</ErrorCampo>}
              </div>

              <div>
                <label htmlFor={`${id}-nombre`} className={etiqueta}>
                  Nombre
                </label>
                <input
                  id={`${id}-nombre`}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  maxLength={120}
                  placeholder="Ej: Cepillo CS 5460 Ultra Soft"
                  aria-invalid={Boolean(errores.nombre)}
                  className={input}
                />
                {errores.nombre && <ErrorCampo>{errores.nombre}</ErrorCampo>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-marca`} className={etiqueta}>
                    Marca <span className="font-semibold text-slate-500">(opcional)</span>
                  </label>
                  <input
                    id={`${id}-marca`}
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    maxLength={60}
                    placeholder="Ej: Curaprox"
                    className={input}
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-categoria`} className={etiqueta}>
                    Categoría
                  </label>
                  <select
                    id={`${id}-categoria`}
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as CategoriaId)}
                    aria-invalid={Boolean(errores.categoria)}
                    className={input}
                  >
                    <option value="" disabled>
                      Elige una
                    </option>
                    {CATEGORIAS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                  {errores.categoria && <ErrorCampo>{errores.categoria}</ErrorCampo>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-precio`} className={etiqueta}>
                    Precio
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">$</span>
                    <input
                      id={`${id}-precio`}
                      value={precioTexto}
                      onChange={(e) => setPrecioTexto(e.target.value)}
                      inputMode="numeric"
                      placeholder="4500"
                      aria-invalid={Boolean(errores.precio)}
                      className={`${input} pl-8 tabular-nums`}
                    />
                  </div>
                  {errores.precio && <ErrorCampo>{errores.precio}</ErrorCampo>}
                </div>
                <div>
                  <label htmlFor={`${id}-anterior`} className={etiqueta}>
                    Precio antes de la oferta <span className="font-semibold text-slate-500">(opcional)</span>
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">$</span>
                    <input
                      id={`${id}-anterior`}
                      value={anteriorTexto}
                      onChange={(e) => setAnteriorTexto(e.target.value)}
                      inputMode="numeric"
                      placeholder="Déjalo vacío si no hay oferta"
                      aria-invalid={Boolean(errores.anterior)}
                      className={`${input} pl-8 tabular-nums`}
                    />
                  </div>
                  {errores.anterior && <ErrorCampo>{errores.anterior}</ErrorCampo>}
                </div>
              </div>

              <div className="rounded-[22px] bg-white p-4 ring-1 ring-[#E3EBF3]">
                <label htmlFor={`${id}-stock`} className={etiqueta}>
                  Stock disponible
                </label>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="relative w-[150px]">
                    <input
                      id={`${id}-stock`}
                      value={stockTexto}
                      onChange={(e) => setStockTexto(e.target.value)}
                      inputMode="numeric"
                      placeholder="0"
                      aria-invalid={Boolean(errores.stock)}
                      aria-describedby={`${id}-stock-ayuda`}
                      className={`${input} pr-16 tabular-nums`}
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-slate-500">
                      unid.
                    </span>
                  </div>
                  <p id={`${id}-stock-ayuda`} className="min-w-[200px] flex-1 text-[13px] leading-snug text-slate-500">
                    Se descuenta solo con cada pedido y vuelve si cancelas el pedido. Con 0 unidades aparece como agotado.
                  </p>
                </div>
                {errores.stock && <ErrorCampo>{errores.stock}</ErrorCampo>}
              </div>

              <div>
                <label htmlFor={`${id}-descripcion`} className={etiqueta}>
                  Descripción <span className="font-semibold text-slate-500">(opcional)</span>
                </label>
                <textarea
                  id={`${id}-descripcion`}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  maxLength={1000}
                  rows={4}
                  placeholder="Para quién es, cómo se usa, tamaño o sabor."
                  className={`${input} h-auto resize-y py-3`}
                />
              </div>

              <div className="flex flex-wrap gap-1 rounded-[22px] bg-white p-2 ring-1 ring-[#E3EBF3]">
                <Interruptor activo={visible} onClick={() => setVisible((v) => !v)} etiqueta="Visible en la tienda" />
                <Interruptor activo={destacado} onClick={() => setDestacado((v) => !v)} etiqueta="Destacado (sale primero)" colorActivo="#E0A000" />
              </div>
            </div>

            {/* ---------- Vista previa ---------- */}
            <aside aria-label="Vista previa" className="md:sticky md:top-0 md:self-start">
              <p className={etiqueta}>Así se verá en la tienda</p>
              <div className="rounded-[26px] border border-[#DCE6F0] bg-white p-3">
                <ImagenProducto
                  nombre={nombre || 'Producto'}
                  imagenUrl={fotoActual}
                  categoria={categoria || 'cepillos'}
                  sizes="280px"
                  className={`aspect-square rounded-[20px] ${agotado ? 'opacity-55' : ''}`}
                />
                <div className="px-1.5 pb-1 pt-3">
                  {marca.trim() && (
                    <p className="text-[12.5px] font-bold" style={{ color: cat?.color ?? '#07758C' }}>
                      {marca}
                    </p>
                  )}
                  <p className="mt-0.5 line-clamp-2 text-[15.5px] font-bold leading-snug text-[#0F2950]">
                    {nombre.trim() || 'Nombre del producto'}
                  </p>
                  <div className="mt-3 flex items-end justify-between">
                    <p className="leading-none">
                      <span className="block text-[19px] font-black tabular-nums text-[#071B3A]">
                        {precioNumero !== null ? formatoPrecio(precioNumero) : '$0'}
                      </span>
                      {anteriorNumero !== null && precioNumero !== null && anteriorNumero > precioNumero && (
                        <span className="mt-1 block text-[12.5px] font-semibold tabular-nums text-slate-500 line-through">
                          {formatoPrecio(anteriorNumero)}
                        </span>
                      )}
                    </p>
                    <span className="inline-flex h-10 items-center rounded-full bg-[#FDB92B] px-4 text-[13.5px] font-extrabold text-[#071B3A]">
                      {agotado ? 'Agotado' : 'Agregar'}
                    </span>
                  </div>
                </div>
              </div>
              {!visible && (
                <p className="mt-3 text-[13.5px] font-semibold text-slate-500">
                  Este producto está oculto: no aparece en la tienda.
                </p>
              )}
            </aside>
          </div>
        </div>

        <div className="border-t border-[#E3EBF3] bg-white px-5 py-4">
          {errorGeneral && (
            <p role="alert" className="mb-3 flex items-start gap-2 rounded-2xl bg-[#FBE7ED] px-3.5 py-2.5 text-[14px] font-semibold text-[#8E1239]">
              <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
              {errorGeneral}
            </p>
          )}
          {confirmarBorrar ? (
            <div className="flex flex-wrap items-center gap-3">
              <p className="mr-auto text-[15px] font-bold text-[#8E1239]">¿Eliminar este producto? No se puede deshacer.</p>
              <button type="button" onClick={() => setConfirmarBorrar(false)} disabled={guardando} className={botonSuave}>
                Cancelar
              </button>
              <button
                type="button"
                onClick={borrar}
                disabled={guardando}
                className={`inline-flex h-11 items-center gap-2 rounded-full bg-[#B01C48] px-5 text-[14.5px] font-extrabold text-white hover:bg-[#931539] disabled:opacity-60 ${foco}`}
              >
                {guardando && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
                Sí, eliminar
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              {editando && (
                <button
                  type="button"
                  onClick={() => setConfirmarBorrar(true)}
                  disabled={guardando}
                  className={`mr-auto inline-flex h-11 items-center gap-2 rounded-full px-3 text-[14.5px] font-bold text-[#B01C48] hover:bg-[#FBE7ED] ${foco}`}
                >
                  <Trash2 className="h-[18px] w-[18px]" aria-hidden="true" />
                  Eliminar
                </button>
              )}
              <button type="button" onClick={onCerrar} disabled={guardando} className={`${botonSuave} ${editando ? '' : 'ml-auto'}`}>
                Cancelar
              </button>
              <button type="submit" disabled={guardando} className={botonPrimario}>
                {guardando && <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />}
                {guardando ? 'Guardando' : editando ? 'Guardar cambios' : 'Crear producto'}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

function ErrorCampo({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-[13.5px] font-semibold text-[#B01C48]">{children}</p>;
}

/** Crea el producto; si el slug ya existe, prueba con "-2", "-3"… */
async function crearConSlugUnico(db: SupabaseClient, datos: Record<string, unknown> & { nombre: string }) {
  const base = slugify(datos.nombre) || 'producto';
  for (let intento = 1; intento <= 20; intento++) {
    const slug = intento === 1 ? base : `${base}-${intento}`;
    const { error } = await db.from('tienda_productos').insert({ ...datos, slug });
    if (!error) return;
    if (error.code !== '23505') throw new Error('No se pudo crear el producto.');
  }
  throw new Error('Ya hay muchos productos con ese nombre. Cámbialo un poco.');
}
