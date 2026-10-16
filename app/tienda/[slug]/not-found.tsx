import Link from 'next/link';

export default function ProductoNoEncontrado() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-[28px] font-black text-[#071B3A]">Este producto ya no está en la vitrina</h1>
      <p className="mt-3 text-[16px] text-slate-600">Puede que se haya agotado o que ya no lo vendamos.</p>
      <Link
        href="/tienda"
        className="mt-8 inline-flex rounded-full bg-[#FDB92B] px-7 py-3.5 text-[15px] font-extrabold text-[#071B3A] hover:bg-[#FFC94F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A9BB8] focus-visible:ring-offset-2"
      >
        Ver todos los productos
      </Link>
    </div>
  );
}
