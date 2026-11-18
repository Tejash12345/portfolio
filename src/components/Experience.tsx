import { useEffect, useRef } from 'react';
import Section from './Section';
import { experience } from '../data/profile';

export default function Experience() {
  const list = useRef<HTMLOListElement>(null);

  // The glowing line fills as the timeline scrolls through the viewport.
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      const p = Math.min(Math.max((mid - r.top) / r.height, 0), 1);
      el.style.setProperty('--progress', p.toFixed(3));
    };
    const onScroll = () => raf || (raf = requestAnimationFrame(update));
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Section id="experience" kicker="02 · Experience" title="Where I build.">
      <ol ref={list} className="timeline relative space-y-8 pl-8 sm:pl-12">
        {experience.map((e, i) => (
          <li key={e.role} className="relative">
            <span aria-hidden="true" className={`timeline-dot ${i === 0 ? 'is-live' : ''}`} />
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
