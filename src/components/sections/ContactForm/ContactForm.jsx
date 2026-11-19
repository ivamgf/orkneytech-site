'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CONTACT_FIELDS, CONTACT_LIMITS, CONTACT_SUBJECTS } from '@/domain/contact';
import { CONTACT_ENDPOINT, submitContact } from '@/services/submitContact';
import { Alert } from '@/components/ui/Alert/Alert';
import { Button } from '@/components/ui/Button/Button';
import { CheckboxField, SelectField, TextField, TextareaField } from '@/components/ui/Field/Field';
import styles from './ContactForm.module.css';

const FIELD_ID = /** @type {const} */ ({
  nome: 'contato-nome',
  email: 'contato-email',
  empresa: 'contato-empresa',
  assunto: 'contato-assunto',
  mensagem: 'contato-mensagem',
  lgpd: 'contato-lgpd',
});

/**
 * Formulário de contato. Sem JavaScript, envia direto para o PHP (POST normal);
 * com JavaScript, valida no cliente, envia via fetch e mostra o resultado na página.
 */
export function ContactForm() {
  const [errors, setErrors] = useState(/** @type {Record<string, string>} */ ({}));
  const [state, setState] = useState(/** @type {'idle'|'sending'|'sent'|'error'} */ ('idle'));
  const [failure, setFailure] = useState('');
  const summaryRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const formRef = useRef(/** @type {HTMLFormElement | null} */ (null));
  const errorList = CONTACT_FIELDS.filter((field) => errors[field]);

  useEffect(() => {
    if (errorList.length) summaryRef.current?.focus();
  }, [errors]); // eslint-disable-line react-hooks/exhaustive-deps -- foca só quando um novo conjunto de erros chega

  /** @param {React.FormEvent<HTMLFormElement>} event */
  async function handleSubmit(event) {
    event.preventDefault();
    setState('sending');
    const raw = Object.fromEntries(new FormData(event.currentTarget));
    const result = await submitContact(raw);

    if (result.status === 'sent') {
      setErrors({});
      setState('sent');
      formRef.current?.reset();
      return;
    }
    if (result.status === 'invalid') {
      setErrors(result.errors);
      setState('idle');
      return;
    }
    setErrors({});
    setFailure(result.message);
    setState('error');
  }

  return (
    <>
      <div role="status" aria-live="polite">
        {state === 'sent' ? (
          <Alert tone="success">
            <p>Mensagem enviada. Obrigado! Responderemos em até dois dias úteis.</p>
          </Alert>
        ) : null}
        {state === 'error' ? (
          <Alert tone="danger">
            <p>{failure}</p>
          </Alert>
        ) : null}
      </div>

      {errorList.length ? (
        <Alert
          ref={summaryRef}
          tone="danger"
          tabIndex={-1}
          title={`Corrija ${errorList.length} ${errorList.length > 1 ? 'campos' : 'campo'} para enviar`}
        >
          <ul>
            {errorList.map((field) => (
              <li key={field}>
                <a
                  href={`#${FIELD_ID[field]}`}
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById(FIELD_ID[field])?.focus();
                  }}
                >
                  {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </Alert>
      ) : null}

      <form
        ref={formRef}
        className={styles.form}
        action={CONTACT_ENDPOINT}
        method="post"
        noValidate
        onSubmit={handleSubmit}
      >
        <p className={styles.hint}>Todos os campos são obrigatórios, exceto quando indicado.</p>
        <TextField
          id={FIELD_ID.nome}
          name="nome"
          label="Nome"
          autoComplete="name"
          maxLength={CONTACT_LIMITS.nameMax}
          error={errors.nome}
        />
        <TextField
          id={FIELD_ID.email}
          name="email"
          type="email"
          label="E-mail"
          hint="Exemplo: nome@empresa.com.br"
          autoComplete="email"
          maxLength={CONTACT_LIMITS.emailMax}
          error={errors.email}
        />
        <TextField
          id={FIELD_ID.empresa}
          name="empresa"
          label="Empresa"
          optional
          autoComplete="organization"
          maxLength={CONTACT_LIMITS.companyMax}
          error={errors.empresa}
        />
        <SelectField
          id={FIELD_ID.assunto}
          name="assunto"
          label="Assunto"
          options={CONTACT_SUBJECTS}
          error={errors.assunto}
        />
        <TextareaField
          id={FIELD_ID.mensagem}
          name="mensagem"
          label="Mensagem"
          hint={`Entre ${CONTACT_LIMITS.messageMin} e ${CONTACT_LIMITS.messageMax} caracteres.`}
          maxLength={CONTACT_LIMITS.messageMax}
          error={errors.mensagem}
        />
        {/* Armadilha para robôs: invisível e fora da ordem de tabulação */}
        <div className={styles.trap} aria-hidden="true">
          <label htmlFor="contato-site">Não preencha este campo</label>
          <input id="contato-site" name="site" tabIndex={-1} autoComplete="off" />
        </div>
        <CheckboxField id={FIELD_ID.lgpd} name="lgpd" error={errors.lgpd}>
          Concordo que a Orkneytech use estes dados para responder ao meu contato, conforme a{' '}
          <Link href="/privacidade/">Política de Privacidade</Link>.
        </CheckboxField>
        <div>
          <Button type="submit" loading={state === 'sending'}>
            {state === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
          </Button>
        </div>
      </form>
    </>
  );
}
