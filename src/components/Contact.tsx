import { FormEvent, useState } from 'react';
import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import Section from './Section';
import { profile } from '../data/profile';

export default function Contact() {
  const [form, setForm] = useState({ name: '', subject: '', message: '' });

  // No backend: open the visitor's mail app with the message filled in.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  };

  const field =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-[var(--cyan)]';

  return (
    <Section id="contact" kicker="06 · Contact" title="Let's build something.">
      <div className="grid gap-8 lg:grid-cols-2">
        <ul className="space-y-4">
          {[
            { Icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
            { Icon: Linkedin, label: 'LinkedIn', value: 'in/tejeshkumar-dev', href: profile.linkedin },
            { Icon: Github, label: 'GitHub', value: 'Tejash12345', href: profile.github },
            { Icon: MapPin, label: 'Location', value: profile.location },
          ].map(({ Icon, label, value, href }) => (
            <li key={label} className="holo-card flex items-center gap-4 p-5">
              <Icon className="shrink-0 text-[var(--cyan)]" size={20} />
              <div className="min-w-0">
                <p className="text-xs text-white/50">{label}</p>
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="break-words hover:text-[var(--cyan)]">
                    {value}
                  </a>
                ) : (
                  <p>{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <form onSubmit={submit} className="holo-card space-y-4 p-6 sm:p-8">
          <label className="block">
            <span className="mb-2 block text-sm text-white/60">Name</span>
            <input required className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/60">Subject</span>
            <input required className={field} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/60">Message</span>
            <textarea required rows={5} className={`${field} resize-none`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </label>
          <button type="submit" className="btn-holo w-full justify-center">
            <Send size={18} /> Send message
          </button>
        </form>
      </div>
    </Section>
  );
}
