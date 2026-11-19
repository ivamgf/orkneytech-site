import styles from './Field.module.css';

/**
 * @typedef {{ id: string, label: string, hint?: string, error?: string, optional?: boolean }} FieldBase
 */

/** Liga dica e erro ao controle via aria-describedby. @param {{ id: string, hint?: string, error?: string }} f */
function describedBy({ id, hint, error }) {
  return [hint && `${id}-dica`, error && `${id}-erro`].filter(Boolean).join(' ') || undefined;
}

/** @param {{ id: string, hint?: string, error?: string }} props */
function Messages({ id, hint, error }) {
  return (
    <>
      {hint ? (
        <p className={styles.hint} id={`${id}-dica`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className={styles.error} id={`${id}-erro`}>
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      ) : null}
    </>
  );
}

/** @param {FieldBase} props */
function Label({ id, label, optional }) {
  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      {optional ? <span className={styles.optional}> (opcional)</span> : null}
    </label>
  );
}

/** @param {FieldBase & React.InputHTMLAttributes<HTMLInputElement>} props */
export function TextField({ id, label, hint, error, optional, ...input }) {
  return (
    <div className={styles.field}>
      <Label id={id} label={label} optional={optional} />
      <Messages id={id} hint={hint} />
      <input
        id={id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy({ id, hint, error })}
        required={!optional}
        {...input}
      />
      <Messages id={id} error={error} />
    </div>
  );
}

/** @param {FieldBase & React.TextareaHTMLAttributes<HTMLTextAreaElement>} props */
export function TextareaField({ id, label, hint, error, optional, ...textarea }) {
  return (
    <div className={styles.field}>
      <Label id={id} label={label} optional={optional} />
      <Messages id={id} hint={hint} />
      <textarea
        id={id}
        className={`${styles.control} ${styles.textarea}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy({ id, hint, error })}
        required={!optional}
        {...textarea}
      />
      <Messages id={id} error={error} />
    </div>
  );
}

/** @param {FieldBase & { options: readonly string[], placeholder?: string } & React.SelectHTMLAttributes<HTMLSelectElement>} props */
export function SelectField({
  id,
  label,
  hint,
  error,
  optional,
  options,
  placeholder = 'Selecione',
  ...select
}) {
  return (
    <div className={styles.field}>
      <Label id={id} label={label} optional={optional} />
      <Messages id={id} hint={hint} />
      <select
        id={id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy({ id, hint, error })}
        required={!optional}
        {...select}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Messages id={id} error={error} />
    </div>
  );
}

/** @param {Omit<FieldBase, 'label'> & { children: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>} props */
export function CheckboxField({ id, hint, error, children, ...input }) {
  return (
    <div className={styles.field}>
      <div className={styles.check}>
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy({ id, hint, error })}
          required
          {...input}
        />
        <label htmlFor={id}>{children}</label>
      </div>
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}
