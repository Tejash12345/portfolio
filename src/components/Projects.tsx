import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Section from './Section';
import { projects, type Project } from '../data/profile';

function TiltCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);

  // Small 3D tilt that follows the pointer.
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  };
  const reset = () => ref.current && (ref.current.style.transform = '');

  return (
    <article ref={ref} onPointerMove={onMove} onPointerLeave={reset} className="holo-card flex flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden rounded-t-[1.25rem]">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          width={640}
          height={360}
          className="h-full w-full object-cover opacity-85 transition duration-500 hover:scale-105 hover:opacity-100"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0e1020] to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-white/60">{project.text}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t} className="chip">{t}</li>
          ))}
        </ul>
        <div className="mt-6 flex gap-5 text-sm">
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[var(--cyan)] hover:underline">
            <ExternalLink size={15} /> Live demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white">
            <Github size={15} /> Code
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" kicker="06 · Projects" title="Personal projects.">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <TiltCard key={p.title} project={p} />
        ))}
      </div>
    </Section>
  );
}
