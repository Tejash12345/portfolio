import { FormEvent, useState } from 'react';
import { CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Send } from 'lucide-react';
import Section from './Section';
import { profile } from '../data/profile';

const empty = { name: '', email: '', subject: '', message: '', website: '' };
type Status = { state: 'idle' | 'sending' | 'sent' | 'error'; error?: string };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ state: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Could not send right now.');
      setForm(empty);
      setStatus({ state: 'sent' });
    } catch (err) {
      setStatus({ state: 'error', error: err instanceof Error ? err.message : 'Could not send right now.' });
    }
  };

  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) => setForm({ ...form, [key]: e.target.value });
  const field =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-[var(--cyan)]';
  const sending = status.state === 'sending';

  return (
    <Section id="contact" kicker="08 · Contact" title="Let's build something.">
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

        <form onSubmit={submit} className="holo-card space-y-4 p-6 sm:p-8" noValidate={false}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-white/60">Name</span>
              <input required maxLength={100} autoComplete="name" className={field} value={form.name} onChange={set('name')} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-white/60">Email</span>
              <input required type="email" maxLength={200} autoComplete="email" className={field} value={form.email} onChange={set('email')} />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm text-white/60">Subject</span>
            <input required maxLength={150} className={field} value={form.subject} onChange={set('subject')} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/60">Message</span>
            <textarea required rows={5} maxLength={5000} className={`${field} resize-none`} value={form.message} onChange={set('message')} />
          </label>
          {/* Honeypot for bots; hidden from people and screen readers. */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={set('website')} />

          <button type="submit" disabled={sending} className="btn-holo w-full justify-center disabled:opacity-70">
            {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            {sending ? 'Sending…' : 'Send message'}
          </button>

          <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
            {status.state === 'sent' && (
              <span className="inline-flex items-center gap-2 text-emerald-300">
                <CheckCircle2 size={16} /> Thanks! Your message has been sent. I'll reply soon.
              </span>
            )}
            {status.state === 'error' && <span className="text-rose-300">{status.error}</span>}
          </p>
        </form>
      </div>
    </Section>
  );
}
