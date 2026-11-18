import { CheckCircle2 } from 'lucide-react';
import Section from './Section';
import { caseStudies } from '../data/profile';

export default function CaseStudies() {
  return (
    <Section id="case-studies" kicker="05 · Case notes" title="What I built, and why.">
      <div className="space-y-8">
        {caseStudies.map((c, i) => (
          <article key={c.name} className="holo-card grid overflow-hidden lg:grid-cols-[1fr_1.2fr]">
            <div className={`relative min-h-[220px] ${i % 2 ? 'lg:order-2' : ''}`}>
              <img
                src={c.image}
                alt={`${c.name} screenshot`}
                loading="lazy"
                width={960}
                height={600}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-t from-[#0e1020] via-[#0e1020]/30 to-transparent ${i % 2 ? 'lg:bg-gradient-to-r' : 'lg:bg-gradient-to-l'}`} />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-semibold">{c.name}</h3>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.25em] text-[var(--pink)]">The problem</p>
              <p className="mt-2 text-white/70">{c.problem}</p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-[var(--cyan)]">What I built</p>
              <ul className="mt-3 space-y-2 text-white/70">
                {c.built.map((b) => (
                  <li key={b} className="flex gap-3">
                    <CheckCircle2 aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[var(--cyan)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech used">
                {c.tech.map((t) => (
                  <li key={t} className="chip">{t}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
