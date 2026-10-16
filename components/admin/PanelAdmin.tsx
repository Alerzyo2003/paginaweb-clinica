'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Session } from '@supabase/supabase-js';
import { ExternalLink, LoaderCircle, LogOut, Package, ShoppingBag } from 'lucide-react';
import { supabaseAdmin, supabaseConfigurado } from '@/lib/supabase';
import Login from './Login';
import Pedidos from './Pedidos';
import Productos from './Productos';
import { botonSuave, foco } from './ui';

type Pestana = 'productos' | 'pedidos';

export default function PanelAdmin() {
  const db = supabaseAdmin();
  // undefined = todavía revisando si hay sesión
  const [sesion, setSesion] = useState<Session | null | undefined>(db ? undefined : null);
  const [permiso, setPermiso] = useState<{ userId: string; esAdmin: boolean } | null>(null);
  const [pestana, setPestana] = useState<Pestana>('productos');
  const [pendientes, setPendientes] = useState(0);
  // Sube cada vez que un cambio en pedidos puede haber movido el stock.
  const [versionStock, setVersionStock] = useState(0);

  useEffect(() => {
    if (!db) return;
    const { data } = db.auth.onAuthStateChange((_evento, s) => setSesion(s));
    return () => data.subscription.unsubscribe();
  }, [db]);

  const userId = sesion?.user.id;
  useEffect(() => {
    if (!db || !userId) return;
    let vigente = true;
    db.rpc('es_admin_tienda').then(({ data, error }) => {
      if (vigente) setPermiso({ userId, esAdmin: !error && data === true });
    });
    return () => {
      vigente = false;
    };
  }, [db, userId]);

  if (!supabaseConfigurado || !db) return <FaltaConfigurar />;

  if (sesion === undefined || (sesion && permiso?.userId !== sesion.user.id)) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        <LoaderCircle className="h-7 w-7 animate-spin" aria-label="Cargando" />
      </div>
    );
  }

  if (!sesion) return <Login />;

  if (!permiso?.esAdmin) {
    return (
      <Centrado>
        <h1 className="text-[22px] font-black text-[#071B3A]">Tu usuario no tiene acceso a la tienda</h1>
        <p className="mt-2 text-[15px] text-slate-600">
          Entraste como <strong>{sesion.user.email}</strong>. Pide que agreguen este correo a la tabla{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">tienda_admins</code> en Supabase.
        </p>
        <button type="button" onClick={() => db.auth.signOut()} className={`${botonSuave} mt-6`}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Salir
        </button>
      </Centrado>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* ===== Barra superior ===== */}
      <header className="bg-[#071B3A] text-white">
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3 md:px-8">
          <Image src="/logo-icono.png" alt="" width={456} height={350} className="h-9 w-auto" priority />
          <div className="mr-auto leading-tight">
            <p className="text-[16px] font-black tracking-[0.04em]">DIGNIDAD</p>
            <p className="text-[12.5px] font-semibold text-slate-300">Panel de la tienda</p>
          </div>
          <Link
            href="/tienda"
            target="_blank"
            className={`hidden h-10 items-center gap-2 rounded-full px-4 text-[14px] font-bold text-slate-200 hover:bg-white/10 sm:inline-flex ${foco}`}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Ver tienda
          </Link>
          <button
            type="button"
            onClick={() => db.auth.signOut()}
            className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-[14px] font-bold text-slate-200 hover:bg-white/10 ${foco}`}
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Salir
          </button>
        </div>
        <div className="flex h-[3px]" aria-hidden="true">
          {['#6B9A2A', '#0A9BB8', '#FDB92B', '#B01C48'].map((c) => (
            <span key={c} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
      </header>

      {/* ===== Pestañas ===== */}
      <div className="mx-auto max-w-[1200px] px-4 pt-6 md:px-8">
        <div role="tablist" aria-label="Secciones del panel" className="inline-flex rounded-full bg-white p-1 ring-1 ring-[#E1E9F2]">
          <BotonPestana activa={pestana === 'productos'} onClick={() => setPestana('productos')} id="productos">
            <Package className="h-[18px] w-[18px]" aria-hidden="true" />
            Productos
          </BotonPestana>
          <BotonPestana activa={pestana === 'pedidos'} onClick={() => setPestana('pedidos')} id="pedidos">
            <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
            Pedidos
            {pendientes > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#FDB92B] px-1.5 text-[12px] font-black text-[#071B3A]">
                {pendientes}
              </span>
            )}
          </BotonPestana>
        </div>
      </div>

      <main className="mx-auto max-w-[1200px] px-4 pt-6 md:px-8" role="tabpanel" aria-labelledby={`pestana-${pestana}`}>
        {/* Ambas secciones quedan montadas para no perder filtros al cambiar de pestaña. */}
        <div hidden={pestana !== 'productos'}>
          <Productos db={db} version={versionStock} />
        </div>
        <div hidden={pestana !== 'pedidos'}>
          <Pedidos db={db} onPendientes={setPendientes} onStockCambiado={() => setVersionStock((v) => v + 1)} />
        </div>
      </main>
    </div>
  );
}

function BotonPestana({
  activa,
  onClick,
  id,
  children,
}: {
  activa: boolean;
  onClick: () => void;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={`pestana-${id}`}
      aria-selected={activa}
      onClick={onClick}
      className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-[15px] font-extrabold transition-colors ${foco} ${
        activa ? 'bg-[#071B3A] text-white' : 'text-slate-600 hover:text-[#071B3A]'
      }`}
    >
      {children}
    </button>
  );
}

function Centrado({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-[28px] bg-white p-8 text-center shadow-[0_24px_60px_-30px_rgba(7,27,58,0.35)] ring-1 ring-[#E1E9F2]">
        {children}
      </div>
    </div>
  );
}

function FaltaConfigurar() {
  return (
    <Centrado>
      <h1 className="text-[22px] font-black text-[#071B3A]">Falta conectar Supabase</h1>
      <p className="mt-2 text-left text-[15px] leading-relaxed text-slate-600">
        Agrega estas variables en tu archivo <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[13px]">.env.local</code>{' '}
        y en Vercel, y vuelve a cargar la página:
      </p>
      <pre className="mt-4 overflow-x-auto rounded-2xl bg-[#071B3A] p-4 text-left text-[12.5px] leading-relaxed text-slate-100">
        {`NEXT_PUBLIC_SUPABASE_URL=...\nNEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...`}
      </pre>
    </Centrado>
  );
}
