import { Dancing_Script, Nunito } from 'next/font/google';

/* Mismas tipografías que el Navbar: Nunito (redondeada, como el logo) y
   Dancing Script (manuscrita, como el lema). */
export const nunito = Nunito({ subsets: ['latin'], display: 'swap' });
export const dancing = Dancing_Script({ subsets: ['latin'], display: 'swap' });
