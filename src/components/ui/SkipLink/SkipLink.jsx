import styles from './SkipLink.module.css';

/** Primeiro elemento focável da página (WCAG 2.4.1). */
export function SkipLink() {
  return (
    <a className={styles.skip} href="#conteudo">
      Pular para o conteúdo
    </a>
  );
}
