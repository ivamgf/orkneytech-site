/** Dados institucionais. Textos provisórios: revisar antes de publicar. */
export const SITE = {
  name: 'Orkneytech',
  legalName: 'Orkneytech Lab',
  tagline: 'Transformamos ideias em soluções',
  description:
    'Consultoria em tecnologia, engenharia de software e dados, fábrica de software e pesquisa aplicada. Criadora do Konektron.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orkneytech-lab.com',
  email: 'orkneytech-lab@orkneytech-lab.com',
  locale: 'pt_BR',
};

/** Navegação principal: a ordem aqui é a ordem no cabeçalho. */
export const MAIN_NAV = [
  { href: '/', label: 'Início' },
  { href: '/sobre/', label: 'Sobre' },
  { href: '/servicos/', label: 'Serviços' },
  { href: '/portfolio/', label: 'Portfólio' },
  { href: '/pesquisa/', label: 'P&D' },
  { href: '/contato/', label: 'Contato' },
];

export const VALUES = [
  {
    title: 'Rigor técnico',
    text: 'Decisões apoiadas em evidências, métricas e boas práticas de engenharia.',
  },
  {
    title: 'Acessibilidade',
    text: 'Software que todas as pessoas conseguem usar, do primeiro protótipo à entrega.',
  },
  {
    title: 'Transparência',
    text: 'Processos visíveis, documentação viva e comunicação direta com o cliente.',
  },
  { title: 'Aprendizado contínuo', text: 'A pesquisa do laboratório alimenta e melhora cada projeto.' },
];

export const PROCESS_STEPS = [
  { title: 'Diagnóstico', text: 'Entendemos o negócio, os sistemas atuais e as restrições.' },
  { title: 'Proposta', text: 'Arquitetura, escopo, prazos e riscos documentados.' },
  { title: 'Execução', text: 'Ciclos curtos com Scrum e entregas demonstráveis.' },
  { title: 'Evolução', text: 'Medição, suporte e melhoria contínua.' },
];
