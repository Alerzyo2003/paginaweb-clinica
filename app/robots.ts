import type { MetadataRoute } from 'next';
import { CLINICA } from '@/lib/clinica';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin' },
    sitemap: `${CLINICA.url}/sitemap.xml`,
  };
}
