import Image from 'next/image';
import { VALUES } from '@/content/site';
import { Card } from '@/components/ui/Card/Card';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { CtaBand } from '@/components/sections/Cards/CtaBand';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Sobre',
  description:
    'Conheça a Orkneytech Lab: consultoria, desenvolvimento e pesquisa aplicada em engenharia de software.',
  path: '/sobre/',
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Sobre a Orkneytech"
        lead="Um laboratório de pesquisa em engenharia de software e novas tecnologias que também atende empresas."
      />
      <section className="band" aria-labelledby="quem-somos">
        <div className="wrap split">
          <div>
            <h2 id="quem-somos">Quem somos</h2>
            <p>
              A Orkneytech Lab reúne consultoria, desenvolvimento e pesquisa aplicada para transformar ideias
              complexas em software confiável, acessível e escalável.
            </p>
            <p>
              Trabalhamos lado a lado com as equipes dos clientes: entendemos o problema, propomos a
              arquitetura certa e entregamos com processos claros e documentação completa.
            </p>
          </div>
          <Image
            src="/brand/orkneytech-logo.png"
            alt="Logotipo da Orkneytech: esfera azul em treliça de losangos sobre o nome Orkneytech"
            width={316}
            height={242}
            data-brand-mark=""
            style={{ justifySelf: 'center' }}
          />
        </div>
      </section>
      <section className="band band--mist" aria-labelledby="valores">
        <div className="wrap">
          <h2 id="valores">Nossos valores</h2>
          <ul className="grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {VALUES.map((value) => (
              <Card as="li" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </Card>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
