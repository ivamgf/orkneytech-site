import { SITE } from '@/content/site';

/**
 * Monta o objeto de metadata de uma página (title, description, canonical, Open Graph).
 * @param {{ title?: string, description?: string, path: string }} page
 * @returns {import('next').Metadata}
 */
export function pageMetadata({ title, description = SITE.description, path }) {
  const fullTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} · ${SITE.tagline}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE.legalName,
      locale: SITE.locale,
      type: 'website',
      images: [{ url: '/brand/orkneytech-logo.png', width: 316, height: 242, alt: 'Logotipo da Orkneytech' }],
    },
    twitter: { card: 'summary', title: fullTitle, description },
  };
}

/** JSON-LD da organização (inserido no layout). */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    logo: `${SITE.url}/brand/orkneytech-logo.png`,
    slogan: SITE.tagline,
  };
}

/**
 * JSON-LD de trilha de navegação.
 * @param {{ name: string, path: string }[]} items
 */
export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
