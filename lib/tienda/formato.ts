const clp = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

/** 4500 → "$4.500" */
export function precio(valor: number) {
  return clp.format(valor);
}

/** "Cepillo Curaprox CS 5460 Ultra Soft" → "cepillo-curaprox-cs-5460-ultra-soft" */
export function slugify(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');
}

export function fechaHora(iso: string) {
  return new Date(iso).toLocaleString('es-CL', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** "56912345678" o "912345678" → "+56 9 1234 5678". Otros formatos se devuelven tal cual. */
export function telefono(valor: string) {
  const d = valor.replace(/\D/g, '');
  const local = d.startsWith('56') && d.length === 11 ? d.slice(2) : d;
  if (local.length === 9 && local.startsWith('9')) {
    return `+56 9 ${local.slice(1, 5)} ${local.slice(5)}`;
  }
  return valor;
}
