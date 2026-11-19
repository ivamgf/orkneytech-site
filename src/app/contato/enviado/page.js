import { ButtonLink } from '@/components/ui/Button/Button';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { pageMetadata } from '@/lib/seo/metadata';

/** Página de confirmação usada quando o formulário é enviado sem JavaScript. */
export const metadata = {
  ...pageMetadata({ title: 'Mensagem enviada', path: '/contato/enviado/' }),
  robots: { index: false },
};

export default function SentPage() {
  return (
    <>
      <PageHero
        title="Mensagem enviada"
        lead="Obrigado pelo contato! Responderemos em até dois dias úteis."
      />
      <section className="band">
        <div className="wrap">
          <ButtonLink href="/">Voltar para o início</ButtonLink>
        </div>
      </section>
    </>
  );
}
