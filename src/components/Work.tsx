import { ArrowUpRight } from 'lucide-react';
import Section from './Section';
import { workSites } from '../data/profile';

export default function Work() {
  return (
    <Section id="work" kicker="03 · Live work" title="Live sites I've built at work.">
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workSites.map((s) => (
          <li key={s.name}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${s.name} (${s.type})`}
              className="holo-card group flex h-full flex-col overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.25rem] bg-white/5">
                <img
                  src={s.image}
                  alt={`${s.name} ${s.type.toLowerCase()} screenshot`}
                  loading="lazy"
                  width={960}
                  height={600}
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0e1020] via-transparent to-transparent" />
                <span className="chip absolute left-4 top-4" style={{ background: 'rgba(5, 6, 13, 0.85)' }}>
                  {s.type}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="flex items-center justify-between text-xl font-semibold">
                  {s.name}
                  <ArrowUpRight size={20} className="text-[var(--cyan)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </h3>
                <p className="mt-2 flex-1 text-sm text-white/60">{s.text}</p>
                <p className="mt-4 truncate font-mono text-xs text-[var(--cyan)]">{s.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
