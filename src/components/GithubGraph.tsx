import { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import { profile } from '../data/profile';

type Day = { date: string; count: number; level: number };
const USER = profile.github.split('/').pop();
const COLORS = ['rgba(255,255,255,0.06)', 'rgba(125,249,255,0.3)', 'rgba(125,249,255,0.55)', 'rgba(155,123,255,0.8)', '#ff6ad5'];

// Public contributions from GitHub (via a free read-only API), drawn in the site's colors.
export default function GithubGraph() {
  const [data, setData] = useState<{ total: number; days: Day[] } | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j: { total: { lastYear: number }; contributions: Day[] }) => {
        if (alive) setData({ total: j.total.lastYear, days: j.contributions });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!data) return null;

  // Pad the start so each column is one week, Sunday first.
  const offset = new Date(data.days[0].date).getDay();
  const cells: (Day | null)[] = [...Array(offset).fill(null), ...data.days];

  return (
    <div className="holo-card mt-10 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-semibold">
          <Github size={18} className="text-[var(--cyan)]" /> GitHub activity
        </h3>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[var(--cyan)] hover:underline">
          {data.total} contributions in the last year →
        </a>
      </div>
      <div className="mt-5 overflow-x-auto pb-2">
        <div
          role="img"
          aria-label={`${data.total} public GitHub contributions in the last year`}
          className="grid w-max grid-flow-col gap-[3px]"
          style={{ gridTemplateRows: 'repeat(7, 11px)', gridAutoColumns: '11px' }}
        >
          {cells.map((d, i) => (
            <span
              key={i}
              title={d ? `${d.count} on ${d.date}` : undefined}
              className="rounded-[3px]"
              style={{
                background: d ? COLORS[d.level] : 'transparent',
                boxShadow: d && d.level > 2 ? `0 0 8px ${COLORS[d.level]}` : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
