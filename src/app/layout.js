import { Open_Sans } from 'next/font/google';
import { SITE } from '@/content/site';
import { SkipLink } from '@/components/ui/SkipLink/SkipLink';
import { JsonLd } from '@/components/ui/JsonLd';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { A11yToolbar } from '@/components/layout/A11yToolbar/A11yToolbar';
import { RouteFocus } from '@/components/layout/RouteFocus';
import { A11Y_HEAD_SCRIPT } from '@/lib/a11y/headScript';
import { organizationJsonLd, pageMetadata } from '@/lib/seo/metadata';
import '@/styles/tokens.css';
import '@/styles/globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-open-sans',
});

/** @type {import('next').Metadata} */
export const metadata = {
  metadataBase: new URL(SITE.url),
  ...pageMetadata({ path: '/' }),
  icons: { icon: '/brand/orkneytech-esfera.png' },
};

/** @type {import('next').Viewport} */
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00729c' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1a2e' },
  ],
};

/** @param {{ children: React.ReactNode }} props */
export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: o script abaixo aplica as preferências no <html> antes da hidratação
    <html lang="pt-BR" className={openSans.variable} suppressHydrationWarning>
      <head>
        {/* script fixo gerado no build (A11Y_HEAD_SCRIPT), sem dados de usuário */}
        <script dangerouslySetInnerHTML={{ __html: A11Y_HEAD_SCRIPT }} />
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body>
        <SkipLink />
        <Header />
        <main id="conteudo" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <A11yToolbar />
        <RouteFocus />
      </body>
    </html>
  );
}
