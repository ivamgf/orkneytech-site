import Link from 'next/link';
import { FEATURED_PROJECT } from '@/content/research';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { ResearchCards } from '@/components/sections/Cards/ResearchCards';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Pesquisa e Desenvolvimento',
  description:
    'Linhas de pesquisa da Orkneytech: engenharia de software, dados e IA, acessibilidade imersiva e computação quântica.',
  path: '/pesquisa/',
});

export default function ResearchPage() {
  return (
    <>
      <PageHero
        title="Pesquisa e Desenvolvimento"
        lead="O laboratório que sustenta nossos serviços e produtos."
      />
      <section className="band" aria-labelledby="linhas">
        <div className="wrap">
          <div className="section-head">
            <h2 id="linhas">Linhas de pesquisa</h2>
          </div>
          <ResearchCards />
        </div>
      </section>
      <section className="band band--mist" aria-labelledby="destaque">
        <div className="wrap">
          <h2 id="destaque">Projeto em destaque: {FEATURED_PROJECT.title}</h2>
          <p>{FEATURED_PROJECT.text}</p>
          <p>
            Quer pesquisar com a gente ou levar uma linha de pesquisa para a sua empresa?{' '}
            <Link href="/contato/">Fale com o laboratório</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
