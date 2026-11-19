import Link from 'next/link';
import { SERVICES } from '@/content/services';
import { Card } from '@/components/ui/Card/Card';
import { Tag } from '@/components/ui/Tag/Tag';
import { DiamondIcon } from '@/components/ui/DiamondIcon';
import styles from './cards.module.css';

/** Cartões resumidos dos serviços (página inicial). @param {{ headingLevel?: 'h3' }} props */
export function ServiceCards({ headingLevel: Heading = 'h3' }) {
  return (
    <div className="grid">
      {SERVICES.map((service) => (
        <Card
          key={service.id}
          featured={service.featured}
          footer={
            <Link href={`/servicos/#${service.id}`}>Saiba mais sobre {service.title.toLowerCase()}</Link>
          }
        >
          {service.featured ? <Tag>Serviço principal</Tag> : null}
          <DiamondIcon className={styles.icon} />
          <Heading>{service.title}</Heading>
          <p>{service.summary}</p>
        </Card>
      ))}
    </div>
  );
}
