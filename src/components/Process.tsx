import Section from './Section';
import { process } from '../data/profile';

// Small animated sketches for each step: a design frame, code lines, a live server.
function FigmaVisual() {
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden="true">
      <rect x="10" y="10" width="140" height="80" rx="6" fill="none" stroke="#7df9ff" strokeOpacity="0.4" strokeDasharray="4 4" />
      <rect x="20" y="20" width="50" height="8" rx="2" fill="#9b7bff" opacity="0.8" />
      <rect x="20" y="34" width="80" height="4" rx="2" fill="#ffffff" opacity="0.25" />
      <rect x="20" y="42" width="64" height="4" rx="2" fill="#ffffff" opacity="0.25" />
      <rect x="20" y="58" width="36" height="14" rx="7" fill="#ff6ad5" opacity="0.85" />
      <rect x="104" y="20" width="36" height="52" rx="4" fill="#7df9ff" opacity="0.15" stroke="#7df9ff" strokeOpacity="0.6" />
      <g className="cursor-anim">
        <path d="M0 0 L0 12 L4 9 L7 15 L9 14 L6 8 L11 8 Z" fill="#fff" />
        <rect x="10" y="12" width="26" height="9" rx="3" fill="#ff6ad5" />
      </g>
    </svg>
  );
}

function CodeVisual() {
  const lines = [
    [12, 40, '#ff6ad5'],
    [22, 70, '#7df9ff'],
    [22, 52, '#9b7bff'],
    [32, 60, '#7df9ff'],
    [22, 34, '#ffd86a'],
    [12, 20, '#ff6ad5'],
  ] as const;
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full font-mono" aria-hidden="true">
      <rect x="10" y="10" width="140" height="80" rx="6" fill="#0b0f22" stroke="#7df9ff" strokeOpacity="0.3" />
      <circle cx="20" cy="18" r="2.5" fill="#ff6ad5" />
      <circle cx="28" cy="18" r="2.5" fill="#ffd86a" />
      <circle cx="36" cy="18" r="2.5" fill="#7df9ff" />
      {lines.map(([x, w, c], i) => (
        <rect key={i} className="type-line" style={{ animationDelay: `${i * 0.35}s` }} x={x + 6} y={30 + i * 9} width={w} height="4" rx="2" fill={c} opacity="0.75" />
      ))}
    </svg>
  );
}

function CloudVisual() {
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full" aria-hidden="true">
      <path d="M52 62 a16 16 0 0 1 4-31 a22 22 0 0 1 42 4 a14 14 0 0 1 8 27 Z" fill="#7df9ff" fillOpacity="0.08" stroke="#7df9ff" strokeOpacity="0.7" />
      <polyline className="pulse-line" points="20,84 50,84 58,72 66,92 74,78 82,84 140,84" fill="none" stroke="#ff6ad5" strokeWidth="2" />
      <circle cx="80" cy="46" r="4" fill="#4ade80">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <text x="90" y="49" fontSize="9" fill="#4ade80" fontFamily="JetBrains Mono, monospace">live</text>
    </svg>
  );
}

const visuals = [FigmaVisual, CodeVisual, CloudVisual];

export default function Process() {
  return (
    <Section id="process" kicker="03 · How I work" title="From Figma to production.">
      <ol className="relative grid gap-6 md:grid-cols-3">
        <span aria-hidden="true" className="process-line hidden md:block" />
        {process.map((p, i) => {
          const Visual = visuals[i];
          return (
            <li key={p.title} className="holo-card relative flex flex-col p-6">
              <div className="h-32 overflow-hidden rounded-xl bg-white/[0.03]">
                <Visual />
              </div>
              <p className="mt-6 font-mono text-xs tracking-[0.3em] text-[var(--pink)]">STEP {p.step}</p>
              <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{p.text}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
