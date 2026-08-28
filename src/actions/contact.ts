import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import nodemailer from 'nodemailer';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const server = {
  sendEmail: defineAction({
    input: schema,
    handler: async (input) => {
      const { name, email, subject, message } = input;

      // Configure nodemailer (using environment variables in production)
      const transporter = nodemailer.createTransport({
        host: import.meta.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(import.meta.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: import.meta.env.SMTP_USER,
          pass: import.meta.env.SMTP_PASS,
        },
      });

      const to = import.meta.env.CONTACT_EMAIL || 'mihailmihaylov2004@gmail.com';
      const fullSubject = `[Portfolio] ${subject} — ${name}`;
      const body = `From: ${name} <${email}>\n\n${message}\n\n—\nSent via mihailmihaylov.com contact form`;

      await transporter.sendMail({
        from: `"Portfolio Contact" <${import.meta.env.SMTP_USER || email}>`,
        to,
        subject: fullSubject,
        text: body,
        replyTo: email,
      });

      return { success: true };
    },
  }),
};