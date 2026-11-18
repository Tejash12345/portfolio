import Section from './Section';
import { experience } from '../data/profile';

export default function Experience() {
  return (
    <Section id="experience" kicker="02 · Experience" title="Where I build.">
      <ol className="relative space-y-8 border-l border-white/10 pl-6 sm:pl-10">
        {experience.map((e) => (
          <li key={e.role} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[31px] top-7 h-3 w-3 rounded-full bg-[var(--cyan)] shadow-[0_0_16px_var(--cyan)] sm:-left-[47px]"
            />
            <article className="holo-card p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold">{e.role}</h3>
                  <p className="holo-text font-medium">{e.org}</p>
                </div>
                <p className="font-mono text-xs text-white/50">
                  {e.period} · {e.place}
                </p>
              </div>
              <ul className="mt-5 space-y-2 text-white/70">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden="true" className="text-[var(--pink)]">▹</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
