import { SITE } from '@/content/site';
import { PageHero } from '@/components/sections/PageHero/PageHero';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata({
  title: 'Política de privacidade',
  description: 'Como a Orkneytech trata os dados enviados pelo site, conforme a LGPD.',
  path: '/privacidade/',
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Política de privacidade"
        lead="Texto-base para revisão jurídica antes da publicação."
      />
      <section className="band">
        <div className="wrap prose">
          <h2>Quais dados coletamos</h2>
          <p>
            Pelo formulário de contato: nome, e-mail, empresa (opcional), assunto e mensagem. Para proteger o
            formulário contra abuso, guardamos também um resumo criptográfico (hash) do endereço IP, que não
            permite identificar o endereço original.
          </p>
          <h2>Para que usamos</h2>
          <p>Somente para responder ao seu contato e dar continuidade à conversa que você iniciou.</p>
          <h2>Por quanto tempo guardamos</h2>
          <p>Por até 24 meses após o último contato, ou até você pedir a exclusão.</p>
          <h2>Cookies e armazenamento local</h2>
          <p>
            O site não usa cookies de rastreamento. As escolhas feitas nas ferramentas de acessibilidade
            (tamanho do texto, zoom, contraste e VLibras) ficam guardadas apenas no seu navegador. O widget
            VLibras é fornecido pelo governo federal (vlibras.gov.br).
          </p>
          <h2>Seus direitos</h2>
          <p>
            Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
