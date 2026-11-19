# Design system Orkneytech

Fonte única: [`src/styles/tokens.css`](../src/styles/tokens.css). Vitrine em `/design-system` (só no `npm run dev`).

## Cores da marca (Figma)

| Token                 | Valor                         | Uso                                                                                 |
| --------------------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| `--brand-navy`        | `#074B9C`                     | Cor primária. Branco por cima: **8.42:1**                                           |
| `--brand-sky`         | `#008BBE`                     | Decoração. Com branco dá 3.86:1: **não usar para texto normal**                     |
| `--brand-sky-text`    | `#00729C`                     | Links e faixa do herói: **5.4:1** com branco                                        |
| `--brand-orange`      | `#F18620`                     | Acento/CTA **sempre com texto escuro** `#1A1A1A` (**6.77:1**). Com branco: 2.57:1 ✗ |
| `--brand-orange-text` | `#B35A00`                     | Laranja como texto sobre branco: **4.8:1**                                          |
| `--brand-mist`        | `#DCE1EF`                     | Fundo de seções (texto `#1A1A1A`: 13.3:1; navy: 6.44:1)                             |
| `--konektron-*`       | `#019BCD` `#FE7D05` `#454D50` | Página do Konektron (texto branco sobre grafite: 8.64:1)                            |

## Temas

- **Claro** (padrão), **escuro** (`prefers-color-scheme` ou `data-theme="dark"`) e **alto contraste**
  (`data-contrast="high"`, ativado pelo botão Acessibilidade: preto, branco e amarelo, ≥ 19:1).
- Todos os pares texto/fundo dos três temas passam de 4.5:1; bordas de campos ≥ 3:1.

## Tipografia

- Títulos: Regave DemiBold (pendente de arquivo licenciado; fallback Open Sans 700). Texto: Open Sans.
- Escala modular 1.25 (`--step--1` a `--step-5`), tamanhos em `rem` — acompanham o aumento de fonte do usuário.

## Espaço, forma e movimento

- Espaçamento base 4px (`--space-1` … `--space-24`); raios `sm/md/lg/pill`.
- Alvos de toque ≥ 24px (`--target-min`) e 44px nas ações (`--target-comfort`).
- Foco: anel duplo de 2px (`--focus-ring`), nunca removido sem substituto.
- Movimento: só a flutuação da esfera, desligada com `prefers-reduced-motion`.

## Componentes

`Button`/`ButtonLink` (primary, accent, ghost, onBrand) · `Card` · `Tag` · `Alert` · `TextField`, `TextareaField`,
`SelectField`, `CheckboxField` (rótulo visível, dica e erro ligados por `aria-describedby`) · `CheckList` ·
`Breadcrumb` · `SkipLink` · `PageHero` (faixa com onda) · `A11yToolbar` (disclosure APG) · `VLibras`.
