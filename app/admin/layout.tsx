import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { nunito } from '@/lib/fuentes';

export const metadata: Metadata = {
  title: 'Panel de la tienda | Clínica Dignidad',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className={`${nunito.className} min-h-screen bg-[#F3F7FB] text-[#0F2950]`}>{children}</div>;
}
