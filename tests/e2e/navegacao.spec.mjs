import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://vlibras.gov.br/**', (route) => route.abort());
});

test('link "Pular para o conteúdo" é o primeiro foco e leva ao main', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Pular para o conteúdo' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#conteudo$/);
});

test('item atual do menu tem aria-current', async ({ page, isMobile }) => {
  await page.goto('/servicos/');
  if (isMobile) await page.getByRole('button', { name: 'Menu' }).click();
  await expect(
    page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Serviços' }),
  ).toHaveAttribute('aria-current', 'page');
});

test('ferramentas de acessibilidade: texto, zoom, contraste e Esc', async ({ page }) => {
  await page.goto('/');
  const opener = page.getByRole('button', { name: 'Acessibilidade' });
  await opener.click();
  await expect(page.getByRole('heading', { name: 'Ferramentas de acessibilidade' })).toBeFocused();

  await page.getByRole('button', { name: 'Aumentar texto' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Tamanho do texto' })).toHaveText(
    'Tamanho do texto: 112.5%',
  );
  const fontSize = await page.evaluate(() => getComputedStyle(document.documentElement).fontSize);
  expect(fontSize).toBe('18px');

  await page.getByRole('button', { name: 'Alto contraste' }).click();
  await expect(page.getByRole('button', { name: 'Alto contraste' })).toHaveAttribute('aria-pressed', 'true');

  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
  await expect(opener).toHaveAttribute('aria-expanded', 'false');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-contrast', 'high');
});

test('formulário vazio mostra resumo de erros com foco', async ({ page }) => {
  await page.goto('/contato/');
  await page.getByRole('button', { name: 'Enviar mensagem' }).click();
  const summary = page.getByRole('heading', { name: /Corrija 5 campos/ });
  await expect(summary).toBeVisible();
  await expect(page.getByLabel('Nome')).toHaveAttribute('aria-invalid', 'true');
  await page.getByRole('link', { name: /Informe seu nome/ }).click();
  await expect(page.getByLabel('Nome')).toBeFocused();
});
