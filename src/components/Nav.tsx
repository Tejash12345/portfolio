import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = ['about', 'experience', 'work', 'projects', 'skills', 'contact'];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? 'border-b border-white/10 bg-[#05060d]/70 backdrop-blur-xl' : ''
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="font-mono text-sm tracking-[0.3em]">
          <span className="holo-text font-bold">TK</span>
          <span className="text-white/50"> // portfolio</span>
        </a>
        <ul className="hidden gap-8 text-sm text-white/70 md:flex">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l}`} className="capitalize transition-colors hover:text-[var(--cyan)]">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="border-t border-white/10 bg-[#05060d]/95 px-4 py-4 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l}`} onClick={() => setOpen(false)} className="block py-3 capitalize text-white/80">
                {l}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
