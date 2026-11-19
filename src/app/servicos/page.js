import { SERVICES } from '@/content/services';
import { ButtonLink } from '@/components/ui/Button/Button';
import { CheckList } from '@/components/ui/CheckList/CheckList';
import { Tag } from '@/components/ui/Tag/Tag';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { ProcessSteps } from '@/components/sections/Cards/ProcessSteps';
import { CtaBand } from '@/components/sections/Cards/CtaBand';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Serviços',
  description:
    'Consultoria em tecnologia, engenharia de software e dados e fábrica de software: da estratégia à entrega.',
  path: '/servicos/',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Serviços"
        lead="Consultoria em tecnologia como ponto de partida, com engenharia e fábrica de software para executar."
      />
      {SERVICES.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`band${index % 2 ? ' band--mist' : ''}`}
          aria-labelledby={`${service.id}-titulo`}
        >
          <div className="wrap split">
            <div>
              {service.featured ? <Tag>Serviço principal</Tag> : null}
              <h2 id={`${service.id}-titulo`}>{service.title}</h2>
              <p className="lead">{service.summary}</p>
              <ButtonLink href="/contato/" variant="accent">
                Conversar sobre {service.title.toLowerCase()}
              </ButtonLink>
            </div>
            <CheckList items={service.items} />
          </div>
        </section>
      ))}
      <section
        className={`band${SERVICES.length % 2 ? ' band--mist' : ''}`}
        aria-labelledby="como-trabalhamos"
      >
        <div className="wrap">
          <h2 id="como-trabalhamos">Como trabalhamos</h2>
          <ProcessSteps />
        </div>
      </section>
    </>
  );
}
