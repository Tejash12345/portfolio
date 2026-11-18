import { lazy, Suspense } from 'react';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/profile';

// Three.js loads after the text so the page is readable (and indexable) immediately.
const HoloScene = lazy(() => import('./HoloScene'));

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <div className="absolute inset-0 md:left-[35%]" aria-hidden="true">
        <Suspense fallback={null}>
          <HoloScene />
        </Suspense>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05060d] via-[#05060d]/70 to-transparent md:via-[#05060d]/40"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="section-kicker">{profile.tagline}</p>
        <h1 className="mt-5 text-5xl font-bold leading-[1.05] sm:text-7xl">
          {profile.name.split(' ').slice(0, 1)}
          <br />
          <span className="holo-text">{profile.name.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="mt-6 font-mono text-sm text-[var(--cyan)] sm:text-base">&gt; {profile.role}</p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{profile.intro}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#projects" className="btn-holo">
            View my work <ArrowDown size={18} />
          </a>
          <a href={profile.resume} className="btn-ghost" download>
            <Download size={18} /> Resume
          </a>
        </div>

        <ul className="mt-10 flex gap-3" aria-label="Social links">
          {[
            { href: profile.github, label: 'GitHub', Icon: Github },
            { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
            { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
          ].map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:border-[var(--cyan)] hover:text-[var(--cyan)]"
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
