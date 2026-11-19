/**
 * Servidor estático mínimo para visualizar dist/public (sem PHP).
 * Uso: node scripts/serve-static.mjs <pasta> <porta>
 * Para testar o formulário de verdade, use "npm run preview:php" (exige PHP instalado).
 */
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(process.argv[2] ?? 'dist/public');
const port = Number(process.argv[3] ?? 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

/** @param {string} urlPath */
function resolveFile(urlPath) {
  const safe = path.normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, '');
  const candidate = path.join(rootDir, safe);
  if (!candidate.startsWith(rootDir)) return null;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  const index = path.join(candidate, 'index.html');
  return existsSync(index) ? index : null;
}

createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://localhost');
  const file = resolveFile(url.pathname);
  const target = file ?? path.join(rootDir, '404.html');
  response.writeHead(file ? 200 : 404, {
    'Content-Type': TYPES[path.extname(target)] ?? 'application/octet-stream',
  });
  createReadStream(target).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Servindo ${rootDir} em http://127.0.0.1:${port}`);
});
