import styles from './Tag.module.css';

/** Etiqueta informativa (não interativa). @param {{ children: React.ReactNode }} props */
export function Tag({ children }) {
  return <span className={styles.tag}>{children}</span>;
}
