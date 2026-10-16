import { cache } from 'react';
import { supabasePublico } from '@/lib/supabase';
import type { Producto } from './tipos';

/** Productos visibles, destacados primero. Si algo falla, devuelve una lista vacía. */
export async function obtenerProductos(): Promise<Producto[]> {
  const db = supabasePublico();
  if (!db) return [];

  const { data, error } = await db
    .from('tienda_productos')
    .select('*')
    .eq('visible', true)
    .order('destacado', { ascending: false })
    .order('nombre', { ascending: true });

  if (error) {
    console.error('[tienda] No se pudieron cargar los productos:', error.message);
    return [];
  }
  return data as Producto[];
}

/** Un producto visible por su slug. Se cachea por request (metadata + página). */
export const obtenerProducto = cache(async (slug: string): Promise<Producto | null> => {
  const db = supabasePublico();
  if (!db) return null;

  const { data, error } = await db
    .from('tienda_productos')
    .select('*')
    .eq('slug', slug)
    .eq('visible', true)
    .maybeSingle();

  if (error) {
    console.error('[tienda] No se pudo cargar el producto:', error.message);
    return null;
  }
  return data as Producto | null;
});
