import { useEffect, useRef, useState } from 'react';

// Counts up to a value like "6", "6+" or "2025" once it scrolls into view.
export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const hasMatch = Boolean(match);
  const start = target > 1000 ? target - 25 : 0;
  const [n, setN] = useState(match ? start : target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasMatch) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(target);
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(start + (target - start) * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => (io.disconnect(), cancelAnimationFrame(raf));
  }, [target, start, hasMatch]);

  if (!match) return <>{value}</>;
  return (
    <span ref={ref} aria-label={value}>
      {n}
      {suffix}
    </span>
  );
}
