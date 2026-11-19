import Image from 'next/image';
import styles from './PageHero.module.css';

/**
 * Faixa de abertura com a onda da identidade visual. Contém o único h1 da página.
 * @param {{
 *   title: string,
 *   lead?: string,
 *   eyebrow?: React.ReactNode,
 *   actions?: React.ReactNode,
 *   image?: { src: string, width: number, height: number },
 *   tone?: 'brand'|'konektron',
 * }} props
 */
export function PageHero({ title, lead, eyebrow, actions, image, tone = 'brand' }) {
  return (
    <section className={`${styles.hero} ${styles[tone]}`} aria-labelledby="titulo-pagina">
      <div className={`wrap ${styles.inner} ${image ? styles.withImage : ''}`}>
        <div>
          {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
          <h1 id="titulo-pagina" tabIndex={-1}>
            {title}
          </h1>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>
        {image ? (
          <Image
            className={styles.image}
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            priority
          />
        ) : null}
      </div>
      <svg
        className={styles.wave}
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d="M0 96V60C240 40 520 20 760 40s480 46 680 10v46Z" />
      </svg>
    </section>
  );
}
