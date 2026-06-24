import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { adminAuth } from "@/firebase/firebase.admin";
import { logoAttachment, logoImgTag } from "@/lib/email/logoAttachment";

const BRAND = "DryClean Masters";
const ADMIN_EMAIL = "info@drycleanmasters.com";
const PHONE = "+91 8882631413";
const WA_LINK = "https://wa.me/918882631413";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST ?? "smtp.hostinger.com",
  port: Number(process.env.MAIL_PORT ?? 465),
  secure: true,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

function esc(str: unknown): string {
  if (!str) return "";
  return String(str).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m] ?? m));
}

function emailShell(heading: string, bodyHtml: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#eef8fc;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#eef8fc;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08);">
<tr><td style="background:#061B3A;padding:20px 32px;">
  <table cellpadding="0" cellspacing="0" width="100%"><tr>
    <td>${logoImgTag(44)}</td>
    <td align="right"><h1 style="margin:0;font-family:Georgia,serif;font-size:20px;color:#fff;">${heading}</h1></td>
  </tr></table>
</td></tr>
<tr><td style="padding:32px;">${bodyHtml}</td></tr>
<tr><td style="padding:18px 32px;border-top:1px solid #f1f5f9;background:#f8fcff;text-align:center;">
  <p style="margin:0;font-size:11px;color:#94a3b8;">${BRAND} &middot; Delhi NCR &middot; <a href="tel:${PHONE.replace(/\s/g,"")}" style="color:#0EA5E9;">${PHONE}</a> &middot; <a href="mailto:${ADMIN_EMAIL}" style="color:#0EA5E9;">${ADMIN_EMAIL}</a></p>
</td></tr>
</table></td></tr></table>
</body></html>`;
}

async function verifyAdmin(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) throw new Error("Unauthorized");
  const decoded = await adminAuth.verifyIdToken(auth.slice(7));
  if (!decoded.admin) throw new Error("Forbidden");
}

export async function POST(req: NextRequest) {
  try {
    await verifyAdmin(req);
    const data = await req.json();
    if (!data.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const safeName = esc(data.name || "Customer");
    const safeDate = esc(data.finalDate || data.preferredDate || "-");
    const safeService = esc(data.serviceLabel || data.service || "-");

    await transporter.sendMail({
      from: `"${BRAND}" <${process.env.MAIL_USER}>`,
      to: data.email,
      subject: `❌ Booking Cancelled — ${BRAND}`,
      attachments: [logoAttachment()],
      html: emailShell("Booking Cancelled ❌", `
        <p style="margin:0 0 8px;font-size:15px;color:#1a1a2e;font-weight:700;">Dear ${safeName},</p>
        <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.75;">
          Your <strong>${safeService}</strong> booking scheduled for <strong>${safeDate}</strong> has been <strong>cancelled</strong>.
        </p>
        <p style="margin:0 0 16px;font-size:14px;color:#374151;">If any advance payment was made, it will be processed according to our refund policy.</p>
        <p style="margin:0 0 24px;font-size:14px;color:#374151;">We hope to serve you again in the future. Feel free to book again anytime!</p>
        <div style="text-align:center;margin-top:28px;">
          <a href="${WA_LINK}" style="background:#0f766e;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;display:inline-block;">Chat on WhatsApp</a>
        </div>`),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[cancel-booking]", err);
    const msg = (err as Error).message;
    return NextResponse.json({ error: msg }, { status: msg === "Forbidden" ? 403 : msg === "Unauthorized" ? 401 : 500 });
  }
}
