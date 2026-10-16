'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { CircleAlert, LoaderCircle } from 'lucide-react';
import { supabaseAdmin } from '@/lib/supabase';
import { botonPrimario, etiqueta, input } from './ui';

export default function Login() {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [entrando, setEntrando] = useState(false);

  const entrar = async (e: FormEvent) => {
    e.preventDefault();
    const db = supabaseAdmin();
    if (!db) return;
    setError('');
    setEntrando(true);
    const { error: err } = await db.auth.signInWithPassword({ email: email.trim(), password: clave });
    setEntrando(false);
    if (err) {
      setError(
        err.message.toLowerCase().includes('invalid')
          ? 'El correo o la contraseña no coinciden.'
          : 'No pudimos iniciar sesión. Revisa tu conexión e inténtalo de nuevo.',
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#071B3A] px-4 py-10">
      <div className="mb-8 flex items-center gap-3 text-white">
        <Image src="/logo-icono.png" alt="" width={456} height={350} className="h-12 w-auto" priority />
        <div className="leading-tight">
          <p className="text-[22px] font-black tracking-[0.06em]">DIGNIDAD</p>
          <p className="text-[13px] font-semibold text-slate-300">Panel de la tienda</p>
        </div>
      </div>

      <form
        onSubmit={entrar}
        className="w-full max-w-[400px] rounded-[30px] bg-white p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-8"
      >
        <h1 className="text-[22px] font-black text-[#071B3A]">Inicia sesión</h1>
        <p className="mt-1 text-[14.5px] text-slate-600">Usa el correo y la contraseña de tu usuario en Supabase.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className={etiqueta}>
              Correo
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={input}
            />
          </div>
          <div>
            <label htmlFor="admin-clave" className={etiqueta}>
              Contraseña
            </label>
            <input
              id="admin-clave"
              type="password"
              autoComplete="current-password"
              required
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              className={input}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 flex items-start gap-2 rounded-2xl bg-[#FBE7ED] px-3.5 py-2.5 text-[14px] font-semibold text-[#8E1239]">
            <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}

        <button type="submit" disabled={entrando} className={`${botonPrimario} mt-6 w-full`}>
          {entrando && <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />}
          {entrando ? 'Entrando' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
