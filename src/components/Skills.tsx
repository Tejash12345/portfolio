import Section from './Section';
import { skills } from '../data/profile';

export default function Skills() {
  return (
    <Section id="skills" kicker="04 · Skills" title="My toolkit.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <div key={s.group} className="holo-card p-6">
            <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--cyan)]">{s.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.items.map((i) => (
                <li key={i} className="chip">{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
