import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** false si faltan las variables de entorno de Supabase. */
export const supabaseConfigurado = Boolean(url && key);

let publico: SupabaseClient | null = null;
let admin: SupabaseClient | null = null;

/**
 * Cliente sin sesión: lee productos y crea pedidos.
 * Sirve tanto en el servidor como en el navegador.
 */
export function supabasePublico(): SupabaseClient | null {
  if (!url || !key) return null;
  publico ??= createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return publico;
}

/** Cliente con sesión para el panel de admin (solo navegador). */
export function supabaseAdmin(): SupabaseClient | null {
  if (!url || !key) return null;
  admin ??= createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: 'dignidad-admin' },
  });
  return admin;
}
