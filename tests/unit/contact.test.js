import { describe, expect, it, vi } from 'vitest';
import { CONTACT_SUBJECTS, validateContact } from '@/domain/contact';
import { submitContact } from '@/services/submitContact';

const valid = {
  nome: '  Ada Lovelace ',
  email: 'ADA@Exemplo.com.br',
  empresa: '',
  assunto: CONTACT_SUBJECTS[0],
  mensagem: 'Gostaria de um diagnóstico de arquitetura.',
  lgpd: 'on',
};

describe('validateContact', () => {
  it('aceita e normaliza dados válidos', () => {
    const result = validateContact(valid);
    expect(result.ok).toBe(true);
    expect(result.ok && result.data).toMatchObject({
      nome: 'Ada Lovelace',
      email: 'ada@exemplo.com.br',
      lgpd: true,
    });
  });

  it('aponta todos os campos inválidos', () => {
    const result = validateContact({
      nome: 'A',
      email: 'x',
      empresa: 'a'.repeat(121),
      assunto: 'Inventado',
      mensagem: 'curta',
    });
    expect(result.ok).toBe(false);
    expect(Object.keys(result.ok ? {} : result.errors)).toEqual([
      'nome',
      'email',
      'empresa',
      'assunto',
      'mensagem',
      'lgpd',
    ]);
  });

  it('ignora tipos inesperados', () => {
    expect(validateContact({ ...valid, nome: ['x'] }).ok).toBe(false);
  });
});

describe('submitContact', () => {
  it('não chama a rede quando os dados são inválidos', async () => {
    const transport = vi.fn();
    const result = await submitContact({ nome: '' }, { transport });
    expect(result.status).toBe('invalid');
    expect(transport).not.toHaveBeenCalled();
  });

  it('envia como formulário e pede JSON', async () => {
    const transport = vi.fn().mockResolvedValue(new Response('{"ok":true}', { status: 200 }));
    const result = await submitContact({ ...valid, site: '' }, { transport });
    expect(result.status).toBe('sent');
    const [url, init] = transport.mock.calls[0];
    expect(url).toBe('/contato.php');
    expect(init.headers.Accept).toBe('application/json');
    expect(String(init.body)).toContain('lgpd=on');
  });

  it('repassa os erros do servidor (422)', async () => {
    const transport = vi.fn().mockResolvedValue(new Response('{"errors":{"email":"x"}}', { status: 422 }));
    expect(await submitContact(valid, { transport })).toEqual({ status: 'invalid', errors: { email: 'x' } });
  });

  it('trata limite de envios e falha de rede', async () => {
    const limited = vi.fn().mockResolvedValue(new Response('', { status: 429 }));
    expect((await submitContact(valid, { transport: limited })).status).toBe('error');
    const offline = vi.fn().mockRejectedValue(new TypeError('offline'));
    expect((await submitContact(valid, { transport: offline })).status).toBe('error');
  });
});
