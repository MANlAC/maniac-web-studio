"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

export const sendEmail = action({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (_ctx, args) => {
    const { name, email, message } = args;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured. Please add it in the project's Keys/API keys tab.");
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "Maniac Web Studio <onboarding@resend.dev>",
      to: "dineshbohara2073@gmail.com",
      subject: `New Inquiry from ${name} — Maniac Web Studio`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background-color:#06060e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <div style="max-width:600px;margin:40px auto;background-color:#0c0c18;border:1px solid #1a1a3e;border-radius:16px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#00e5ff,#7b2ff7);padding:32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:1px;">MANIAC.</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">New Contact Form Submission</p>
            </div>
            <div style="padding:32px;">
              <div style="margin-bottom:24px;">
                <p style="margin:0 0 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;">From</p>
                <p style="margin:0;color:#e8eaed;font-size:16px;font-weight:600;">${name}</p>
              </div>
              <div style="margin-bottom:24px;">
                <p style="margin:0 0 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Email</p>
                <a href="mailto:${email}" style="margin:0;color:#00e5ff;font-size:14px;text-decoration:none;">${email}</a>
              </div>
              <div style="margin-bottom:24px;">
                <p style="margin:0 0 4px;color:#6b7280;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Message</p>
                <div style="background-color:#12122a;border:1px solid #1a1a3e;border-radius:8px;padding:16px;margin-top:8px;">
                  <p style="margin:0;color:#c0c4cc;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</p>
                </div>
              </div>
              <div style="border-top:1px solid #1a1a3e;padding-top:20px;text-align:center;">
                <p style="margin:0;color:#6b7280;font-size:12px;">Reply directly to this email to respond to ${name}.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      replyTo: email,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, id: data?.id };
  },
});
