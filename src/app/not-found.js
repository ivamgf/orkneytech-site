import { ButtonLink } from '@/components/ui/Button/Button';
import { PageHero } from '@/components/sections/PageHero/PageHero';

export const metadata = { title: 'Página não encontrada · Orkneytech', robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <PageHero
        title="Página não encontrada"
        lead="O endereço pode ter mudado ou ter sido digitado com algum erro."
      />
      <section className="band">
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <ButtonLink href="/">Ir para o início</ButtonLink>
          <ButtonLink href="/contato/" variant="ghost">
            Falar com a equipe
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
