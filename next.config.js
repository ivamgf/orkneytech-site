/**
 * O site é exportado como HTML estático (pasta out/) e empacotado em dist/
 * por scripts/package-dist.mjs. O formulário de contato é atendido por PHP
 * (php/public/contato.php), então não há servidor Node em produção.
 *
 * Cabeçalhos de segurança (CSP etc.) ficam na configuração do servidor web:
 * veja deploy/apache/.htaccess e deploy/nginx/orkneytech.conf.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
