import { SITE } from '@/content/site';
import { RESEARCH_LINES } from '@/content/research';
import { ButtonLink } from '@/components/ui/Button/Button';
import { CheckList } from '@/components/ui/CheckList/CheckList';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { ServiceCards } from '@/components/sections/Cards/ServiceCards';
import { ProductCards } from '@/components/sections/Cards/ProductCards';
import { CtaBand } from '@/components/sections/Cards/CtaBand';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({ path: '/' });

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Orkneytech Lab · Consultoria, engenharia e pesquisa"
        title={SITE.tagline}
        lead="Consultoria em tecnologia apoiada por um laboratório de pesquisa em engenharia de software. Ajudamos sua empresa a decidir melhor, construir com qualidade e evoluir com segurança."
        image={{ src: '/brand/orkneytech-esfera.png', width: 176, height: 176 }}
        actions={
          <>
            <ButtonLink href="/contato/" variant="accent">
              Agendar um diagnóstico
            </ButtonLink>
            <ButtonLink href="/servicos/" variant="onBrand">
              Conhecer os serviços
            </ButtonLink>
          </>
        }
      />

      <section className="band" aria-labelledby="o-que-fazemos">
        <div className="wrap">
          <div className="section-head">
            <h2 id="o-que-fazemos">O que fazemos</h2>
            <p className="lead">Da estratégia ao código em produção, com método e rigor de pesquisa.</p>
          </div>
          <ServiceCards />
        </div>
      </section>

      <section className="band band--mist" aria-labelledby="softwares">
        <div className="wrap">
          <div className="section-head">
            <h2 id="softwares">Softwares que nascem no laboratório</h2>
            <p className="lead">
              A família Konektron leva para o dia a dia das equipes o que pesquisamos em engenharia de
              software e dados.
            </p>
          </div>
          <ProductCards />
        </div>
      </section>

      <section className="band" aria-labelledby="pesquisa">
        <div className="wrap split">
          <div>
            <h2 id="pesquisa">Pesquisa que vira prática</h2>
            <p>
              Mantemos linhas de pesquisa aplicada em engenharia de software, dados e IA, acessibilidade em
              ambientes imersivos e computação quântica. O que aprendemos no laboratório chega aos projetos
              dos clientes.
            </p>
            <ButtonLink href="/pesquisa/" variant="ghost">
              Ver linhas de pesquisa
            </ButtonLink>
          </div>
          <CheckList items={RESEARCH_LINES.map((line) => line.title)} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
