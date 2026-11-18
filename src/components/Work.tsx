import { ArrowUpRight } from 'lucide-react';
import Section from './Section';
import { workSites, type WorkSite } from '../data/profile';

function CardBody({ site }: { site: WorkSite }) {
  return (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.25rem] bg-white/5">
        <img
          src={site.image}
          alt={`${site.name} screenshot`}
          loading="lazy"
          width={960}
          height={600}
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0e1020] via-transparent to-transparent" />
        <span className="chip absolute left-4 top-4" style={{ background: 'rgba(5, 6, 13, 0.85)' }}>
          {site.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="flex items-center justify-between gap-3 text-xl font-semibold">
          {site.name}
          {site.url && (
            <ArrowUpRight size={20} className="shrink-0 text-[var(--cyan)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          )}
        </h3>
        <p className="mt-2 flex-1 text-sm text-white/60">{site.text}</p>
        <p className="mt-4 truncate font-mono text-xs text-[var(--cyan)]">
          {site.url ? site.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Coming soon'}
        </p>
      </div>
    </>
  );
}

export default function Work() {
  const card = 'holo-card group flex h-full flex-col overflow-hidden';
  return (
    <Section id="work" kicker="04 · Live work" title="Sites and apps I've built at work.">
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workSites.map((s) => (
          <li key={s.name}>
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${s.name} (${s.type})`} className={card}>
                <CardBody site={s} />
              </a>
            ) : (
              <div className={card}>
                <CardBody site={s} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
