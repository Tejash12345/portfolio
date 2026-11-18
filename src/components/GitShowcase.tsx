import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, GitBranch, Github } from 'lucide-react';
import { profile } from '../data/profile';

type Line = { kind: 'cmd' | 'out' | 'ok'; text: string };

const SCRIPT: Line[] = [
  { kind: 'cmd', text: 'git checkout -b feature/new-dashboard' },
  { kind: 'out', text: "Switched to a new branch 'feature/new-dashboard'" },
  { kind: 'cmd', text: 'git commit -m "feat: responsive dashboard from Figma"' },
  { kind: 'out', text: '[feature/new-dashboard 3f52a9a] 12 files changed, 480 insertions(+)' },
  { kind: 'cmd', text: 'git push origin feature/new-dashboard' },
  { kind: 'ok', text: '✓ CI passed · tests ✓ · lint ✓ · build ✓' },
  { kind: 'cmd', text: 'git checkout main && git merge feature/new-dashboard' },
  { kind: 'ok', text: '▲ Deployed to production in 42s' },
];

// Types the git script out line by line, then loops. Starts when visible.
function useTypedScript() {
  const [lines, setLines] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLines(SCRIPT.map((l) => l.text));
      return;
    }
    let timer = 0;
    let started = false;
    const run = (li: number, ci: number) => {
      if (li >= SCRIPT.length) {
        timer = window.setTimeout(() => (setLines([]), run(0, 0)), 3500);
        return;
      }
      const line = SCRIPT[li];
      if (line.kind !== 'cmd') {
        // Output appears all at once, like a real terminal.
        setLines((prev) => [...prev, line.text]);
        timer = window.setTimeout(() => run(li + 1, 0), 650);
        return;
      }
      setLines((prev) => {
        const next = [...prev];
        next[li] = line.text.slice(0, ci);
        return next;
      });
      if (ci < line.text.length) timer = window.setTimeout(() => run(li, ci + 1), 28 + Math.random() * 40);
      else timer = window.setTimeout(() => run(li + 1, 0), 380);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        setLines([]);
        run(0, 0);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => (io.disconnect(), clearTimeout(timer));
  }, []);

  return { ref, lines };
}

function Terminal() {
  const { ref, lines } = useTypedScript();
  const typingIndex = lines.length - 1;
  return (
    <div ref={ref} className="git-terminal flex flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-white/40">~/projects/xchangepe — zsh</span>
      </div>
      {/* Fixed height so the page does not jump while lines type in. */}
      <pre className="min-h-[18rem] flex-1 overflow-hidden whitespace-pre-wrap break-words p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]" aria-hidden="true">
        {lines.map((text, i) => {
          const kind = SCRIPT[i].kind;
          return (
            <div key={i} className={kind === 'cmd' ? 'text-white' : kind === 'ok' ? 'text-emerald-300' : 'text-white/50'}>
              {kind === 'cmd' && <span className="text-[var(--pink)]">❯ </span>}
              {text}
              {i === typingIndex && kind === 'cmd' && <span className="term-caret" />}
            </div>
          );
        })}
        {(typingIndex < 0 || SCRIPT[typingIndex]?.kind !== 'cmd') && (
          <div>
            <span className="text-[var(--pink)]">❯ </span>
            <span className="term-caret" />
          </div>
        )}
      </pre>
      <p className="sr-only">A terminal showing a feature branch being committed, pushed through CI, merged and deployed.</p>
    </div>
  );
}

// Branch graph: a feature branch splits off main, gets commits, and merges back.
function BranchGraph() {
  return (
    <svg viewBox="0 0 320 150" className="h-full w-full" role="img" aria-label="Git branch graph: feature branch merged into main">
      <defs>
        <linearGradient id="gMain" x1="0" x2="1">
          <stop offset="0" stopColor="#7df9ff" />
          <stop offset="1" stopColor="#9b7bff" />
        </linearGradient>
        <filter id="gGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* main */}
      <path className="git-path" d="M10 105 H310" stroke="url(#gMain)" strokeWidth="3" fill="none" />
      {/* feature branch */}
      <path className="git-path git-path--branch" d="M70 105 C100 105 100 45 130 45 H220 C250 45 250 105 280 105" stroke="#ff6ad5" strokeWidth="3" fill="none" />
      {/* hotfix branch */}
      <path className="git-path git-path--hotfix" d="M40 105 C55 105 55 135 75 135 H150 C170 135 170 105 185 105" stroke="#ffd86a" strokeWidth="2" fill="none" opacity="0.8" />

      {/* signal running along the feature branch */}
      <circle r="4" fill="#fff" filter="url(#gGlow)">
        <animateMotion dur="5s" repeatCount="indefinite" path="M70 105 C100 105 100 45 130 45 H220 C250 45 250 105 280 105" />
      </circle>

      {[
        { x: 10, y: 105, c: '#7df9ff', d: 0 },
        { x: 40, y: 105, c: '#7df9ff', d: 0.2 },
        { x: 70, y: 105, c: '#7df9ff', d: 0.4 },
        { x: 110, y: 135, c: '#ffd86a', d: 0.9 },
        { x: 130, y: 45, c: '#ff6ad5', d: 0.8 },
        { x: 165, y: 45, c: '#ff6ad5', d: 1.1 },
        { x: 185, y: 105, c: '#ffd86a', d: 1.3 },
        { x: 200, y: 45, c: '#ff6ad5', d: 1.4 },
        { x: 280, y: 105, c: '#9b7bff', d: 2 },
        { x: 310, y: 105, c: '#9b7bff', d: 2.2 },
      ].map((p) => (
        <circle key={`${p.x}-${p.y}`} className="git-commit" style={{ animationDelay: `${p.d}s` }} cx={p.x} cy={p.y} r="6" fill="#05060d" stroke={p.c} strokeWidth="3" />
      ))}

      <g fontFamily="JetBrains Mono, monospace" fontSize="9">
        <text x="12" y="92" fill="#7df9ff">main</text>
        <text x="132" y="32" fill="#ff6ad5">feature/new-dashboard</text>
        <text x="80" y="149" fill="#ffd86a">hotfix</text>
        <text x="252" y="92" fill="#9b7bff">merge ✓</text>
      </g>
    </svg>
  );
}

export default function GitShowcase() {
  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
      <div className="holo-card flex flex-col p-6 sm:p-8">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--cyan)]">
          <GitBranch size={16} /> How I ship
        </p>
        <h3 className="mt-3 text-2xl font-semibold">Branch, review, test, deploy.</h3>
        <p className="mt-3 text-white/60">
          Every change goes through a feature branch, automated tests and CI checks before it reaches production. Small, safe releases.
        </p>
        <div className="mt-6 h-40 sm:h-44">
          <BranchGraph />
        </div>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6 self-start">
          <Github size={18} /> View my GitHub <ArrowUpRight size={16} />
        </a>
      </div>
      <Terminal />
    </div>
  );
}
