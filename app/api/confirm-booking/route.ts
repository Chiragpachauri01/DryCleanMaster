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
const fmt = (n: unknown) => Number(n || 0).toLocaleString("en-IN");

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
    if (!data.email || !data.finalDate || !data.finalTime || data.totalAmount === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const safeName = esc(data.name || "Customer");
    const safeDate = esc(data.finalDate);
    const safeTime = esc(data.finalTime);
    const safeLocation = esc(data.exactLocation || data.address || "To be confirmed");
    const safeService = esc(data.serviceLabel || data.service || "-");
    const safeCity = esc(data.cityLabel || data.city || "");
    const logo = logoAttachment();

    const addOns = (Array.isArray(data.addOns) ? data.addOns : []).filter((a: { name?: string; price?: unknown }) => a.name && a.price !== "");
    const addOnsHtml = addOns.map((a: { name?: string; price?: unknown }) =>
      `<tr><td style="color:#6b7280;">➕ ${esc(a.name)}</td><td align="right" style="font-weight:600;">₹${esc(String(a.price))}</td></tr>`
    ).join("");
    const discountAmount = Number(data.discountAmount || 0);
    const discountLabel = data.discountType === "percent" && Number(data.discountValue || 0) > 0
      ? `🎁 Discount (${esc(String(data.discountValue))}%)` : "🎁 Discount";
    const discountHtml = discountAmount > 0
      ? `<tr><td style="color:#b45309;">${discountLabel}</td><td align="right" style="font-weight:600;color:#b45309;">− ₹${fmt(discountAmount)}</td></tr>` : "";

    await transporter.sendMail({
      from: `"${BRAND}" <${process.env.MAIL_USER}>`,
      to: data.email,
      subject: `✅ Booking Confirmed — ${BRAND}`,
      attachments: [logo],
      html: emailShell("Booking Confirmed ✅", `
        <p style="margin:0 0 8px;font-size:15px;color:#1a1a2e;font-weight:700;">Dear ${safeName},</p>
        <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.75;">Your booking has been <strong>successfully confirmed</strong>. Here are your appointment details:</p>
        <table width="100%" cellpadding="12" cellspacing="0" style="background:#f3f4f6;border-radius:10px;">
          <tr><td style="color:#6b7280;">🧺 Service</td><td align="right" style="font-weight:600;">${safeService}${safeCity ? ` — ${safeCity}` : ""}</td></tr>
          <tr><td style="color:#6b7280;">📅 Date</td><td align="right" style="font-weight:600;">${safeDate}</td></tr>
          <tr><td style="color:#6b7280;">⏰ Time</td><td align="right" style="font-weight:600;">${safeTime}</td></tr>
          <tr><td style="color:#6b7280;">📍 Location</td><td align="right" style="font-weight:600;">${safeLocation}</td></tr>
          ${addOnsHtml}${discountHtml}
          <tr><td style="color:#6b7280;">💰 Total Amount</td><td align="right" style="font-weight:700;">₹${fmt(data.totalAmount)}</td></tr>
          <tr><td style="color:#6b7280;">✅ Advance Received</td><td align="right" style="font-weight:600;">₹${fmt(data.advancePaid || 0)}</td></tr>
          <tr><td style="color:#6b7280;">💳 Pending Amount</td><td align="right" style="font-weight:600;">₹${fmt(data.pendingAmount || 0)}</td></tr>
        </table>
        <p style="margin:24px 0 8px;font-size:14px;color:#374151;">Before our team arrives, please:</p>
        <ul style="font-size:14px;color:#374151;line-height:1.8;padding-left:18px;">
          <li>Keep valuable items and delicate objects safely stored.</li>
          <li>Ensure access to the area to be cleaned.</li>
          <li>Be available for a quick handover walkthrough.</li>
        </ul>
        <div style="text-align:center;margin-top:28px;">
          <a href="${WA_LINK}" style="background:#0f766e;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;display:inline-block;">Chat on WhatsApp</a>
        </div>`),
    });

    if (data.assignedVendorId && data.assignedVendorEmail) {
      const vendorName = esc(data.assignedVendorName || "Vendor");
      const vendorPay = Number(data.vendorPay || 0);
      const breakdown = (Array.isArray(data.vendorPayBreakdown) ? data.vendorPayBreakdown : []).filter((i: { qty?: number }) => (i.qty ?? 0) > 0);
      const breakdownRows = breakdown.map((i: { label?: string; qty?: number; subtotal?: number }) =>
        `<tr><td style="color:#374151;font-size:14px;">${esc(i.label)} × ${i.qty}</td><td align="right" style="font-weight:600;font-size:14px;">₹${fmt(i.subtotal)}</td></tr>`
      ).join("");
      const paySection = vendorPay > 0
        ? `<table width="100%" cellpadding="10" cellspacing="0" style="background:#ccfbf1;border-radius:10px;margin-top:20px;">
            ${breakdownRows ? `<tr><td colspan="2" style="padding:10px 14px 4px;font-size:12px;font-weight:700;color:#0f766e;text-transform:uppercase;">Breakdown</td></tr><tr><td colspan="2" style="padding:0 14px 8px;"><table width="100%" cellpadding="4" cellspacing="0">${breakdownRows}</table></td></tr><tr><td colspan="2" style="border-top:1px solid #99f6e4;"></td></tr>` : ""}
            <tr><td style="padding:12px 14px;color:#0f766e;font-size:15px;font-weight:600;">Your Pay for This Job</td><td align="right" style="padding:12px 14px;font-size:20px;font-weight:700;color:#0f766e;">₹${fmt(vendorPay)}</td></tr>
           </table>`
        : `<p style="margin-top:16px;font-size:13px;color:#6b7280;font-style:italic;">Your pay for this job will be confirmed after completion.</p>`;
      try {
        await transporter.sendMail({
          from: `"${BRAND}" <${process.env.MAIL_USER}>`,
          to: data.assignedVendorEmail,
          subject: `🔔 Job Assigned — ${safeService} on ${safeDate}`,
          attachments: [logo],
          html: emailShell("New Job Assigned 🔔", `
            <div style="background:#f0fdf4;border-left:4px solid #0f766e;padding:14px 16px;border-radius:6px;margin-bottom:24px;">
              <p style="margin:0;font-size:15px;font-weight:600;color:#0f766e;">Hi ${vendorName}, a new job has been assigned to you.</p>
            </div>
            <table width="100%" cellpadding="12" cellspacing="0" style="background:#f3f4f6;border-radius:10px;">
              <tr><td style="color:#6b7280;font-size:14px;">👤 Customer</td><td align="right" style="font-weight:600;font-size:14px;">${safeName}</td></tr>
              <tr><td style="color:#6b7280;font-size:14px;">🧺 Service</td><td align="right" style="font-weight:600;font-size:14px;">${safeService}</td></tr>
              <tr><td style="color:#6b7280;font-size:14px;">📅 Date</td><td align="right" style="font-weight:600;font-size:14px;">${safeDate}</td></tr>
              <tr><td style="color:#6b7280;font-size:14px;">⏰ Time</td><td align="right" style="font-weight:600;font-size:14px;">${safeTime}</td></tr>
              <tr><td style="color:#6b7280;font-size:14px;">📍 Location</td><td align="right" style="font-weight:600;font-size:14px;">${safeLocation}</td></tr>
            </table>
            ${paySection}
            <div style="margin-top:24px;background:#fefce8;border:1px solid #fef08a;padding:14px 16px;border-radius:8px;">
              <p style="margin:0 0 8px;font-weight:600;font-size:13px;color:#854d0e;">Before the job:</p>
              <ul style="margin:0;padding-left:18px;font-size:13px;color:#713f12;line-height:1.8;">
                <li>Arrive at least 10 minutes before the scheduled time.</li>
                <li>Carry all required equipment and cleaning supplies.</li>
                <li>WhatsApp the admin once the job is completed.</li>
              </ul>
            </div>
            <div style="text-align:center;margin-top:28px;">
              <a href="${WA_LINK}" style="background:#0f766e;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;display:inline-block;">Contact Admin on WhatsApp</a>
            </div>`),
        });
      } catch (e) { console.error("Vendor confirmation email failed:", e); }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[confirm-booking]", err);
    const msg = (err as Error).message;
    return NextResponse.json({ error: msg }, { status: msg === "Forbidden" ? 403 : msg === "Unauthorized" ? 401 : 500 });
  }
}
