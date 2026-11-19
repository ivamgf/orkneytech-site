import Link from 'next/link';
import styles from './Button.module.css';

/** @typedef {'primary'|'accent'|'ghost'|'onBrand'} ButtonVariant */

/** @param {ButtonVariant} variant @param {string} [extra] */
const classes = (variant, extra) => [styles.button, styles[variant], extra].filter(Boolean).join(' ');

/**
 * Botão de ação (dispara algo na página).
 * @param {{ variant?: ButtonVariant, loading?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export function Button({
  variant = 'primary',
  loading = false,
  type = 'button',
  className,
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={classes(variant, className)}
      aria-busy={loading || undefined}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

/**
 * Link com aparência de botão (leva a outra página).
 * @param {{ href: string, variant?: ButtonVariant } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>} props
 */
export function ButtonLink({ href, variant = 'primary', className, children, ...rest }) {
  return (
    <Link href={href} className={classes(variant, className)} {...rest}>
      {children}
    </Link>
  );
}
