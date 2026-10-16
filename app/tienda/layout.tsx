import type { ReactNode } from 'react';
import BotonCarrito from '@/components/tienda/BotonCarrito';
import PanelCarrito from '@/components/tienda/PanelCarrito';
import { PanelCarritoProvider } from '@/components/tienda/PanelCarritoContext';
import { nunito } from '@/lib/fuentes';

export default function TiendaLayout({ children }: { children: ReactNode }) {
  return (
    <PanelCarritoProvider>
      <div className={`${nunito.className} bg-[#F3F7FB] text-[#0F2950]`}>
        {children}
        <BotonCarrito />
        <PanelCarrito />
      </div>
    </PanelCarritoProvider>
  );
}
