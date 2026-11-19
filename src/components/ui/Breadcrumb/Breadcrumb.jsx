import Link from 'next/link';
import styles from './Breadcrumb.module.css';

/**
 * Trilha de navegação (padrão APG Breadcrumb). O último item é a página atual.
 * @param {{ items: { name: string, path: string }[] }} props
 */
export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Trilha de navegação" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.path}>
              {current ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
