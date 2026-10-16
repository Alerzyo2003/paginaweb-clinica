/**
 * Achica y comprime una foto en el navegador antes de subirla.
 * Una foto de celular (3–5 MB) queda en ~100–200 KB, así la tienda carga rápido.
 */
export async function comprimirImagen(
  archivo: File,
  ladoMaximo = 1200,
  calidad = 0.86,
): Promise<{ blob: Blob; extension: 'webp' | 'jpg' }> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(archivo);
  } catch {
    throw new Error('No pudimos leer esta imagen. Usa una foto JPG, PNG o WEBP.');
  }

  const escala = Math.min(1, ladoMaximo / Math.max(bitmap.width, bitmap.height));
  const ancho = Math.max(1, Math.round(bitmap.width * escala));
  const alto = Math.max(1, Math.round(bitmap.height * escala));

  const canvas = document.createElement('canvas');
  canvas.width = ancho;
  canvas.height = alto;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Tu navegador no permite procesar imágenes.');

  // Fondo blanco: en la tienda el blanco se funde con el color de la categoría.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, ancho, alto);
  ctx.drawImage(bitmap, 0, 0, ancho, alto);
  bitmap.close();

  const aBlob = (tipo: string) =>
    new Promise<Blob | null>((resolver) => canvas.toBlob(resolver, tipo, calidad));

  const webp = await aBlob('image/webp');
  if (webp && webp.type === 'image/webp') return { blob: webp, extension: 'webp' };

  // Algunos Safari antiguos no generan WEBP: usamos JPG.
  const jpg = await aBlob('image/jpeg');
  if (!jpg) throw new Error('No pudimos procesar la imagen.');
  return { blob: jpg, extension: 'jpg' };
}
