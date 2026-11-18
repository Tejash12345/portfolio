import { Briefcase, Cloud, Lightbulb, Workflow } from 'lucide-react';
import Section from './Section';
import { about } from '../data/profile';

const icons = [Briefcase, Lightbulb, Cloud, Workflow];

export default function About() {
  return (
    <Section id="about" kicker="01 · About" title="Business first, then code.">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-white/70">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <dl className="grid grid-cols-3 gap-4 pt-6">
            {about.stats.map((s) => (
              <div key={s.label} className="holo-card p-4 text-center">
                <dt className="text-xs text-white/50">{s.label}</dt>
                <dd className="holo-text mt-1 text-2xl font-bold sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {about.strengths.map((s, i) => {
            const Icon = icons[i];
            return (
              <li key={s.title} className="holo-card p-6">
                <Icon className="text-[var(--cyan)]" size={22} />
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/60">{s.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
