import styles from './CheckList.module.css';

/** Lista com marcador em losango (motivo da marca). @param {{ items: string[] }} props */
export function CheckList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
