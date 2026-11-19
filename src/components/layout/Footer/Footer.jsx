import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/content/site';
import { SERVICES } from '@/content/services';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.cols}>
          <div>
            <Image
              src="/brand/orkneytech-logo-branco.png"
              alt={SITE.legalName}
              width={160}
              height={120}
              className={styles.logo}
            />
            <p>Laboratório de pesquisas em engenharia de software e novas tecnologias.</p>
          </div>
          <nav aria-labelledby="rodape-servicos">
            <h2 id="rodape-servicos">Serviços</h2>
            <ul>
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href={`/servicos/#${service.id}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="rodape-portfolio">
            <h2 id="rodape-portfolio">Portfólio e pesquisa</h2>
            <ul>
              <li>
                <Link href="/portfolio/konektron/">Konektron</Link>
              </li>
              <li>
                <Link href="/portfolio/#konektron-research">Konektron Research</Link>
              </li>
              <li>
                <Link href="/portfolio/#konektron-se">Konektron-SE</Link>
              </li>
              <li>
                <Link href="/pesquisa/">Pesquisa e desenvolvimento</Link>
              </li>
            </ul>
          </nav>
          <nav aria-labelledby="rodape-contato">
            <h2 id="rodape-contato">Contato e ajuda</h2>
            <ul>
              <li>
                <Link href="/contato/">Formulário de contato</Link>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <Link href="/privacidade/">Política de privacidade</Link>
              </li>
              <li>
                <Link href="/acessibilidade/">Declaração de acessibilidade</Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className={styles.legal}>
          © {year} {SITE.legalName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
