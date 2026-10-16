import {
  Baby,
  Brush,
  Droplets,
  Gift,
  ShieldCheck,
  Smile,
  Sparkles,
  Toothbrush,
  type LucideIcon,
} from 'lucide-react';
import type { CategoriaId } from './tipos';

export type Categoria = {
  id: CategoriaId;
  nombre: string;
  /** Color principal (texto e íconos). Sale de la paleta del logo. */
  color: string;
  /** Fondo suave para la foto del producto. */
  fondo: string;
  icono: LucideIcon;
};

export const CATEGORIAS: Categoria[] = [
  { id: 'cepillos', nombre: 'Cepillos', color: '#07758C', fondo: '#E3F4F8', icono: Toothbrush },
  { id: 'pastas', nombre: 'Pastas', color: '#8F5E05', fondo: '#FDF3DD', icono: Sparkles },
  { id: 'enjuagues', nombre: 'Enjuagues', color: '#4A711D', fondo: '#EDF4E2', icono: Droplets },
  { id: 'interdental', nombre: 'Entre dientes', color: '#B01C48', fondo: '#FBE7ED', icono: Brush },
  { id: 'ortodoncia', nombre: 'Ortodoncia', color: '#2A5DA8', fondo: '#E6EEFA', icono: Smile },
  { id: 'ninos', nombre: 'Niños', color: '#B5345E', fondo: '#FCEAF0', icono: Baby },
  { id: 'protesis', nombre: 'Prótesis', color: '#4E6B86', fondo: '#E9EFF5', icono: ShieldCheck },
  { id: 'kits', nombre: 'Kits', color: '#0B2350', fondo: '#E7ECF4', icono: Gift },
];

const POR_ID = new Map(CATEGORIAS.map((c) => [c.id, c]));

export function categoria(id: CategoriaId): Categoria {
  return POR_ID.get(id) ?? CATEGORIAS[0];
}
