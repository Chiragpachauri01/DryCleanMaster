import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { logoAttachment, logoImgTag } from "@/lib/email/logoAttachment";

const ADMIN_EMAIL = "info@drycleanmasters.com";
const BRAND = "DryClean Masters";
const PHONE = "+91 8882631413";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST ?? "smtp.hostinger.com",
  port: Number(process.env.MAIL_PORT ?? 465),
  secure: true,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

function tableRow(label: string, value: string) {
  if (!value || value === "—") return "";
  return `
    <tr>
      <td style="padding:8px 16px;font-family:Arial,sans-serif;font-size:13px;color:#64748b;white-space:nowrap;border-bottom:1px solid #f1f5f9;">${label}</td>
      <td style="padding:8px 16px;font-family:Arial,sans-serif;font-size:13px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #f1f5f9;">${value}</td>
    </tr>`;
}

function layout(preheader: string, headingLine: string, bodyHtml: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${headingLine}</title></head>
<body style="margin:0;padding:0;background:#eef8fc;">
  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;color:#eef8fc;">${preheader}</div>
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#eef8fc;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" role="presentation"
             style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);max-width:560px;width:100%;">
        <tr>
          <td style="background:#061B3A;padding:24px 32px;">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td>${logoImgTag(44)}</td>
                <td align="right" style="padding-left:16px;">
                  <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#ffffff;font-weight:bold;line-height:1.3;">${headingLine}</h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr><td style="padding:32px;">${bodyHtml}</td></tr>
        <tr>
          <td style="padding:18px 32px;border-top:1px solid #f1f5f9;background:#f8fcff;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#94a3b8;text-align:center;line-height:1.8;">
              ${BRAND} &middot; Delhi NCR &middot;
              <a href="tel:${PHONE.replace(/\s/g, "")}" style="color:#0EA5E9;text-decoration:none;">${PHONE}</a>
              &middot;
              <a href="mailto:${ADMIN_EMAIL}" style="color:#0EA5E9;text-decoration:none;">${ADMIN_EMAIL}</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function ctaButton(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:#0EA5E9;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;font-size:13px;font-weight:700;padding:12px 26px;border-radius:8px;margin-top:20px;">${label}</a>`;
}

function bookingAdminHtml(d: Record<string, string>) {
  const body = `
    <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:14px;color:#475569;">A new booking was submitted on the website. Please call the customer to confirm.</p>
    <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;margin-bottom:8px;">
      ${tableRow("Name", d.name)}
      ${tableRow("Phone", d.phone)}
      ${tableRow("Email", d.email || "—")}
      ${tableRow("Service", d.service)}
      ${tableRow("Date", d.date)}
      ${tableRow("Time Slot", d.timeSlot)}
      ${tableRow("Address", d.address)}
      ${tableRow("Notes", d.notes || "—")}
    </table>
    ${ctaButton(`tel:${d.phone.replace(/\s/g, "")}`, `Call ${d.name.split(" ")[0]} Now`)}`;
  return layout(`New booking from ${d.name} for ${d.service} on ${d.date}`, "New Booking Request", body);
}

function bookingUserHtml(d: Record<string, string>) {
  const firstName = d.name.split(" ")[0];
  const body = `
    <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:15px;color:#1a1a2e;font-weight:700;">Hi ${firstName},</p>
    <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:14px;color:#475569;line-height:1.75;">
      We&rsquo;ve received your booking request! Our team will call you at <strong style="color:#0EA5E9;">${d.phone}</strong> shortly to confirm your appointment.
    </p>
    <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;margin-bottom:20px;">
      ${tableRow("Service", d.service)}
      ${tableRow("Date", d.date)}
      ${tableRow("Time Slot", d.timeSlot)}
      ${tableRow("Address", d.address)}
    </table>
    <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:13px;color:#64748b;line-height:1.7;">
      Need to reach us sooner? Call or WhatsApp: <a href="tel:${PHONE.replace(/\s/g, "")}" style="color:#0EA5E9;font-weight:600;">${PHONE}</a>
    </p>
    <p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:13px;color:#64748b;">Thank you for choosing <strong>${BRAND}</strong>!</p>`;
  return layout("Your booking is confirmed — we'll call you shortly to schedule", "Booking Received ✔", body);
}

function contactAdminHtml(d: Record<string, string>) {
  const body = `
    <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:14px;color:#475569;">A new enquiry was submitted via the Contact page.</p>
    <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;margin-bottom:8px;">
      ${tableRow("Name", d.name)}
      ${tableRow("Phone", d.phone)}
      ${tableRow("Email", d.email || "—")}
      ${tableRow("Service", d.service || "—")}
      ${tableRow("Message", d.message || "—")}
    </table>
    ${ctaButton(`tel:${d.phone.replace(/\s/g, "")}`, `Call ${d.name.split(" ")[0]} Now`)}`;
  return layout(`New enquiry from ${d.name}`, "New Contact Enquiry", body);
}

function contactUserHtml(d: Record<string, string>) {
  const firstName = d.name.split(" ")[0];
  const body = `
    <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:15px;color:#1a1a2e;font-weight:700;">Hi ${firstName},</p>
    <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:14px;color:#475569;line-height:1.75;">
      Thanks for reaching out! We&rsquo;ve received your message and our team will get back to you at <strong style="color:#0EA5E9;">${d.phone}</strong> within a few minutes.
    </p>
    <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:13px;color:#64748b;line-height:1.7;">
      Can&rsquo;t wait? Call or WhatsApp us directly: <a href="tel:${PHONE.replace(/\s/g, "")}" style="color:#0EA5E9;font-weight:600;">${PHONE}</a>
    </p>
    <p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:13px;color:#64748b;">Thank you for choosing <strong>${BRAND}</strong>!</p>`;
  return layout("We've received your message and will be in touch shortly", "Message Received ✔", body);
}

export async function POST(req: NextRequest) {
  try {
    const { type, ...data } = (await req.json()) as { type: string } & Record<string, string>;

    const from = `${BRAND} <${process.env.MAIL_USER}>`;
    const logo = logoAttachment();
    const mails: nodemailer.SendMailOptions[] = [];

    if (type === "booking") {
      mails.push({ from, to: ADMIN_EMAIL, subject: `New Booking: ${data.service} — ${data.name}`, html: bookingAdminHtml(data), attachments: [logo] });
      if (data.email) {
        mails.push({ from, to: data.email, subject: `Your booking is confirmed — ${BRAND}`, html: bookingUserHtml(data), attachments: [logo] });
      }
    } else if (type === "contact") {
      mails.push({ from, to: ADMIN_EMAIL, subject: `New Enquiry: ${data.name}`, html: contactAdminHtml(data), attachments: [logo] });
      if (data.email) {
        mails.push({ from, to: data.email, subject: `We received your message — ${BRAND}`, html: contactUserHtml(data), attachments: [logo] });
      }
    } else {
      return NextResponse.json({ ok: false, error: "unknown type" }, { status: 400 });
    }

    await Promise.all(mails.map((m) => transporter.sendMail(m)));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[send-email]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
