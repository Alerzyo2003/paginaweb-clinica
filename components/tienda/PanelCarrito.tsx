'use client';

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Banknote,
  CalendarCheck,
  Check,
  CircleAlert,
  Copy,
  Landmark,
  LoaderCircle,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { supabasePublico } from '@/lib/supabase';
import { carrito, maximoPermitido, useCarrito, type LineaCarrito } from '@/lib/tienda/carrito';
import { hayDatosTransferencia, linkWhatsApp, TIENDA } from '@/lib/tienda/config';
import { fechaLarga, horarioDelDia, mesesDe, semanasDeRetiro } from '@/lib/tienda/retiro';
import { precio } from '@/lib/tienda/formato';
import type { MetodoPago } from '@/lib/tienda/tipos';
import ImagenProducto from './ImagenProducto';
import { usePanelCarrito } from './PanelCarritoContext';

type Paso = 'carrito' | 'datos' | 'listo';

type Confirmado = {
  numero: number;
  total: number;
  metodo: MetodoPago;
  nombre: string;
  fechaRetiro: string;
  lineas: LineaCarrito[];
};

const foco =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A9BB8] focus-visible:ring-offset-2';

const botonPrincipal = `flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#FDB92B] text-[16px] font-extrabold text-[#071B3A] shadow-[0_10px_24px_-12px_rgba(253,185,43,0.95)] transition-[background-color,transform] hover:bg-[#FFC94F] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none ${foco}`;

export default function PanelCarrito() {
  const { abierto, cerrar } = usePanelCarrito();
  const { items, total, unidades, hayAgotados } = useCarrito();
  const tituloId = useId();

  const [paso, setPaso] = useState<Paso>('carrito');
  const [confirmado, setConfirmado] = useState<Confirmado | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const focoPrevio = useRef<HTMLElement | null>(null);

  // Si el carrito se vacía (por ejemplo desde otra pestaña), vuelve al primer paso.
  const pasoActual: Paso = paso === 'datos' && items.length === 0 ? 'carrito' : paso;

  const cerrarPanel = () => {
    cerrar();
    if (paso === 'listo') {
      // Espera a que termine la animación de cierre antes de reiniciar.
      window.setTimeout(() => {
        setPaso('carrito');
        setConfirmado(null);
      }, 350);
    }
  };

  // Bloquea el scroll del fondo, mueve el foco al panel y lo devuelve al cerrar.
  useEffect(() => {
    if (!abierto) return;
    focoPrevio.current = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => cerrarRef.current?.focus(), 50);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = overflow;
      focoPrevio.current?.focus?.();
    };
  }, [abierto]);

  const alPresionarTecla = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      cerrarPanel();
      return;
    }
    if (e.key !== 'Tab' || !panelRef.current) return;
    const enfocables = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (enfocables.length === 0) return;
    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    if (e.shiftKey && document.activeElement === primero) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primero.focus();
    }
  };

  const titulo =
    pasoActual === 'carrito' ? 'Tu carrito' : pasoActual === 'datos' ? 'Datos para tu pedido' : 'Pedido recibido';

  return (
    <AnimatePresence>
      {abierto && (
        <div className="fixed inset-0 z-[60]" onKeyDown={alPresionarTecla}>
          <motion.div
            className="absolute inset-0 bg-[#071B3A]/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={cerrarPanel}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={tituloId}
            className="absolute inset-y-0 right-0 flex w-full max-w-[460px] flex-col bg-[#F7FAFD] shadow-[-24px_0_60px_-30px_rgba(7,27,58,0.6)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
          >
            {/* Encabezado */}
            <div className="flex items-center gap-2 border-b border-[#E3EBF3] bg-white px-4 py-3.5 sm:px-5">
              {pasoActual === 'datos' && (
                <button
                  type="button"
                  onClick={() => setPaso('carrito')}
                  aria-label="Volver al carrito"
                  className={`-ml-1 flex h-10 w-10 items-center justify-center rounded-full text-[#071B3A] hover:bg-slate-100 ${foco}`}
                >
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
              <h2 id={tituloId} className="flex-1 text-[19px] font-black text-[#071B3A]">
                {titulo}
                {pasoActual === 'carrito' && unidades > 0 && (
                  <span className="ml-2 text-[15px] font-bold text-slate-500">
                    {unidades} {unidades === 1 ? 'producto' : 'productos'}
                  </span>
                )}
              </h2>
              <button
                ref={cerrarRef}
                type="button"
                onClick={cerrarPanel}
                aria-label="Cerrar carrito"
                className={`flex h-10 w-10 items-center justify-center rounded-full text-[#071B3A] hover:bg-slate-100 ${foco}`}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {pasoActual === 'carrito' && (
              <PasoCarrito
                items={items}
                total={total}
                hayAgotados={hayAgotados}
                onContinuar={() => setPaso('datos')}
                onCerrar={cerrarPanel}
              />
            )}
            {pasoActual === 'datos' && (
              <PasoDatos
                items={items}
                total={total}
                onConfirmado={(c) => {
                  setConfirmado(c);
                  setPaso('listo');
                  carrito.vaciar();
                }}
              />
            )}
            {pasoActual === 'listo' && confirmado && <PasoListo pedido={confirmado} onCerrar={cerrarPanel} />}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================== */
/*  Paso 1: el carrito                                                 */
/* ================================================================== */

function PasoCarrito({
  items,
  total,
  hayAgotados,
  onContinuar,
  onCerrar,
}: {
  items: LineaCarrito[];
  total: number;
  hayAgotados: boolean;
  onContinuar: () => void;
  onCerrar: () => void;
}) {
  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E3F4F8] text-[#07758C]">
          <ShoppingBag className="h-9 w-9" strokeWidth={1.6} aria-hidden="true" />
        </span>
        <p className="mt-5 text-[18px] font-black text-[#071B3A]">Tu carrito está vacío</p>
        <p className="mt-1.5 max-w-[30ch] text-[15px] text-slate-600">
          Agrega los productos que te recomendó tu dentista y pásalos a buscar a la clínica.
        </p>
        <button
          type="button"
          onClick={onCerrar}
          className={`mt-6 rounded-full bg-[#071B3A] px-6 py-3 text-[14.5px] font-extrabold text-white hover:bg-[#0B2350] ${foco}`}
        >
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <>
      <ul className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4 sm:px-5">
        {items.map((l) => (
          <LineaCarritoItem key={l.id} linea={l} onNavegar={onCerrar} />
        ))}
      </ul>

      <div className="border-t border-[#E3EBF3] bg-white px-4 pb-5 pt-4 sm:px-5">
        <dl className="space-y-1.5 text-[15px]">
          <div className="flex justify-between text-slate-600">
            <dt>Retiro en la clínica</dt>
            <dd className="font-bold text-[#4A711D]">Sin costo</dd>
          </div>
          <div className="flex items-baseline justify-between">
            <dt className="font-bold text-[#071B3A]">Total</dt>
            <dd className="text-[24px] font-black tabular-nums text-[#071B3A]">{precio(total)}</dd>
          </div>
        </dl>
        {hayAgotados && (
          <p className="mt-3 flex items-start gap-2 rounded-2xl bg-[#FBE7ED] px-3.5 py-2.5 text-[14px] font-semibold text-[#8E1239]">
            <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Quita los productos agotados para continuar.
          </p>
        )}
        <button type="button" onClick={onContinuar} disabled={hayAgotados} className={`${botonPrincipal} mt-4`}>
          Continuar
        </button>
      </div>
    </>
  );
}

function LineaCarritoItem({ linea, onNavegar }: { linea: LineaCarrito; onNavegar: () => void }) {
  return (
    <li className="flex gap-3 rounded-[22px] border border-[#E3EBF3] bg-white p-2.5">
      <Link
        href={`/tienda/${linea.slug}`}
        onClick={onNavegar}
        className={`flex-shrink-0 rounded-2xl ${foco}`}
        aria-label={`Ver ${linea.nombre}`}
      >
        <ImagenProducto
          nombre={linea.nombre}
          imagenUrl={linea.imagen_url}
          categoria={linea.categoria}
          sizes="80px"
          margen="7%"
          className="h-[76px] w-[76px] rounded-2xl"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-[14.5px] font-bold leading-snug text-[#0F2950]">{linea.nombre}</p>
            {linea.marca && <p className="text-[12.5px] font-semibold text-slate-500">{linea.marca}</p>}
          </div>
          <button
            type="button"
            onClick={() => carrito.quitar(linea.id)}
            aria-label={`Quitar ${linea.nombre}`}
            className={`-mr-1 -mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-[#FBE7ED] hover:text-[#B01C48] ${foco}`}
          >
            <Trash2 className="h-[17px] w-[17px]" aria-hidden="true" />
          </button>
        </div>
        {linea.agotado ? (
          <p className="mt-auto pt-2 text-[13px] font-bold text-[#B01C48]">Agotado</p>
        ) : (
          <div className="mt-auto flex items-center justify-between pt-2">
            <div className="flex items-center rounded-full border border-[#DCE6F0]" role="group" aria-label="Cantidad">
              <button
                type="button"
                onClick={() => carrito.cambiar(linea.id, linea.cantidad - 1)}
                aria-label="Quitar uno"
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[#071B3A] hover:bg-slate-100 ${foco}`}
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
              </button>
              <span className="min-w-6 text-center text-[14px] font-extrabold tabular-nums">{linea.cantidad}</span>
              <button
                type="button"
                onClick={() => carrito.cambiar(linea.id, linea.cantidad + 1)}
                disabled={linea.cantidad >= maximoPermitido(linea.stock)}
                aria-label={linea.cantidad >= maximoPermitido(linea.stock) ? 'No quedan más unidades disponibles' : 'Agregar uno más'}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[#071B3A] hover:bg-slate-100 disabled:opacity-40 ${foco}`}
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
              </button>
            </div>
            <span className="text-[15.5px] font-black tabular-nums text-[#071B3A]">
              {precio(linea.precio * linea.cantidad)}
            </span>
          </div>
        )}
        {!linea.agotado && linea.stock <= linea.cantidad && linea.stock <= 20 && (
          <p className="mt-1.5 text-[12.5px] font-semibold text-[#8F5E05]">
            {linea.stock === 1 ? 'Es la última unidad.' : `Llevas las ${linea.stock} unidades que quedan.`}
          </p>
        )}
      </div>
    </li>
  );
}

/* ================================================================== */
/*  Paso 2: datos y forma de pago                                      */
/* ================================================================== */

type Errores = Partial<Record<'nombre' | 'telefono' | 'email' | 'metodo' | 'retiro', string>>;

function PasoDatos({
  items,
  total,
  onConfirmado,
}: {
  items: LineaCarrito[];
  total: number;
  onConfirmado: (c: Confirmado) => void;
}) {
  const id = useId();
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [metodo, setMetodo] = useState<MetodoPago | null>(null);
  const [nota, setNota] = useState('');
  // La lista de días se calcula una vez al abrir el formulario.
  const [semanas] = useState(() => semanasDeRetiro());
  const primerDia = semanas.flat().find((c) => c.disponible)?.iso;
  const [fechaRetiro, setFechaRetiro] = useState<string | null>(null);
  // Los errores se muestran desde el primer intento y se actualizan mientras escribes.
  const [intentado, setIntentado] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');
  const [enviando, setEnviando] = useState(false);

  const validar = (): Errores => {
    const e: Errores = {};
    if (nombre.trim().length < 2) e.nombre = 'Escribe tu nombre.';
    const digitos = telefono.replace(/\D/g, '');
    if (digitos.length < 8 || digitos.length > 12) e.telefono = 'Escribe un teléfono de 8 a 12 números.';
    if (email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) e.email = 'Revisa tu correo.';
    if (!metodo) e.metodo = 'Elige cómo vas a pagar.';
    if (!fechaRetiro) e.retiro = 'Elige qué día vienes a retirar.';
    return e;
  };
  const errores: Errores = intentado ? validar() : {};

  const enviar = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validar();
    setIntentado(true);
    setErrorGeneral('');
    if (Object.keys(e).length > 0 || !metodo || !fechaRetiro) {
      const primero = document.getElementById(`${id}-${Object.keys(e)[0]}`);
      primero?.focus({ preventScroll: true });
      primero?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    const db = supabasePublico();
    if (!db) {
      setErrorGeneral('La tienda todavía no está conectada. Escríbenos por WhatsApp para hacer tu pedido.');
      return;
    }

    setEnviando(true);
    const { data, error } = await db.rpc('tienda_crear_pedido', {
      p_nombre: nombre.trim(),
      p_telefono: telefono,
      p_email: email.trim() || null,
      p_metodo_pago: metodo,
      p_nota: nota.trim() || null,
      p_fecha_retiro: fechaRetiro,
      p_items: items.map((l) => ({ producto_id: l.id, cantidad: l.cantidad })),
    });
    setEnviando(false);

    if (error) {
      setErrorGeneral(
        error.code === 'P0001'
          ? error.message
          : 'No pudimos guardar tu pedido. Revisa tu conexión e inténtalo de nuevo, o escríbenos por WhatsApp.',
      );
      return;
    }

    const fila = (Array.isArray(data) ? data[0] : data) as { numero_pedido: number; total_pedido: number };
    onConfirmado({
      numero: Number(fila.numero_pedido),
      total: fila.total_pedido,
      metodo,
      nombre: nombre.trim(),
      fechaRetiro,
      lineas: items,
    });
  };

  return (
    <form onSubmit={enviar} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-5">
        <Campo id={`${id}-nombre`} etiqueta="Nombre y apellido" error={errores.nombre}>
          <input
            id={`${id}-nombre`}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="name"
            maxLength={80}
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? `${id}-nombre-error` : undefined}
            className={claseInput(Boolean(errores.nombre))}
          />
        </Campo>

        <Campo
          id={`${id}-telefono`}
          etiqueta="Teléfono (WhatsApp)"
          ayuda="Te escribimos aquí si hay algún cambio con tu pedido."
          error={errores.telefono}
        >
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-bold text-slate-500">
              +56
            </span>
            <input
              id={`${id}-telefono`}
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="9 1234 5678"
              maxLength={16}
              aria-invalid={Boolean(errores.telefono)}
              aria-describedby={`${id}-telefono-ayuda${errores.telefono ? ` ${id}-telefono-error` : ''}`}
              className={`${claseInput(Boolean(errores.telefono))} pl-[3.4rem]`}
            />
          </div>
        </Campo>

        <Campo id={`${id}-email`} etiqueta="Correo" opcional error={errores.email}>
          <input
            id={`${id}-email`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            maxLength={120}
            aria-invalid={Boolean(errores.email)}
            aria-describedby={errores.email ? `${id}-email-error` : undefined}
            className={claseInput(Boolean(errores.email))}
          />
        </Campo>

        <fieldset aria-describedby={errores.metodo ? `${id}-metodo-error` : undefined}>
          <legend className="text-[14.5px] font-bold text-[#0F2950]">¿Cómo vas a pagar?</legend>
          <div className="mt-2 grid gap-2.5">
            <OpcionPago
              id={`${id}-metodo`}
              nombre={`${id}-pago`}
              valor="transferencia"
              seleccionado={metodo === 'transferencia'}
              onElegir={setMetodo}
              icono={<Landmark className="h-5 w-5" aria-hidden="true" />}
              titulo="Transferencia"
              detalle="Te mostramos los datos al confirmar y nos envías el comprobante por WhatsApp."
            />
            <OpcionPago
              nombre={`${id}-pago`}
              valor="pago_al_retirar"
              seleccionado={metodo === 'pago_al_retirar'}
              onElegir={setMetodo}
              icono={<Banknote className="h-5 w-5" aria-hidden="true" />}
              titulo="Pago al retirar"
              detalle={`Pagas en la clínica cuando vengas a buscarlo. Lo guardamos ${TIENDA.diasReserva} días hábiles.`}
            />
          </div>
          {errores.metodo && (
            <p id={`${id}-metodo-error`} className="mt-1.5 text-[13.5px] font-semibold text-[#B01C48]">
              {errores.metodo}
            </p>
          )}
        </fieldset>

        <fieldset
          className="min-w-0"
          aria-describedby={`${id}-retiro-ayuda${errores.retiro ? ` ${id}-retiro-error` : ''}`}
        >
          <legend className="text-[14.5px] font-bold text-[#0F2950]">¿Qué día vienes a retirar?</legend>
          <div
            className={`mt-2 rounded-[20px] bg-white p-3 ring-1 sm:p-4 ${errores.retiro ? 'ring-2 ring-[#F0B8C8]' : 'ring-[#E3EBF3]'}`}
          >
            <div className="flex items-baseline justify-between gap-3 px-0.5">
              <span className="text-[14.5px] font-extrabold capitalize text-[#071B3A]">{mesesDe(semanas)}</span>
              <span className="text-[12.5px] font-semibold text-slate-500">Domingo cerrado</span>
            </div>
            <div className="mt-2.5 grid grid-cols-6 gap-1.5 text-center text-[12px] font-bold text-slate-500" aria-hidden="true">
              {['lun', 'mar', 'mié', 'jue', 'vie', 'sáb'].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            {semanas.map((semana) => (
              <div key={semana[0].iso} className="mt-1.5 grid grid-cols-6 gap-1.5">
                {semana.map((c) => {
                  if (!c.disponible) {
                    return (
                      <span
                        key={c.iso}
                        aria-hidden="true"
                        className="flex h-12 flex-col items-center justify-center rounded-xl text-[15px] font-bold tabular-nums text-slate-300"
                      >
                        {c.numero}
                        {(c.esHoy || c.mes) && (
                          <span className={`text-[10.5px] font-bold leading-none ${c.esHoy ? 'text-slate-500' : ''}`}>
                            {c.esHoy ? 'hoy' : c.mes}
                          </span>
                        )}
                      </span>
                    );
                  }
                  const elegido = fechaRetiro === c.iso;
                  return (
                    <label
                      key={c.iso}
                      className={`relative flex h-12 cursor-pointer flex-col items-center justify-center rounded-xl text-[16px] font-black tabular-nums transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#0A9BB8] has-[:focus-visible]:ring-offset-2 ${
                        elegido
                          ? 'bg-[#0A9BB8] text-white shadow-[0_6px_14px_-6px_rgba(10,155,184,0.9)]'
                          : 'bg-[#F1F6FA] text-[#071B3A] hover:bg-[#DDF1F6]'
                      }`}
                    >
                      <input
                        id={c.iso === primerDia ? `${id}-retiro` : undefined}
                        type="radio"
                        name={`${id}-dia`}
                        value={c.iso}
                        checked={elegido}
                        onChange={() => setFechaRetiro(c.iso)}
                        aria-label={fechaLarga(c.iso)}
                        className="sr-only"
                      />
                      {c.numero}
                      {c.mes && (
                        <span className={`text-[10.5px] font-bold leading-none ${elegido ? 'text-white/85' : 'text-slate-500'}`}>
                          {c.mes}
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
          <p id={`${id}-retiro-ayuda`} className="mt-2 flex items-start gap-2 text-[13.5px] leading-snug text-slate-600">
            <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#07758C]" aria-hidden="true" />
            <span>
              {fechaRetiro ? (
                <>
                  Te esperamos el <strong className="text-[#0F2950]">{fechaLarga(fechaRetiro)}</strong>,{' '}
                  {horarioDelDia(fechaRetiro)}, en {TIENDA.direccion}.
                </>
              ) : (
                <>
                  En {TIENDA.direccion}. Lunes a viernes de {TIENDA.retiro.abre} a {TIENDA.retiro.cierraSemana} y sábado
                  de {TIENDA.retiro.abre} a {TIENDA.retiro.cierraSabado}.
                </>
              )}
            </span>
          </p>
          {errores.retiro && (
            <p id={`${id}-retiro-error`} className="mt-1.5 text-[13.5px] font-semibold text-[#B01C48]">
              {errores.retiro}
            </p>
          )}
        </fieldset>

        <Campo id={`${id}-nota`} etiqueta="Comentario" opcional>
          <textarea
            id={`${id}-nota`}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            rows={2}
            maxLength={500}
            placeholder="Ej: paso después de las 17:00"
            className={`${claseInput(false)} h-auto resize-none py-3`}
          />
        </Campo>
      </div>

      <div className="border-t border-[#E3EBF3] bg-white px-4 pb-5 pt-4 sm:px-5">
        {errorGeneral && (
          <p
            role="alert"
            className="mb-3 flex items-start gap-2 rounded-2xl bg-[#FBE7ED] px-3.5 py-2.5 text-[14px] font-semibold text-[#8E1239]"
          >
            <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            {errorGeneral}
          </p>
        )}
        <div className="flex items-baseline justify-between">
          <span className="font-bold text-[#071B3A]">Total a pagar</span>
          <span className="text-[24px] font-black tabular-nums text-[#071B3A]">{precio(total)}</span>
        </div>
        <button type="submit" disabled={enviando} className={`${botonPrincipal} mt-3`}>
          {enviando ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
              Confirmando pedido
            </>
          ) : (
            'Confirmar pedido'
          )}
        </button>
      </div>
    </form>
  );
}

function claseInput(conError: boolean) {
  return `h-12 w-full rounded-2xl border bg-white px-4 text-[16px] text-[#0F2950] placeholder:text-slate-400 transition-[border-color,box-shadow] focus:outline-none focus:ring-4 ${
    conError
      ? 'border-[#B01C48] focus:ring-[#B01C48]/15'
      : 'border-[#D5E0EB] focus:border-[#0A9BB8] focus:ring-[#0A9BB8]/15'
  }`;
}

function Campo({
  id,
  etiqueta,
  opcional,
  ayuda,
  error,
  children,
}: {
  id: string;
  etiqueta: string;
  opcional?: boolean;
  ayuda?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14.5px] font-bold text-[#0F2950]">
        {etiqueta}
        {opcional && <span className="ml-1.5 font-semibold text-slate-500">(opcional)</span>}
      </label>
      {children}
      {ayuda && (
        <p id={`${id}-ayuda`} className="mt-1.5 text-[13px] text-slate-500">
          {ayuda}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13.5px] font-semibold text-[#B01C48]">
          {error}
        </p>
      )}
    </div>
  );
}

function OpcionPago({
  id,
  nombre,
  valor,
  seleccionado,
  onElegir,
  icono,
  titulo,
  detalle,
}: {
  id?: string;
  nombre: string;
  valor: MetodoPago;
  seleccionado: boolean;
  onElegir: (m: MetodoPago) => void;
  icono: ReactNode;
  titulo: string;
  detalle: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-[20px] border-2 bg-white p-3.5 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#0A9BB8] has-[:focus-visible]:ring-offset-2 ${
        seleccionado ? 'border-[#0A9BB8] bg-[#F1FAFC]' : 'border-[#E3EBF3] hover:border-[#C5D4E3]'
      }`}
    >
      <input
        id={id}
        type="radio"
        name={nombre}
        value={valor}
        checked={seleccionado}
        onChange={() => onElegir(valor)}
        className="sr-only"
      />
      <span
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
          seleccionado ? 'bg-[#0A9BB8] text-white' : 'bg-[#EEF3F8] text-[#071B3A]'
        }`}
      >
        {icono}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-extrabold text-[#071B3A]">{titulo}</span>
        <span className="mt-0.5 block text-[13.5px] leading-snug text-slate-600">{detalle}</span>
      </span>
      <span
        className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
          seleccionado ? 'border-[#0A9BB8] bg-[#0A9BB8]' : 'border-[#C5D4E3]'
        }`}
        aria-hidden="true"
      >
        {seleccionado && <Check className="h-3 w-3 text-white" strokeWidth={4} />}
      </span>
    </label>
  );
}

/* ================================================================== */
/*  Paso 3: pedido confirmado                                          */
/* ================================================================== */

function mensajeWhatsApp(p: Confirmado) {
  const lineas = p.lineas.map((l) => `${l.cantidad} x ${l.nombre} (${precio(l.precio * l.cantidad)})`).join('\n');
  const pago =
    p.metodo === 'transferencia'
      ? hayDatosTransferencia()
        ? 'Pago: transferencia. Les envío el comprobante.'
        : 'Pago: transferencia. ¿Me envían los datos para transferir?'
      : 'Pago: al retirar en la clínica.';
  return `Hola, hice el pedido N° ${p.numero} en la tienda de la web.\n\n${lineas}\n\nTotal: ${precio(p.total)}\n${pago}\nRetiro: ${fechaLarga(p.fechaRetiro)}\nNombre: ${p.nombre}`;
}

function PasoListo({ pedido, onCerrar }: { pedido: Confirmado; onCerrar: () => void }) {
  const transferencia = pedido.metodo === 'transferencia';
  const conDatos = hayDatosTransferencia();
  const t = TIENDA.transferencia;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-5">
        <div className="text-center">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF4E2] text-[#4A711D]"
          >
            <Check className="h-8 w-8" strokeWidth={3} aria-hidden="true" />
          </motion.span>
          <p className="mt-4 text-[22px] font-black text-[#071B3A]">Pedido N° {pedido.numero}</p>
          <p className="mt-1 text-[15px] text-slate-600">
            Gracias, {pedido.nombre.split(' ')[0]}. Ya lo tenemos registrado.
          </p>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-[24px] bg-[#EDF4E2] p-4 sm:p-5">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#4A711D]">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="min-w-0 text-[14px] leading-snug text-[#3B5A17]">
            <span className="block font-bold">Te esperamos el</span>
            <span className="block text-[17px] font-black text-[#22370A]">{fechaLarga(pedido.fechaRetiro)}</span>
            <span className="mt-1 block">
              {horarioDelDia(pedido.fechaRetiro)} en{' '}
              <a href={TIENDA.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2">
                {TIENDA.direccion}
              </a>
            </span>
          </p>
        </div>

        {transferencia ? (
          <section className="mt-6 rounded-[24px] bg-white p-4 ring-1 ring-[#E3EBF3] sm:p-5">
            <h3 className="flex items-center gap-2 text-[16px] font-black text-[#071B3A]">
              <Landmark className="h-5 w-5 text-[#07758C]" aria-hidden="true" />
              Transfiere {precio(pedido.total)}
            </h3>
            {conDatos ? (
              <>
                <p className="mt-3 text-[14px] font-semibold text-slate-600">
                  {t.cuentas.length > 1 ? 'Puedes usar cualquiera de estas cuentas:' : 'Cuenta para transferir:'}
                </p>
                <ul className="mt-2 space-y-2">
                  {t.cuentas.map((c) => (
                    <li key={c.numeroCuenta} className="rounded-2xl bg-[#F7FAFD] px-3.5 pb-1 pt-3 ring-1 ring-[#E3EBF3]">
                      <p className="text-[15px] font-extrabold text-[#071B3A]">
                        {c.banco} <span className="font-semibold text-slate-500">({c.tipoCuenta.toLowerCase()})</span>
                      </p>
                      <dl className="text-[14.5px]">
                        <DatoCopiable
                          etiqueta="N° de cuenta"
                          valor={c.numeroCuenta.replace(/\D/g, '')}
                          mostrar={c.numeroCuenta}
                          etiquetaCopiar={`número de cuenta ${c.banco}`}
                          etiquetaOculta
                        />
                      </dl>
                    </li>
                  ))}
                </ul>
                <dl className="mt-3 divide-y divide-[#EEF3F8] text-[14.5px]">
                  {t.titular && <DatoCopiable etiqueta="Titular" valor={t.titular} />}
                  {t.rut && <DatoCopiable etiqueta="RUT" valor={t.rut.replace(/\./g, '')} mostrar={t.rut} />}
                  {t.email && <DatoCopiable etiqueta="Correo" valor={t.email} />}
                  <DatoCopiable etiqueta="Monto" valor={String(pedido.total)} mostrar={precio(pedido.total)} />
                  <DatoCopiable etiqueta="Comentario" valor={`Pedido ${pedido.numero}`} />
                </dl>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">
                  Escribe <strong>Pedido {pedido.numero}</strong> en el comentario de la transferencia y luego
                  envíanos el comprobante por WhatsApp.
                </p>
              </>
            ) : (
              <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                Escríbenos por WhatsApp y te enviamos los datos para transferir. Menciona tu número de pedido.
              </p>
            )}
          </section>
        ) : (
          <section className="mt-6 rounded-[24px] bg-white p-4 ring-1 ring-[#E3EBF3] sm:p-5">
            <h3 className="flex items-center gap-2 text-[16px] font-black text-[#071B3A]">
              <Banknote className="h-5 w-5 text-[#07758C]" aria-hidden="true" />
              Pagas {precio(pedido.total)} al retirar
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
              Pagas en recepción cuando vengas. Menciona el N° {pedido.numero}. Si no puedes venir ese día,
              avísanos por WhatsApp: guardamos tu pedido {TIENDA.diasReserva} días hábiles.
            </p>
          </section>
        )}
      </div>

      <div className="space-y-2.5 border-t border-[#E3EBF3] bg-white px-4 pb-5 pt-4 sm:px-5">
        <a
          href={linkWhatsApp(mensajeWhatsApp(pedido))}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#071B3A] text-[16px] font-extrabold text-white transition-colors hover:bg-[#0B2350] ${foco}`}
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {transferencia
            ? conDatos
              ? 'Enviar comprobante por WhatsApp'
              : 'Pedir datos por WhatsApp'
            : 'Avisar por WhatsApp'}
        </a>
        <button
          type="button"
          onClick={onCerrar}
          className={`flex h-12 w-full items-center justify-center rounded-full text-[15px] font-bold text-[#071B3A] hover:bg-slate-100 ${foco}`}
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
}

function DatoCopiable({
  etiqueta,
  valor,
  mostrar,
  etiquetaCopiar,
  etiquetaOculta = false,
}: {
  etiqueta: string;
  /** Lo que se copia (por ejemplo, el número sin guiones). */
  valor: string;
  /** Lo que se muestra, si es distinto de lo que se copia. */
  mostrar?: string;
  /** Texto para lectores de pantalla: "Copiar …". */
  etiquetaCopiar?: string;
  /** Oculta la etiqueta a la vista (sigue disponible para lectores de pantalla). */
  etiquetaOculta?: boolean;
}) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* el navegador no permitió copiar; el dato sigue visible */
    }
  };

  return (
    <div className="flex items-center gap-3 py-2">
      <dt className={etiquetaOculta ? 'sr-only' : 'w-[84px] flex-shrink-0 text-slate-500 sm:w-[108px]'}>{etiqueta}</dt>
      <dd
        className={`min-w-0 flex-1 break-words font-bold tabular-nums text-[#0F2950] ${
          etiquetaOculta ? 'text-[17px] tracking-wide' : ''
        }`}
      >
        {mostrar ?? valor}
      </dd>
      <button
        type="button"
        onClick={copiar}
        aria-label={`Copiar ${etiquetaCopiar ?? etiqueta.toLowerCase()}`}
        className={`flex h-9 flex-shrink-0 items-center gap-1 rounded-full px-2.5 text-[12.5px] font-bold transition-colors ${
          copiado ? 'bg-[#EDF4E2] text-[#4A711D]' : 'text-[#07758C] hover:bg-[#E3F4F8]'
        } ${foco}`}
      >
        {copiado ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {/* En celulares solo se ve el ícono, para dejar más espacio al dato. */}
        <span aria-live="polite" className={copiado ? '' : 'hidden sm:inline'}>
          {copiado ? 'Copiado' : 'Copiar'}
        </span>
      </button>
    </div>
  );
}
