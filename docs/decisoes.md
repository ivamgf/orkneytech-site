# Decisões de arquitetura (ADRs curtos)

## ADR-001 — Export estático do Next.js + PHP no VPS

**Contexto:** o cliente quer gerar o build localmente e instalar um pacote pronto no VPS; o formulário pode ser PHP.
**Decisão:** `output: 'export'`; o build gera `dist/` com o HTML estático, o `contato.php` e o backend PHP fora
da raiz pública, além do `install.sh`.
**Consequências:** o VPS não precisa de Node; sem Server Actions/rotas dinâmicas do Next. CSP exige
`'unsafe-inline'` em scripts (hidratação do Next sem nonce).

## ADR-002 — SQLite pelo PHP (PDO)

**Decisão:** mensagens e limite de envios em `data/contatos.sqlite`, com migrations versionadas
(`php/migrations`) e tabela `schema_migrations`. Prepared statements sempre.
**Consequências:** backup é copiar o arquivo com `.backup`; sem servidor de banco para manter.

## ADR-003 — Uma regra de validação, dois lugares

**Decisão:** `src/domain/contact.js` (cliente) e `php/src/Contact/ContactValidator.php` (servidor) aplicam as
mesmas regras; a lista de assuntos é um único JSON lido pelos dois. O servidor sempre revalida.

## ADR-004 — Proteção do formulário sem sessão

**Decisão:** verificação de Origin/Referer (CSRF), honeypot, limite de 5 envios/hora por hash do IP (com sal),
tamanho máximo de corpo no Nginx. IP nunca é guardado em texto (LGPD).

## ADR-005 — Ferramentas de acessibilidade no cliente

**Decisão:** preferências (texto, zoom, contraste, VLibras) em `localStorage`, aplicadas por um script inline no
`<head>` antes da pintura e mantidas por um `useSyncExternalStore`. O VLibras só é baixado quando ligado.
**Observação:** o aumento de fonte do painel complementa — não substitui — o zoom do navegador.
