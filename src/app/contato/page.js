import { SITE } from '@/content/site';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { ContactForm } from '@/components/sections/ContactForm/ContactForm';
import styles from '@/components/sections/ContactForm/ContactForm.module.css';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Contato',
  description:
    'Fale com a Orkneytech sobre consultoria, engenharia de software, fábrica de software, Konektron ou pesquisa.',
  path: '/contato/',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Fale com a Orkneytech"
        lead="Conte o seu desafio. Respondemos em até dois dias úteis."
      />
      <section className="band" aria-label="Formulário de contato">
        <div className="wrap split split--top">
          <div>
            <ContactForm />
          </div>
          <aside className={styles.aside} aria-labelledby="outros-canais">
            <h2 id="outros-canais">Outros canais</h2>
            <p>
              <strong>E-mail</strong>
              <br />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
            <p>
              <strong>Suporte aos produtos</strong>
              <br />
              Clientes do Konektron podem abrir chamados pelo mesmo e-mail, informando o produto no assunto.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
