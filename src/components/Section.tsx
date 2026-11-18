import { ReactNode, useEffect, useRef } from 'react';

type Props = { id: string; kicker: string; title: string; children: ReactNode };

export default function Section({ id, kicker, title, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && (el.classList.add('is-visible'), io.disconnect()),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} aria-labelledby={`${id}-title`} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <p className="section-kicker">{kicker}</p>
      <h2 id={`${id}-title`} className="mt-3 text-3xl font-bold sm:text-5xl">
        {title}
      </h2>
      <div className="mt-12">{children}</div>
    </section>
  );
}
