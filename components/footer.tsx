import Link from "next/link";
import Image from "next/image";

// --- Íconos del Footer ---
const UsersIcon = ({ className = "w-5 h-5" }) => <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>;
const ToothIcon = ({ className = "w-5 h-5" }) => <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ShieldIcon = ({ className = "w-5 h-5" }) => <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;
const HandshakeIcon = ({ className = "w-5 h-5" }) => <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>;
const CalendarIcon = ({ className = "w-5 h-5" }) => <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>;
const MapPinIcon = ({ className = "w-5 h-5" }) => <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
const MailIcon = ({ className = "w-5 h-5" }) => <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
const PhoneIcon = ({ className = "w-5 h-5" }) => <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>;

// SVGs Redes Sociales
const FacebookIcon = ({ className = "w-3.5 h-3.5" }) => <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>;
const InstagramIcon = ({ className = "w-3.5 h-3.5" }) => <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const WhatsAppIcon = ({ className = "w-3.5 h-3.5" }) => <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.372 0 0 5.373 0 12c0 2.122.553 4.116 1.517 5.874L.25 23.4l5.68-1.488C7.625 22.868 9.743 23.4 12 23.4c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.86 17.202c-.244.686-1.436 1.3-1.996 1.365-.515.06-1.196.182-3.834-.908-3.184-1.317-5.234-4.57-5.393-4.781-.157-.21-1.285-1.713-1.285-3.265 0-1.553.812-2.316 1.101-2.63.287-.312.628-.39.835-.39.208 0 .416.002.595.01.19.009.444-.075.696.536.26.63 1.258 3.069 1.371 3.298.113.23.189.497.051.77-.137.272-.208.441-.416.685-.208.245-.436.529-.623.71-.208.21-.429.438-.182.859.248.423 1.099 1.815 2.36 2.936 1.626 1.444 2.977 1.889 3.42 2.102.443.212.702.181.968-.13.266-.312 1.139-1.328 1.443-1.782.304-.455.607-.378 1.015-.224.408.154 2.585 1.218 3.03 1.44.444.223.74.335.848.523.108.188.108 1.085-.136 1.771z"/></svg>;


export default function Footer() {
  return (
    <footer 
      className="relative w-full pt-10 pb-6 bg-[#f8fbff] bg-cover bg-center mt-auto border-t border-blue-100/50"
      style={{ backgroundImage: `url('/fondo-footer.png')` }}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* === MAIN GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.3fr] gap-8 items-start">
          
          {/* Columna 1: Logo y Slogan */}
          <div className="flex flex-col items-center lg:items-start lg:pr-6">
            <Link href="/" className="mb-2 block mix-blend-multiply" style={{ mixBlendMode: 'multiply' }}>
              <Image 
                src="/logo-dignidad.png" 
                alt="Logo Clínica Dignidad" 
                width={240} 
                height={100} 
                style={{ width: "auto", height: "auto" }}
                className="object-contain w-[180px] md:w-[220px] lg:w-[240px]" 
              />
            </Link>
            <div className="font-serif italic text-blue-500 text-[15px] lg:text-[16px] text-center lg:text-left mt-1">
              Que sonreír sea costumbre
            </div>
          </div>

          {/* Columna 2: Clínica Dignidad */}
          <div className="lg:border-l lg:border-blue-200/70 lg:pl-8">
            <h3 className="text-[17px] font-black text-[#0f2950] mb-4">Clínica Dignidad</h3>
            <ul className="space-y-3">
              {[
                { label: "Equipo", href: "/equipo", icon: <UsersIcon className="w-5 h-5 text-blue-500" /> },
                { label: "Conócenos", href: "/nosotros", icon: <ToothIcon className="w-5 h-5 text-blue-500" /> },
                { label: "Especialidades", href: "/especialidades", icon: <ShieldIcon className="w-5 h-5 text-blue-500" /> },
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="flex items-center gap-2.5 group">
                    <div className="flex-shrink-0 transition-transform group-hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="text-[#334155] text-[14px] font-medium group-hover:text-blue-600 transition-colors">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Te Ayudamos */}
          <div className="lg:border-l lg:border-blue-200/70 lg:pl-8">
            <h3 className="text-[17px] font-black text-[#0f2950] mb-4">Te Ayudamos</h3>
            <ul className="space-y-3">
              {[
                { label: "Convenios", href: "/convenios", isExternal: false, icon: <HandshakeIcon className="w-5 h-5 text-blue-500" /> },
                { label: "Agendar Hora", href: "https://confirmar-cita-dignidad.vercel.app/agendar", isExternal: true, icon: <CalendarIcon className="w-5 h-5 text-blue-500" /> },
              ].map((item, i) => (
                <li key={i}>
                  <Link 
                    href={item.href} 
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-2.5 group"
                  >
                    <div className="flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="text-[#334155] text-[14px] font-medium group-hover:text-blue-600 transition-colors whitespace-pre-line leading-tight">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto y Redes */}
          <div className="lg:border-l lg:border-blue-200/70 lg:pl-8">
            <h3 className="text-[17px] font-black text-[#0f2950] mb-4">Información de Contacto</h3>
            <ul className="space-y-3 mb-5">
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-[#334155] text-[14px] font-medium leading-relaxed">
                  Avenida Venancia Leiva 1871,<br/> La Pintana.
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href="mailto:recepcion@clinicadignidad.com" className="text-[#334155] text-[14px] font-medium hover:text-blue-600 transition-colors">
                  recepcion@clinicadignidad.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <PhoneIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-[#334155] text-[14px] font-medium">
                  <a href="tel:+56994464662" className="hover:text-blue-600">+56 9 9446 4662</a> 
                  <span className="text-blue-300 mx-2">|</span> 
                  <a href="tel:+56966467641" className="hover:text-blue-600">+56 9 6646 7641</a>
                </span>
              </li>
            </ul>

            {/* Redes Sociales Pill */}
            <div className="flex items-center gap-3 bg-[#f0f4f8] rounded-full px-4 py-2 w-fit shadow-sm border border-slate-200/50">
              <span className="text-[#0f2950] font-bold text-[13px]">Redes Sociales</span>
              <div className="w-px h-5 bg-slate-300"></div>
              <div className="flex items-center gap-2">
                <a href="https://www.instagram.com/clinicadignidad/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-7 h-7 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center hover:bg-blue-800 transition-colors"><InstagramIcon /></a>
                <a href="https://api.whatsapp.com/send/?phone=56966467641&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-7 h-7 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center hover:bg-blue-800 transition-colors"><WhatsAppIcon /></a>
                <a href="https://www.facebook.com/clinicadignidad" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-7 h-7 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center hover:bg-blue-800 transition-colors"><FacebookIcon /></a>
              </div>
            </div>
          </div>
          
        </div>

        {/* === BOTTOM BAR === */}
        <div className="mt-10 pt-5 border-t border-blue-200/60 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-[#475569] text-[12px] font-medium text-center lg:text-left">
            © 2026 <strong className="text-[#0f2950]">Clínica Dignidad</strong>. Todos los derechos reservados.
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-3 text-[12px] font-medium text-[#475569]">
            <Link href="/terminos-y-condiciones" className="hover:text-blue-600">Términos y Condiciones</Link>
            <span className="text-blue-200">|</span>
            <Link href="/politica-de-privacidad" className="hover:text-blue-600">Política de Privacidad</Link>
            <span className="text-blue-200">|</span>
            <Link href="/canal-de-denuncias" className="hover:text-blue-600">Canal de Denuncias</Link>
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <span className="font-serif italic text-blue-600 text-[18px] leading-none">Cuidamos tu sonrisa</span>
            <svg className="w-8 h-2.5 text-blue-500 mt-1" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"><path d="M10 25 Q50 50 90 25" /></svg>
          </div>
        </div>

      </div>
    </footer>
  );
}
