import { SITE } from '@/content/site';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Declaração de acessibilidade',
  description: 'Compromisso da Orkneytech com a acessibilidade digital: WCAG 2.2 nível AA.',
  path: '/acessibilidade/',
});

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        title="Declaração de acessibilidade"
        lead="Queremos que todas as pessoas consigam usar este site."
      />
      <section className="band">
        <div className="wrap prose">
          <h2>Nível de conformidade</h2>
          <p>
            O site foi projetado para atender às Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.2,
            nível AA, e segue as práticas de WAI-ARIA para os componentes interativos.
          </p>
          <h2>Recursos disponíveis</h2>
          <ul>
            <li>Link “Pular para o conteúdo” no início de cada página.</li>
            <li>Navegação completa por teclado, com foco sempre visível.</li>
            <li>
              Botão “Acessibilidade” com aumento do texto, zoom da página, alto contraste e o tradutor de
              Libras VLibras.
            </li>
            <li>Tema escuro automático, conforme a preferência do sistema.</li>
            <li>Animações reduzidas quando o sistema pede menos movimento.</li>
            <li>Formulário com rótulos visíveis, instruções e mensagens de erro descritivas.</li>
          </ul>
          <h2>Limitações conhecidas</h2>
          <p>
            O widget VLibras é mantido pelo governo federal; sua acessibilidade por teclado depende do próprio
            fornecedor. Os logotipos estão em imagem rasterizada e serão substituídos por versões vetoriais.
          </p>
          <h2>Como avaliamos</h2>
          <p>
            Testes automáticos com axe-core em todas as páginas, revisão manual de teclado, contraste, zoom de
            200% e largura de 320 px. Recomendamos ainda testes periódicos com os leitores de tela NVDA e
            VoiceOver.
          </p>
          <h2>Encontrou uma barreira?</h2>
          <p>
            Escreva para <a href={`mailto:${SITE.email}`}>{SITE.email}</a> contando a página e o problema.
            Respondemos em até dois dias úteis.
          </p>
        </div>
      </section>
    </>
  );
}
