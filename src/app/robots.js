import { SITE } from '@/content/site';

export const dynamic = 'force-static';

/** @returns {import('next').MetadataRoute.Robots} */
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/contato/enviado/', '/design-system/'] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
