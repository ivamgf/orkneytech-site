import { PageHero } from '@/components/sections/PageHero/PageHero';
import { ProductList } from '@/components/sections/Cards/ProductCards';
import { CtaBand } from '@/components/sections/Cards/CtaBand';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Portfólio',
  description:
    'Konektron, Konektron Research e Konektron-SE: softwares próprios criados no laboratório da Orkneytech.',
  path: '/portfolio/',
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        title="Portfólio de softwares"
        lead="Produtos próprios, criados e validados no laboratório."
      />
      <section className="band" aria-label="Produtos">
        <div className="wrap">
          <ProductList />
        </div>
      </section>
      <CtaBand
        title="Quer usar um dos nossos softwares?"
        text="Fale com a equipe para agendar uma demonstração ou pedir acesso."
        action="Pedir demonstração"
      />
    </>
  );
}
