import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/content/products';
import { Card } from '@/components/ui/Card/Card';
import styles from './cards.module.css';

const MARK = { src: '/brand/konektron-simbolo.png', width: 185, height: 199 };

/** Cartões do portfólio (página inicial). */
export function ProductCards() {
  return (
    <div className="grid">
      {PRODUCTS.map((product) => (
        <Card
          key={product.id}
          footer={
            <Link href={product.href}>
              {product.cta}
              <span className="visually-hidden"> – {product.name}</span>
            </Link>
          }
        >
          <Image className={styles.mark} {...MARK} alt="" />
          <h3>{product.name}</h3>
          <p>{product.summary}</p>
        </Card>
      ))}
    </div>
  );
}

/** Lista completa do portfólio (página /portfolio), um h2 por produto. */
export function ProductList() {
  return (
    <div className={styles.stack}>
      {PRODUCTS.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          aria-labelledby={`produto-${product.id}`}
          className={styles.productRow}
        >
          <Image {...MARK} alt="" data-brand-mark="" />
          <div>
            <h2 id={`produto-${product.id}`}>{product.name}</h2>
            <p>{product.summary}</p>
            <Link href={product.href}>
              {product.cta}
              <span className="visually-hidden"> – {product.name}</span>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
