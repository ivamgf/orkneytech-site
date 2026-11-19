import { PROCESS_STEPS } from '@/content/site';
import styles from './cards.module.css';

/** Etapas do processo de trabalho (lista ordenada). */
export function ProcessSteps() {
  return (
    <ol className={styles.steps}>
      {PROCESS_STEPS.map((step) => (
        <li key={step.title}>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
