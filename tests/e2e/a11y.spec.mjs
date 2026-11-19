import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = [
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

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/** O widget do gov.br é externo: fica fora da análise (e não carrega offline). */
const axe = (page) => new AxeBuilder({ page }).withTags(WCAG_TAGS).exclude('[vw]');

test.beforeEach(async ({ page }) => {
  await page.route('https://vlibras.gov.br/**', (route) => route.abort());
});

for (const path of PAGES) {
  test(`${path} sem violações WCAG 2.2 AA`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    const { violations } = await axe(page).analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);
  });
}

test('alto contraste continua sem violações', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Acessibilidade' }).click();
  await page.getByRole('button', { name: 'Alto contraste' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-contrast', 'high');
  const { violations } = await axe(page).analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});

test('reflow em 320px sem rolagem horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of PAGES) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
