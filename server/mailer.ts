import nodemailer, { type Transporter } from 'nodemailer';

export interface InquiryPayload {
  source: 'hero-callback' | 'contact-proposal';
  name: string;
  email: string;
  phone: string;
  hospital?: string;
  service?: string;
  message: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

let transporter: Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error('GMAIL_USER and GMAIL_APP_PASSWORD are missing in .env');
  }
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  return transporter;
}

export async function sendInquiryEmail(data: InquiryPayload) {
  const to = process.env.MAIL_TO || process.env.GMAIL_USER!;
  const isProposal = data.source === 'contact-proposal';
  const label = isProposal ? 'Proposal Request (Contact Form)' : 'Callback Request (Hero Form)';

  const rows: Array<[string, string]> = [
    ['Form', label],
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
  ];
  if (data.hospital) rows.push(['Hospital / Organization', data.hospital]);
  if (data.service) rows.push(['Service Required', data.service]);
  rows.push(['Message', data.message]);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden">
      <div style="background:#1B1A5E;color:#FBF8F3;padding:16px 20px">
        <h2 style="margin:0;font-size:18px">New website inquiry — Kevat Seva Setu LLP</h2>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) => `<tr>
              <td style="padding:10px 20px;border-bottom:1px solid #eee;font-weight:bold;width:36%;vertical-align:top;background:#faf7f2">${escapeHtml(k)}</td>
              <td style="padding:10px 20px;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(v)}</td>
            </tr>`
          )
          .join('')}
      </table>
    </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  return getTransporter().sendMail({
    from: `"Kevat Seva Setu Website" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: `"${data.name.replace(/["\r\n]/g, '')}" <${data.email}>`,
    subject: `New ${isProposal ? 'Proposal Request' : 'Callback Request'} from ${data.name.replace(/[\r\n]/g, ' ')}`,
    text,
    html,
  });
}

export function verifyMailer() {
  return getTransporter().verify();
}
