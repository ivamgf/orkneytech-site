import { validateContact } from '@/domain/contact';

export const CONTACT_ENDPOINT = '/contato.php';

/**
 * @typedef {(url: string, init: RequestInit) => Promise<Response>} Transport
 * @typedef {{ status: 'sent' } | { status: 'invalid', errors: Record<string, string> } | { status: 'error', message: string }} SubmitResult
 */

const GENERIC_ERROR =
  'Não foi possível enviar agora. Tente novamente em alguns minutos ou escreva para o nosso e-mail.';
const RATE_LIMIT_ERROR = 'Recebemos muitas mensagens deste endereço. Aguarde um pouco e tente de novo.';

/**
 * Valida no cliente e envia ao endpoint PHP. O transporte é injetado (testável).
 * @param {Record<string, unknown>} raw
 * @param {{ transport?: Transport, endpoint?: string }} [deps]
 * @returns {Promise<SubmitResult>}
 */
export async function submitContact(raw, { transport = fetch, endpoint = CONTACT_ENDPOINT } = {}) {
  const validation = validateContact(raw);
  if (!validation.ok) return { status: 'invalid', errors: validation.errors };

  const body = new URLSearchParams({
    ...Object.fromEntries(
      Object.entries(validation.data).map(([k, v]) => [k, String(v === true ? 'on' : v)]),
    ),
    site: typeof raw.site === 'string' ? raw.site : '',
  });

  try {
    const response = await transport(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (response.ok) return { status: 'sent' };
    if (response.status === 422) {
      const payload = await response.json().catch(() => ({}));
      return { status: 'invalid', errors: payload.errors ?? {} };
    }
    if (response.status === 429) return { status: 'error', message: RATE_LIMIT_ERROR };
    return { status: 'error', message: GENERIC_ERROR };
  } catch {
    return { status: 'error', message: GENERIC_ERROR };
  }
}
