"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDocs, collection } from "firebase/firestore";
import { Mail, Send, X } from "lucide-react";
import { db } from "@/lib/firebase";

const fieldCls = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-colors";

export default function CustomEmail() {
  const searchParams = useSearchParams();
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [audienceMode, setAudienceMode] = useState<"custom" | "customers" | "vendors">("custom");
  const [customerEmails, setCustomerEmails] = useState<string[]>([]);
  const [vendorEmails, setVendorEmails] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [preview, setPreview] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const emailParam = searchParams?.get("email");
    const nameParam = searchParams?.get("name");
    if (emailParam) {
      setTo(emailParam);
      if (nameParam) setBody(`Hi ${nameParam},\n\n`);
    }

    getDocs(collection(db, "bookings")).then((snap) => {
      const emails = new Set<string>();
      snap.docs.forEach((d) => {
        const e = d.data().email;
        if (e && typeof e === "string") emails.add(e.toLowerCase());
      });
      setCustomerEmails(Array.from(emails));
    });

    getDocs(collection(db, "vendors")).then((snap) => {
      const emails: string[] = [];
      snap.docs.forEach((d) => {
        const e = d.data().email;
        if (e && typeof e === "string") emails.push(e.toLowerCase());
      });
      setVendorEmails(emails);
    });
  }, [searchParams]);

  const resolvedTo = () => {
    if (audienceMode === "customers") return customerEmails.join(", ");
    if (audienceMode === "vendors") return vendorEmails.join(", ");
    return to;
  };

  const handleSend = async () => {
    const toValue = resolvedTo();
    if (!toValue || !subject || !body) { alert("Please fill To, Subject, and Body."); return; }
    setSending(true);
    try {
      const formData = new FormData();
      formData.append("to", toValue);
      if (cc) formData.append("cc", cc);
      formData.append("subject", subject);
      formData.append("body", body);
      attachments.forEach((file) => formData.append("attachments", file, file.name));
      const res = await fetch("/api/custom-email", { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to send email");
      }
      setSent(true);
      setTo(""); setCc(""); setSubject(""); setBody(""); setAttachments([]);
      setTimeout(() => setSent(false), 5000);
    } catch (err) { alert((err as Error).message); }
    setSending(false);
  };

  const audienceCount = audienceMode === "customers" ? customerEmails.length
    : audienceMode === "vendors" ? vendorEmails.length : 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-slate-950 sm:text-2xl">Custom Email</h1>
        <button onClick={() => setPreview((v) => !v)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
          {preview ? <X size={15} /> : <Mail size={15} />}
          {preview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      {sent && (
        <div className="flex items-center gap-3 rounded-2xl border border-teal-200 bg-teal-50 p-4">
          <Send size={18} className="text-teal-700" />
          <p className="font-semibold text-teal-900">Email sent successfully!</p>
        </div>
      )}

      <div className={`grid gap-6 ${preview ? "lg:grid-cols-2" : ""}`}>
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Audience</p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "custom", label: "Custom" },
                { value: "customers", label: `All Customers (${customerEmails.length})` },
                { value: "vendors", label: `All Vendors (${vendorEmails.length})` },
              ].map((opt) => (
                <button key={opt.value} onClick={() => setAudienceMode(opt.value as typeof audienceMode)} className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${audienceMode === opt.value ? "bg-teal-700 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>
                  {opt.label}
                </button>
              ))}
            </div>
            {audienceMode !== "custom" && (
              <p className="mt-2 text-xs text-slate-500">
                Will send to <strong className="text-slate-800">{audienceCount}</strong> email{audienceCount !== 1 ? "s" : ""}.
                {audienceMode === "customers" && " Unique emails from all bookings."}
                {audienceMode === "vendors" && " All vendor emails on file."}
              </p>
            )}
          </div>

          {audienceMode === "custom" && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">To *</label>
              <input type="email" placeholder="recipient@email.com" className={fieldCls} value={to} onChange={(e) => setTo(e.target.value)} />
              <p className="mt-1 text-xs text-slate-500">Separate multiple addresses with commas.</p>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">CC</label>
            <input type="email" placeholder="cc@email.com" className={fieldCls} value={cc} onChange={(e) => setCc(e.target.value)} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Subject *</label>
            <input type="text" placeholder="Email subject…" className={fieldCls} value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Body *</label>
            <textarea rows={10} placeholder={"Hi [Name],\n\nWrite your message here…\n\nThanks,\nDryClean Masters"} className={fieldCls} value={body} onChange={(e) => setBody(e.target.value)} style={{ resize: "vertical" }} />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Attachments</label>
            <input ref={fileRef} type="file" multiple className="hidden" onChange={(e) => setAttachments(Array.from(e.target.files || []))} />
            <button onClick={() => fileRef.current?.click()} className="rounded-xl border border-dashed border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-teal-400 hover:text-teal-700">
              + Attach files
            </button>
            {attachments.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {attachments.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {f.name}
                    <button onClick={() => setAttachments((prev) => prev.filter((_, j) => j !== i))} className="text-slate-400 hover:text-red-600"><X size={11} /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-4">
            <button onClick={handleSend} disabled={sending} className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-2.5 text-sm font-bold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60">
              <Send size={15} />
              {sending ? "Sending…" : audienceMode !== "custom" ? `Send to ${audienceCount} recipient${audienceCount !== 1 ? "s" : ""}` : "Send Email"}
            </button>
          </div>
        </div>

        {preview && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Email Preview</p>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
              <div className="mb-4 space-y-1.5 border-b border-slate-200 pb-4 text-xs text-slate-500">
                <p><strong className="text-slate-700">From:</strong> DryClean Masters &lt;hello@drycleanmasters.in&gt;</p>
                <p><strong className="text-slate-700">To:</strong> {resolvedTo() || <em>Not set</em>}</p>
                {cc && <p><strong className="text-slate-700">CC:</strong> {cc}</p>}
                <p><strong className="text-slate-700">Subject:</strong> <span className="font-bold text-slate-900">{subject || <em>Not set</em>}</span></p>
              </div>
              <div className="whitespace-pre-wrap text-sm text-slate-800">{body || <span className="italic text-slate-400">Body will appear here…</span>}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
