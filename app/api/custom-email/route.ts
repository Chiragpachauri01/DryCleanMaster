import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { logoAttachment, logoImgTag } from "@/lib/email/logoAttachment";

const BRAND = "DryClean Masters";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST ?? "smtp.hostinger.com",
  port: Number(process.env.MAIL_PORT ?? 465),
  secure: true,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let to = "", cc = "", subject = "", body = "";
    const attachments: { filename?: string; content?: Buffer; path?: string; cid?: string }[] = [logoAttachment()];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      to = String(formData.get("to") || "");
      cc = String(formData.get("cc") || "");
      subject = String(formData.get("subject") || "");
      body = String(formData.get("body") || "");
      const files = formData.getAll("attachments") as File[];
      for (const file of files) {
        const buf = await file.arrayBuffer();
        attachments.push({ filename: file.name, content: Buffer.from(buf) });
      }
    } else {
      const json = await req.json();
      to = json.to || "";
      cc = json.cc || "";
      subject = json.subject || "";
      body = json.body || "";
    }

    if (!to || !subject || !body) {
      return NextResponse.json({ error: "to, subject, and body are required" }, { status: 400 });
    }

    const recipients = to.split(",").map((e: string) => e.trim()).filter(Boolean);
    if (recipients.length === 0) {
      return NextResponse.json({ error: "No valid recipients" }, { status: 400 });
    }

    const from = `${BRAND} <${process.env.MAIL_USER}>`;
    const plainBody = body.replace(/\n/g, "<br/>");
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#eef8fc;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#eef8fc;padding:40px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);max-width:560px;width:100%;">
<tr><td style="background:#061B3A;padding:20px 32px;">
  <table cellpadding="0" cellspacing="0" width="100%"><tr>
    <td>${logoImgTag(44)}</td>
    <td align="right"><h1 style="margin:0;font-family:Georgia,serif;font-size:20px;color:#ffffff;font-weight:bold;">${subject}</h1></td>
  </tr></table>
</td></tr>
<tr><td style="padding:32px;font-family:Arial,sans-serif;font-size:14px;color:#475569;line-height:1.75;">${plainBody}</td></tr>
<tr><td style="padding:18px 32px;border-top:1px solid #f1f5f9;background:#f8fcff;text-align:center;">
  <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#94a3b8;">${BRAND} &middot; Delhi NCR &middot; <a href="tel:+918882631413" style="color:#0EA5E9;">+91 8882631413</a></p>
</td></tr>
</table></td></tr></table>
</body></html>`;

    if (recipients.length === 1) {
      await transporter.sendMail({ from, to: recipients[0], ...(cc ? { cc } : {}), subject, text: body, html, attachments });
    } else {
      await Promise.all(recipients.map((recipient) =>
        transporter.sendMail({ from, to: recipient, subject, text: body, html, attachments })
      ));
    }

    return NextResponse.json({ ok: true, sent: recipients.length });
  } catch (err) {
    console.error("[custom-email]", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
