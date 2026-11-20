export interface InquiryData {
  source: 'hero-callback' | 'contact-proposal';
  name: string;
  email: string;
  phone: string;
  hospital?: string;
  service?: string;
  message: string;
  hp?: string; // honeypot (must stay empty)
}

/** Sends the form data to our Node server, which emails it using Nodemailer. */
export async function sendInquiry(data: InquiryData): Promise<void> {
  let res: Response;
  try {
    res = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error('Network error. Please check your connection and try again.');
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.ok) {
    throw new Error(json.error || 'Something went wrong. Please try again.');
  }
}
