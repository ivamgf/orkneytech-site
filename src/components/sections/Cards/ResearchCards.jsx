import { RESEARCH_LINES } from '@/content/research';
import { Card } from '@/components/ui/Card/Card';
import { Tag } from '@/components/ui/Tag/Tag';

/** Linhas de pesquisa do laboratório. */
export function ResearchCards() {
  return (
    <div className="grid">
      {RESEARCH_LINES.map((line, index) => (
        <Card key={line.id} id={line.id}>
          <Tag>Linha {index + 1}</Tag>
          <h3>{line.title}</h3>
          <p>{line.text}</p>
        </Card>
      ))}
    </div>
  );
}
