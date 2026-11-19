/**
 * Empacota o build para instalação no VPS:
 *
 *   dist/
 *     public/   site estático (out/ do Next) + contato.php + .htaccess
 *     app/      backend PHP (fora da raiz pública)
 *     data/     banco SQLite (criado na instalação)
 *     install.sh, nginx/, apache/, LEIA-ME-INSTALACAO.md, VERSION
 *
 * E gera release/orkneytech-site-<versão>.tar.gz com a pasta dist/ pronta para enviar.
 */
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, chmodSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const from = (...parts) => path.join(root, ...parts);
const dist = from('dist');
const to = (...parts) => path.join(dist, ...parts);

if (!existsSync(from('out', 'index.html'))) {
  console.error('Pasta out/ não encontrada. Rode "next build" antes (o script "npm run build" já faz isso).');
  process.exit(1);
}

const { version } = JSON.parse(readFileSync(from('package.json'), 'utf8'));

rmSync(dist, { recursive: true, force: true });
mkdirSync(to('public'), { recursive: true });

// 1. Site estático (sem a vitrine do design system, que é só de desenvolvimento)
cpSync(from('out'), to('public'), { recursive: true });
rmSync(to('public', 'design-system'), { recursive: true, force: true });
rmSync(to('public', 'design-system.html'), { force: true });
rmSync(to('public', 'design-system.txt'), { force: true });

// 2. Endpoint PHP e regras do Apache na raiz pública
cpSync(from('php', 'public', 'contato.php'), to('public', 'contato.php'));
cpSync(from('deploy', 'apache', '.htaccess'), to('public', '.htaccess'));

// 3. Backend PHP fora da raiz pública
for (const item of ['bootstrap.php', 'config.php', 'src', 'migrations', 'bin']) {
  cpSync(from('php', item), to('app', item), { recursive: true });
}
cpSync(from('src', 'content', 'contact-subjects.json'), to('app', 'subjects.json'));

// 4. Pasta do banco
mkdirSync(to('data'), { recursive: true });
writeFileSync(to('data', '.htaccess'), 'Require all denied\n');

// 5. Instalação
cpSync(from('deploy', 'install.sh'), to('install.sh'));
chmodSync(to('install.sh'), 0o755);
cpSync(from('deploy', 'nginx'), to('nginx'), { recursive: true });
cpSync(from('deploy', 'apache', 'orkneytech.conf'), to('apache', 'orkneytech.conf'));
cpSync(from('deploy', 'LEIA-ME-INSTALACAO.md'), to('LEIA-ME-INSTALACAO.md'));
writeFileSync(to('VERSION'), `${version}\n${new Date().toISOString()}\n`);

console.log(`Pacote pronto em dist/ (versão ${version}).`);

// 6. Arquivo compactado (tar existe no Linux, macOS e Windows 10+)
mkdirSync(from('release'), { recursive: true });
const archive = path.join('release', `orkneytech-site-${version}.tar.gz`);
const tar = spawnSync('tar', ['-czf', archive, 'dist'], { cwd: root, stdio: 'inherit' });
if (tar.status === 0) console.log(`Arquivo para enviar ao VPS: ${archive}`);
else
  console.warn(
    'Não foi possível gerar o .tar.gz (comando tar indisponível). Envie a pasta dist/ diretamente.',
  );
