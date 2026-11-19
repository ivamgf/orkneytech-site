import Image from 'next/image';
import { KONEKTRON_FEATURES } from '@/content/products';
import { ButtonLink } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { Breadcrumb } from '@/components/ui/Breadcrumb/Breadcrumb';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo/metadata';

const TRAIL = [
  { name: 'Início', path: '/' },
  { name: 'Portfólio', path: '/portfolio/' },
  { name: 'Konektron', path: '/portfolio/konektron/' },
];

export const metadata = pageMetadata({
  title: 'Konektron',
  description:
    'Konektron: requisitos, engenharia de dados com CRISP-DM, modelagem, Scrum, Kanban e documentação automática em um só lugar.',
  path: '/portfolio/konektron/',
});

export default function KonektronPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(TRAIL)} />
      <PageHero
        tone="konektron"
        eyebrow={<Breadcrumb items={TRAIL} />}
        title="Konektron: a engenharia de software do seu time em um só lugar"
        lead="Requisitos, dados, Scrum e documentação conectados, do primeiro levantamento à entrega."
        image={{ src: '/brand/konektron-simbolo.png', width: 185, height: 199 }}
        actions={
          <ButtonLink href="/contato/" variant="accent">
            Solicitar demonstração
          </ButtonLink>
        }
      />
      <section className="band" aria-labelledby="recursos">
        <div className="wrap">
          <div className="section-head">
            <h2 id="recursos">Recursos</h2>
          </div>
          <ul className="grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {KONEKTRON_FEATURES.map((feature) => (
              <Card as="li" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </Card>
            ))}
          </ul>
        </div>
      </section>
      <section className="band band--mist" aria-labelledby="familia">
        <div className="wrap split">
          <div>
            <h2 id="familia">A família Konektron</h2>
            <p>
              <strong>Konektron Research</strong> leva a mesma organização para a gestão de pesquisas
              científicas. <strong>Konektron-SE</strong> cria e analisa diagramas e fluxos de engenharia de
              software.
            </p>
            <ButtonLink href="/portfolio/" variant="ghost">
              Ver todo o portfólio
            </ButtonLink>
          </div>
          <Image
            src="/brand/konektron-logo.png"
            alt="Logotipo do Konektron: blocos laranja e azul encaixados sobre o nome Konektron"
            width={388}
            height={262}
            data-brand-mark=""
            style={{ justifySelf: 'center' }}
          />
        </div>
      </section>
    </>
  );
}
