import styles from './Card.module.css';

/**
 * @param {{ as?: 'article'|'div'|'li', featured?: boolean, footer?: React.ReactNode, children: React.ReactNode } & React.HTMLAttributes<HTMLElement>} props
 */
export function Card({ as: Tag = 'article', featured = false, footer, className, children, ...rest }) {
  return (
    <Tag
      className={[styles.card, featured && styles.featured, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </Tag>
  );
}
