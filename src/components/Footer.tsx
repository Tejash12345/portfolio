import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center font-mono text-xs text-white/40">
      © {new Date().getFullYear()} {profile.name} · <span className="holo-text">{profile.tagline}</span>
    </footer>
  );
}
