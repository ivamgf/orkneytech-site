import SUBJECTS from '@/content/contact-subjects.json';

/**
 * Regras do formulário de contato. As mesmas regras existem em
 * php/src/ContactValidator.php (o servidor sempre revalida).
 */
export const CONTACT_LIMITS = Object.freeze({
  nameMin: 2,
  nameMax: 120,
  emailMax: 254,
  companyMax: 120,
  messageMin: 10,
  messageMax: 5000,
});

export const CONTACT_SUBJECTS = Object.freeze([...SUBJECTS]);

/** Ordem dos campos = ordem do resumo de erros = ordem visual. */
export const CONTACT_FIELDS = Object.freeze(['nome', 'email', 'empresa', 'assunto', 'mensagem', 'lgpd']);

export const CONTACT_MESSAGES = Object.freeze({
  nome: `Informe seu nome (de ${CONTACT_LIMITS.nameMin} a ${CONTACT_LIMITS.nameMax} caracteres).`,
  email: 'Informe um e-mail válido, como nome@empresa.com.br.',
  empresa: `O nome da empresa pode ter até ${CONTACT_LIMITS.companyMax} caracteres.`,
  assunto: 'Selecione um assunto.',
  mensagem: `Escreva sua mensagem (de ${CONTACT_LIMITS.messageMin} a ${CONTACT_LIMITS.messageMax} caracteres).`,
  lgpd: 'Marque a concordância com a Política de Privacidade.',
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** @param {unknown} value */
const text = (value) => (typeof value === 'string' ? value.trim() : '');

/** @param {string} value @param {number} min @param {number} max */
const lengthBetween = (value, min, max) => value.length >= min && value.length <= max;

/**
 * @typedef {{ nome: string, email: string, empresa: string, assunto: string, mensagem: string, lgpd: boolean }} ContactInput
 * @typedef {{ ok: true, data: ContactInput } | { ok: false, errors: Partial<Record<keyof ContactInput, string>> }} ContactValidation
 */

/**
 * Valida e normaliza os dados do formulário.
 * @param {Record<string, unknown>} raw
 * @returns {ContactValidation}
 */
export function validateContact(raw) {
  const data = {
    nome: text(raw.nome),
    email: text(raw.email).toLowerCase(),
    empresa: text(raw.empresa),
    assunto: text(raw.assunto),
    mensagem: text(raw.mensagem),
    lgpd: raw.lgpd === true || raw.lgpd === 'on' || raw.lgpd === '1',
  };

  /** @type {Partial<Record<keyof ContactInput, string>>} */
  const errors = {};
  if (!lengthBetween(data.nome, CONTACT_LIMITS.nameMin, CONTACT_LIMITS.nameMax))
    errors.nome = CONTACT_MESSAGES.nome;
  if (data.email.length > CONTACT_LIMITS.emailMax || !EMAIL_PATTERN.test(data.email)) {
    errors.email = CONTACT_MESSAGES.email;
  }
  if (data.empresa.length > CONTACT_LIMITS.companyMax) errors.empresa = CONTACT_MESSAGES.empresa;
  if (!CONTACT_SUBJECTS.includes(data.assunto)) errors.assunto = CONTACT_MESSAGES.assunto;
  if (!lengthBetween(data.mensagem, CONTACT_LIMITS.messageMin, CONTACT_LIMITS.messageMax)) {
    errors.mensagem = CONTACT_MESSAGES.mensagem;
  }
  if (!data.lgpd) errors.lgpd = CONTACT_MESSAGES.lgpd;

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
