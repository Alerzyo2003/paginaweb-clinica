import Image from 'next/image';
import { categoria as datosCategoria } from '@/lib/tienda/categorias';
import type { CategoriaId } from '@/lib/tienda/tipos';

type Props = {
  nombre: string;
  imagenUrl: string | null;
  categoria: CategoriaId;
  sizes: string;
  className?: string;
  prioridad?: boolean;
  /** Margen interno de la foto, en % del contenedor. */
  margen?: string;
};

/**
 * Foto del producto sobre un fondo suave del color de su categoría.
 * La foto se mezcla con "multiply", así las fotos con fondo blanco
 * quedan integradas al fondo de color, como en una vitrina.
 */
export default function ImagenProducto({
  nombre,
  imagenUrl,
  categoria,
  sizes,
  className = '',
  prioridad = false,
  margen = '9%',
}: Props) {
  const cat = datosCategoria(categoria);
  const Icono = cat.icono;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: cat.fondo }}>
      {imagenUrl ? (
        <Image
          src={imagenUrl}
          alt={nombre}
          fill
          sizes={sizes}
          priority={prioridad}
          className="object-contain mix-blend-multiply"
          style={{ padding: margen }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <Icono className="h-[34%] w-[34%]" strokeWidth={1.2} style={{ color: cat.color, opacity: 0.35 }} />
        </div>
      )}
    </div>
  );
}
