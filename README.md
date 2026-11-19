# orkneytech-site

Site institucional da **Orkneytech Lab** — v1.0.0.
Next.js (App Router, JavaScript) exportado como site estático, com formulário de contato em PHP + SQLite.
Alvo de acessibilidade: **WCAG 2.2 nível AA**.

## Requisitos

| Onde            | O quê                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------- |
| Desenvolvimento | Node.js 20.9+ (recomendado 22 LTS), npm. PHP 8.1+ só para testar o formulário localmente. |
| VPS (produção)  | Nginx ou Apache, PHP 8.1+ com `pdo_sqlite` e `mbstring`. **Não precisa de Node.**         |

## Comandos

```bash
npm install          # instala dependências
npm run dev          # desenvolvimento em http://localhost:3000 (o formulário precisa do PHP: veja abaixo)
npm run build        # gera dist/ (site + PHP + install.sh) e release/orkneytech-site-<versão>.tar.gz
npm run preview      # serve dist/public em http://127.0.0.1:4173 (sem PHP)
npm run preview:php  # serve dist/public com PHP em http://127.0.0.1:8080 (formulário funcionando)
npm run lint         # ESLint (Next + jsx-a11y completo)
npm test             # testes unitários (Vitest)
npm run test:php     # testes do backend PHP
npm run test:e2e     # Playwright + axe sobre o build (rode "npx playwright install" na 1ª vez)
npm run db:migrate   # cria/atualiza o banco local em data/
npm run db:messages  # lista as mensagens do banco local
```

## Instalação no VPS

```bash
npm run build
scp release/orkneytech-site-1.0.0.tar.gz usuario@SEU_VPS:/tmp/
# no VPS:
cd /tmp && tar -xzf orkneytech-site-1.0.0.tar.gz && cd dist
sudo ./install.sh --domain orkneytech-lab.com --server nginx   # ou --server apache
```

Detalhes (HTTPS, backup, variáveis de ambiente, atualização) em [`deploy/LEIA-ME-INSTALACAO.md`](deploy/LEIA-ME-INSTALACAO.md).

## Estrutura

```
src/
  app/                  rotas (só composição): /, sobre, servicos, portfolio, portfolio/konektron,
                        pesquisa, contato, contato/enviado, privacidade, acessibilidade, design-system (dev)
  components/ui/        design system: Button, Card, Tag, Alert, Field, CheckList, Breadcrumb, SkipLink
  components/layout/    Header, Footer, A11yToolbar (+ VLibras), RouteFocus
  components/sections/  PageHero, cartões, ContactForm
  content/              textos do site (serviços, produtos, pesquisa, assuntos do formulário)
  domain/               regras puras: validação do contato, preferências de acessibilidade
  services/             casos de uso: envio do contato (transporte injetável)
  lib/                  SEO/JSON-LD, loja e script inicial das preferências de acessibilidade
  styles/               tokens.css (fonte única do design system) e globals.css
php/                    backend do formulário (validação, SQLite, limite de envios, origem, honeypot)
deploy/                 install.sh, Nginx, Apache (.htaccess com CSP), guia de instalação
docs/                   briefing, design system, decisões de arquitetura
prototype/              protótipo navegável aprovado (referência)
tests/                  unit (Vitest) e e2e (Playwright + axe)
```

## Editar textos

Os textos estão em `src/content/*.js`. Os assuntos do formulário ficam em `src/content/contact-subjects.json`
(o mesmo arquivo é lido pelo PHP). **Os textos atuais são provisórios.**

## Fonte Regave

A identidade usa Regave DemiBold nos títulos. Quando houver o arquivo `.woff2` licenciado para web, coloque em
`src/fonts/` e troque `--font-display` em `src/styles/globals.css` usando `next/font/local`.
Até lá, os títulos usam Open Sans Bold.

## Testar o formulário localmente

```bash
npm run build && npm run preview:php
```

Abra http://127.0.0.1:8080/contato/. As mensagens ficam em `data/contatos.sqlite` (fora do Git).
