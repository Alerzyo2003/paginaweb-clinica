/* Clases compartidas del panel de admin. */

export const foco =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A9BB8] focus-visible:ring-offset-2';

export const input =
  'h-12 w-full rounded-2xl border border-[#D5E0EB] bg-white px-4 text-[15.5px] text-[#0F2950] placeholder:text-slate-400 transition-[border-color,box-shadow] focus:border-[#0A9BB8] focus:outline-none focus:ring-4 focus:ring-[#0A9BB8]/15 disabled:bg-slate-50 aria-[invalid=true]:border-[#B01C48] aria-[invalid=true]:focus:ring-[#B01C48]/15';

export const etiqueta = 'mb-1.5 block text-[14px] font-bold text-[#0F2950]';

export const botonPrimario = `inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FDB92B] px-6 text-[15px] font-extrabold text-[#071B3A] transition-colors hover:bg-[#FFC94F] disabled:cursor-not-allowed disabled:opacity-60 ${foco}`;

export const botonOscuro = `inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#071B3A] px-6 text-[15px] font-extrabold text-white transition-colors hover:bg-[#0B2350] disabled:cursor-not-allowed disabled:opacity-60 ${foco}`;

export const botonSuave = `inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D5E0EB] bg-white px-5 text-[14.5px] font-bold text-[#0F2950] transition-colors hover:border-[#0F2950] disabled:opacity-60 ${foco}`;

export const tarjeta = 'rounded-[26px] border border-[#E1E9F2] bg-white';
