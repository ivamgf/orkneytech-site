import { ButtonLink } from '@/components/ui/Button/Button';
import styles from './cards.module.css';

/**
 * Faixa de chamada para contato.
 * @param {{ title?: string, text?: string, action?: string }} props
 */
export function CtaBand({
  title = 'Vamos conversar sobre o seu projeto?',
  text = 'Conte o seu desafio e marcamos um diagnóstico sem compromisso.',
  action = 'Fale com um consultor',
}) {
  return (
    <section className={`band ${styles.cta}`} aria-labelledby="cta-titulo">
      <div className={`wrap ${styles.ctaInner}`}>
        <div>
          <h2 id="cta-titulo">{title}</h2>
          <p>{text}</p>
        </div>
        <ButtonLink href="/contato/" variant="accent">
          {action}
        </ButtonLink>
      </div>
    </section>
  );
}
