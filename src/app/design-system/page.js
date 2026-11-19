import { Alert } from '@/components/ui/Alert/Alert';
import { Button, ButtonLink } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';
import { CheckList } from '@/components/ui/CheckList/CheckList';
import { CheckboxField, SelectField, TextField } from '@/components/ui/Field/Field';
import { Tag } from '@/components/ui/Tag/Tag';

/** Vitrine do design system (só para desenvolvimento: removida do pacote dist/). */
export const metadata = { title: 'Design system · Orkneytech', robots: { index: false } };

const COLORS = [
  ['--brand-navy', '#074B9C', 'Primária. Branco por cima: 8.4:1'],
  ['--brand-sky', '#008BBE', 'Apoio/decoração (3.86:1 com branco: não usar para texto pequeno)'],
  ['--brand-sky-text', '#00729C', 'Links e faixa do herói (5.4:1)'],
  ['--brand-orange', '#F18620', 'Acento/CTA, sempre com texto escuro (6.8:1)'],
  ['--brand-orange-text', '#B35A00', 'Laranja como texto (4.8:1)'],
  ['--brand-mist', '#DCE1EF', 'Fundo de seções'],
  ['--konektron-sky', '#019BCD', 'Konektron'],
  ['--konektron-orange', '#FE7D05', 'Konektron'],
  ['--konektron-graphite', '#454D50', 'Konektron (texto e herói)'],
];

const STEPS = ['--step-5', '--step-4', '--step-3', '--step-2', '--step-1', '--step-0', '--step--1'];

export default function DesignSystemPage() {
  return (
    <section className="band">
      <div className="wrap">
        <h1 tabIndex={-1}>Design system</h1>
        <p className="lead">Tokens em src/styles/tokens.css e documentação em docs/design-system.md.</p>

        <h2>Cores</h2>
        <ul className="grid" style={{ listStyle: 'none', padding: 0 }}>
          {COLORS.map(([token, hex, use]) => (
            <li key={token}>
              <div
                style={{
                  background: `var(${token})`,
                  height: 72,
                  borderRadius: 8,
                  border: '1px solid var(--color-border)',
                }}
              />
              <p>
                <strong>{hex}</strong> <code>{token}</code>
                <br />
                {use}
              </p>
            </li>
          ))}
        </ul>

        <h2>Tipografia (escala 1.25)</h2>
        {STEPS.map((step) => (
          <p key={step} style={{ fontSize: `var(${step})`, margin: '0 0 8px' }}>
            {step}: Transformamos ideias em soluções
          </p>
        ))}

        <h2>Botões</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
          <Button>Primário</Button>
          <Button variant="accent">Acento</Button>
          <Button variant="ghost">Contorno</Button>
          <Button loading>Carregando</Button>
          <ButtonLink href="/">Link como botão</ButtonLink>
        </div>

        <h2>Cartões, etiquetas e listas</h2>
        <div className="grid" style={{ marginBottom: 32 }}>
          <Card
            featured
            footer={
              <ButtonLink href="/" variant="ghost">
                Ação do cartão
              </ButtonLink>
            }
          >
            <Tag>Destaque</Tag>
            <h3>Cartão em destaque</h3>
            <p>Texto de apoio do cartão.</p>
          </Card>
          <Card>
            <h3>Lista com losangos</h3>
            <CheckList items={['Primeiro item', 'Segundo item']} />
          </Card>
        </div>

        <h2>Alertas</h2>
        <Alert tone="success">
          <p>Mensagem de sucesso.</p>
        </Alert>
        <Alert tone="danger" title="Erro">
          <p>Mensagem de erro.</p>
        </Alert>

        <h2>Formulário</h2>
        <div style={{ display: 'grid', gap: 24, maxWidth: 640 }}>
          <TextField id="ds-nome" label="Campo de texto" hint="Dica de preenchimento" />
          <TextField
            id="ds-erro"
            label="Campo com erro"
            error="Mensagem de erro do campo."
            defaultValue="valor"
          />
          <SelectField id="ds-select" label="Seleção" options={['Opção A', 'Opção B']} />
          <CheckboxField id="ds-check">Caixa de seleção</CheckboxField>
        </div>
      </div>
    </section>
  );
}
