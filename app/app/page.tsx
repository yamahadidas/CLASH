import { getManual } from '@/lib/content';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import ManualEffects from '@/components/ManualEffects';

export default function ManualPage() {
  const { sections, nav, searchIndex } = getManual();

  return (
    <>
      <Sidebar nav={nav} searchIndex={searchIndex} hero={<Hero />}>
        {sections.map((s) => (
          <section
            key={s.slug}
            id={`sec-${s.slug}`}
            className={`doc-section${s.card === 'ee' ? ' ee-card' : ''}${s.card === 'stat' ? ' stat-card' : ''}`}
            style={s.swatch ? ({ '--swatch': s.swatch } as React.CSSProperties) : undefined}
          >
            {s.card === 'ee' && <div className="ee-swatch" />}
            <div className="doc-eyebrow">{s.eyebrow}</div>
            <div className="doc-body">
              <h1>{s.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: s.html }} />
            </div>
          </section>
        ))}
      </Sidebar>
      <ManualEffects />
    </>
  );
}
