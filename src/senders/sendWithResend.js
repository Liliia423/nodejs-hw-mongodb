import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWithResend = async ({ to, subject, html }) => {
  return resend.emails.send({
    from: 'Your App <onboarding@resend.dev>',
    to,
    subject,
    html,
  });
};
