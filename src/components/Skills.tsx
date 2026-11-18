import { BarChart3, Landmark, Megaphone, Network, Search, Sparkles, Workflow, type LucideIcon } from 'lucide-react';
import Section from './Section';
import { learning, skillIcons, skills } from '../data/profile';

const lucideIcons: Record<string, LucideIcon> = {
  'CI/CD': Workflow,
  'REST APIs': Network,
  SEO: Search,
  'Meta Ads': Megaphone,
  'Business Analysis': BarChart3,
  FinTech: Landmark,
};

export default function Skills() {
  return (
    <Section id="skills" kicker="07 · Skills" title="My toolkit.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s) => (
          <div key={s.group} className="holo-card p-6">
            <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--cyan)]">{s.group}</h3>
            <ul className="mt-5 grid grid-cols-3 gap-3">
              {s.items.map((name) => {
                const icon = skillIcons[name];
                const Fallback = lucideIcons[name] ?? Sparkles;
                return (
                  <li key={name} className="skill-tile">
                    {icon ? (
                      <img
                        src={icon.src}
                        alt=""
                        loading="lazy"
                        width={32}
                        height={32}
                        className={`h-8 w-8 object-contain ${icon.dark ? 'invert' : ''}`}
                      />
                    ) : (
                      <Fallback aria-hidden="true" size={28} className="text-[var(--cyan)]" />
                    )}
                    <span>{name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="holo-card mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
        <p className="shrink-0 font-mono text-sm uppercase tracking-[0.2em] text-[var(--pink)]">
          <span className="live-dot" aria-hidden="true" /> Currently learning
        </p>
        <p className="sr-only">{learning.join(', ')}</p>
        <div className="marquee">
          <ul className="marquee-track" aria-hidden="true">
            {[...learning, ...learning].map((l, i) => (
              <li key={i} className="chip whitespace-nowrap">{l}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
