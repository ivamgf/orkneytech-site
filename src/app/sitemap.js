import { SITE } from '@/content/site';

export const dynamic = 'force-static';

const PATHS = [
  '/',
  '/sobre/',
  '/servicos/',
  '/portfolio/',
  '/portfolio/konektron/',
  '/pesquisa/',
  '/contato/',
  '/privacidade/',
  '/acessibilidade/',
];

/** @returns {import('next').MetadataRoute.Sitemap} */
export default function sitemap() {
  const lastModified = new Date();
  return PATHS.map((path) => ({ url: `${SITE.url}${path}`, lastModified }));
}
