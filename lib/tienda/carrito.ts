'use client';

import { useSyncExternalStore } from 'react';
import type { CategoriaId, Producto } from './tipos';

/* ------------------------------------------------------------------ */
/*  Carrito guardado en el navegador (localStorage)                    */
/*  Es un "store" externo a React: así no hay problemas de hidratación */
/*  y todas las páginas de la tienda comparten el mismo carrito.       */
/* ------------------------------------------------------------------ */

export type LineaCarrito = {
  id: string;
  slug: string;
  nombre: string;
  marca: string | null;
  precio: number;
  imagen_url: string | null;
  categoria: CategoriaId;
  agotado: boolean;
  stock: number;
  cantidad: number;
};

export const MAX_POR_PRODUCTO = 20;

/** Cuántas unidades de un producto se pueden tener en el carrito. */
export function maximoPermitido(stock: number) {
  return Math.max(0, Math.min(MAX_POR_PRODUCTO, stock));
}
const CLAVE = 'dignidad-carrito-v1';
const VACIO: LineaCarrito[] = [];

let lineas: LineaCarrito[] = VACIO;
let cargado = false;
const oyentes = new Set<() => void>();

function esLinea(x: unknown): x is LineaCarrito {
  if (!x || typeof x !== 'object') return false;
  const l = x as Record<string, unknown>;
  return (
    typeof l.id === 'string' &&
    typeof l.nombre === 'string' &&
    typeof l.precio === 'number' &&
    typeof l.cantidad === 'number' &&
    l.cantidad > 0
  );
}

function leer() {
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    const datos: unknown = crudo ? JSON.parse(crudo) : [];
    lineas = Array.isArray(datos)
      ? datos.filter(esLinea).map((l) => ({
          ...l,
          // Carritos guardados antes de que existiera el stock.
          stock: typeof l.stock === 'number' ? l.stock : MAX_POR_PRODUCTO,
        }))
      : VACIO;
  } catch {
    lineas = VACIO;
  }
}

function cargar() {
  if (cargado || typeof window === 'undefined') return;
  cargado = true;
  leer();
}

function guardar(nuevas: LineaCarrito[]) {
  lineas = nuevas;
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(nuevas));
  } catch {
    /* modo privado o almacenamiento lleno: el carrito sigue en memoria */
  }
  oyentes.forEach((o) => o());
}

function alCambiarOtraPestana(e: StorageEvent) {
  if (e.key !== CLAVE) return;
  leer();
  oyentes.forEach((o) => o());
}

function suscribir(oyente: () => void) {
  if (oyentes.size === 0) window.addEventListener('storage', alCambiarOtraPestana);
  oyentes.add(oyente);
  return () => {
    oyentes.delete(oyente);
    if (oyentes.size === 0) window.removeEventListener('storage', alCambiarOtraPestana);
  };
}

function foto() {
  cargar();
  return lineas;
}

export const carrito = {
  agregar(p: Producto, cantidad = 1) {
    cargar();
    const existe = lineas.find((l) => l.id === p.id);
    if (existe) {
      carrito.cambiar(p.id, existe.cantidad + cantidad);
      return;
    }
    const maximo = maximoPermitido(p.stock);
    if (maximo === 0) return;
    guardar([
      ...lineas,
      {
        id: p.id,
        slug: p.slug,
        nombre: p.nombre,
        marca: p.marca,
        precio: p.precio,
        imagen_url: p.imagen_url,
        categoria: p.categoria,
        agotado: p.agotado,
        stock: p.stock,
        cantidad: Math.min(Math.max(cantidad, 1), maximo),
      },
    ]);
  },

  cambiar(id: string, cantidad: number) {
    cargar();
    if (cantidad <= 0) return carrito.quitar(id);
    guardar(
      lineas.map((l) =>
        l.id === id ? { ...l, cantidad: Math.max(1, Math.min(cantidad, maximoPermitido(l.stock))) } : l,
      ),
    );
  },

  quitar(id: string) {
    cargar();
    guardar(lineas.filter((l) => l.id !== id));
  },

  vaciar() {
    guardar(VACIO);
  },

  /** Actualiza precios, nombres y fotos con el catálogo recién cargado. */
  sincronizar(productos: Producto[]) {
    cargar();
    if (lineas.length === 0) return;
    const porId = new Map(productos.map((p) => [p.id, p]));
    let cambio = false;
    const nuevas: LineaCarrito[] = [];
    for (const l of lineas) {
      const p = porId.get(l.id);
      if (!p) {
        cambio = true;
        continue;
      }
      const actualizada: LineaCarrito = {
        ...l,
        slug: p.slug,
        nombre: p.nombre,
        marca: p.marca,
        precio: p.precio,
        imagen_url: p.imagen_url,
        categoria: p.categoria,
        agotado: p.agotado,
        stock: p.stock,
        // Si quedan menos unidades que las del carrito, se ajusta la cantidad.
        cantidad: p.stock > 0 ? Math.min(l.cantidad, maximoPermitido(p.stock)) : l.cantidad,
      };
      if (
        actualizada.precio !== l.precio ||
        actualizada.nombre !== l.nombre ||
        actualizada.agotado !== l.agotado ||
        actualizada.stock !== l.stock ||
        actualizada.cantidad !== l.cantidad ||
        actualizada.imagen_url !== l.imagen_url ||
        actualizada.slug !== l.slug
      ) {
        cambio = true;
      }
      nuevas.push(actualizada);
    }
    if (cambio) guardar(nuevas);
  },
};

export function useCarrito() {
  const items = useSyncExternalStore(suscribir, foto, () => VACIO);
  const unidades = items.reduce((s, l) => s + l.cantidad, 0);
  const total = items.reduce((s, l) => s + l.precio * l.cantidad, 0);
  const hayAgotados = items.some((l) => l.agotado);
  return { items, unidades, total, hayAgotados };
}

export function useCantidadEnCarrito(id: string) {
  const items = useSyncExternalStore(suscribir, foto, () => VACIO);
  return items.find((l) => l.id === id)?.cantidad ?? 0;
}
