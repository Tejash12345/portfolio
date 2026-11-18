import nodemailer from 'nodemailer';

// Vercel serverless function: POST /api/contact
// Needs these environment variables in Vercel (Project → Settings → Environment Variables):
//   GMAIL_USER          the Gmail address that sends the mail
//   GMAIL_APP_PASSWORD  a Google "App password" for that account (not the normal password)
//   CONTACT_TO          optional: where messages are delivered (defaults to GMAIL_USER)

const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};

  // Honeypot: real visitors never fill the hidden "website" field.
  if (body.website) return res.status(200).json({ ok: true });

  const fields = {};
  for (const key of Object.keys(LIMITS)) {
    const value = typeof body[key] === 'string' ? body[key].trim() : '';
    if (!value) return res.status(400).json({ ok: false, error: `Please fill in your ${key}.` });
    if (value.length > LIMITS[key]) return res.status(400).json({ ok: false, error: `Your ${key} is too long.` });
    fields[key] = value;
  }
  if (!EMAIL_RE.test(fields.email)) return res.status(400).json({ ok: false, error: 'Please enter a valid email.' });

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return res.status(500).json({ ok: false, error: 'Mail is not configured yet. Please email me directly.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  const oneLine = (s) => s.replace(/[\r\n]+/g, ' ');
  try {
    await transporter.sendMail({
      from: `"Portfolio contact" <${GMAIL_USER}>`,
      to: CONTACT_TO || GMAIL_USER,
      replyTo: `"${oneLine(fields.name).replace(/"/g, '')}" <${fields.email}>`,
      subject: `[Portfolio] ${oneLine(fields.subject)}`,
      text: `From: ${fields.name} <${fields.email}>\n\n${fields.message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(fields.name)} &lt;${escapeHtml(fields.email)}&gt;</p>
             <p><strong>Subject:</strong> ${escapeHtml(fields.subject)}</p>
             <hr/><p style="white-space:pre-wrap">${escapeHtml(fields.message)}</p>`,
    });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: 'Could not send right now. Please email me directly.' });
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
