import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { sendInquiryEmail, verifyMailer, type InquiryPayload } from './server/mailer';

const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Very small in-memory rate limit: 5 submissions / 10 minutes per IP
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

async function start() {
  const app = express();
  app.use(express.json({ limit: '50kb' }));

  app.post('/api/inquiry', async (req, res) => {
    if (rateLimited(req.ip ?? 'unknown')) {
      return res.status(429).json({ ok: false, error: 'Too many requests. Please try again later.' });
    }

    const b = req.body ?? {};
    // Honeypot: real users never fill this hidden field
    if (clean(b.hp, 100)) {
      console.warn('[inquiry] blocked by honeypot (hidden field was filled)');
      return res.json({ ok: true });
    }

    const data: InquiryPayload = {
      source: b.source === 'contact-proposal' ? 'contact-proposal' : 'hero-callback',
      name: clean(b.name, 120),
      email: clean(b.email, 160),
      phone: clean(b.phone, 30),
      hospital: clean(b.hospital, 160) || undefined,
      service: clean(b.service, 160) || undefined,
      message: clean(b.message, 3000),
    };

    if (data.name.length < 2 || !EMAIL_RE.test(data.email) || data.phone.replace(/\D/g, '').length !== 10 || data.message.length < 6) {
      return res.status(400).json({ ok: false, error: 'Please fill all required fields correctly.' });
    }

    try {
      console.log(`[inquiry] received from ${data.name} <${data.email}> (${data.source}) - sending email...`);
      const info = await sendInquiryEmail(data);
      console.log(`[inquiry] EMAIL SENT to ${process.env.MAIL_TO || process.env.GMAIL_USER} | accepted: ${JSON.stringify(info.accepted)} | rejected: ${JSON.stringify(info.rejected)} | id: ${info.messageId}`);
      res.json({ ok: true });
    } catch (err) {
      console.error('Email send failed:', err);
      res.status(500).json({ ok: false, error: 'Could not send your request right now. Please call us directly.' });
    }
  });

  // Dev-only helper: open http://localhost:3000/api/test-mail to send a test email
  if (!isProd) {
    app.get('/api/test-mail', async (_req, res) => {
      try {
        const info = await sendInquiryEmail({
          source: 'contact-proposal',
          name: 'Test Mail',
          email: process.env.GMAIL_USER || 'test@example.com',
          phone: '9999999999',
          hospital: 'Test Hospital',
          service: 'Test',
          message: 'If you can read this, Nodemailer is working.',
        });
        res.json({ ok: true, to: process.env.MAIL_TO || process.env.GMAIL_USER, accepted: info.accepted, rejected: info.rejected });
      } catch (err) {
        res.status(500).json({ ok: false, error: String(err) });
      }
    });
  }

  if (isProd) {
    const dist = path.resolve(process.cwd(), 'dist');
    app.use(express.static(dist));
    app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
  } else {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    verifyMailer()
      .then(() => console.log(`[mail] Gmail login OK. Emails will go to ${process.env.MAIL_TO || process.env.GMAIL_USER}`))
      .catch((err) => console.error('[mail] Gmail login FAILED - check GMAIL_USER / GMAIL_APP_PASSWORD in .env:', err.message));
  });
}

start();
