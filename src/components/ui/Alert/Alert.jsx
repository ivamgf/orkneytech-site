import { forwardRef } from 'react';
import styles from './Alert.module.css';

/**
 * Caixa de mensagem. Quando precisar ser anunciada, envolva-a numa região
 * aria-live já existente na página (o anúncio não funciona se a região nascer junto).
 * @type {React.ForwardRefExoticComponent<{ tone?: 'danger'|'success'|'info', title?: string, children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>}
 */
export const Alert = forwardRef(function Alert({ tone = 'info', title, children, ...rest }, ref) {
  return (
    <div ref={ref} className={`${styles.alert} ${styles[tone]}`} {...rest}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {children}
    </div>
  );
});
