"use client";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { CheckCircle2, ChevronDown, Mail, MapPin, Phone, Plus, Search, X } from "lucide-react";
import { db } from "@/lib/firebase";

const DCM_SERVICES = [
  { value: "sofa-dry-cleaning", label: "Sofa Dry Cleaning" },
  { value: "carpet-dry-cleaning", label: "Carpet Dry Cleaning" },
  { value: "mattress-dry-cleaning", label: "Mattress Dry Cleaning" },
  { value: "curtain-dry-cleaning", label: "Curtain Dry Cleaning" },
  { value: "car-interior-cleaning", label: "Car Interior Cleaning" },
  { value: "office-chair-cleaning", label: "Office Chair Cleaning" },
  { value: "other", label: "Other / Multiple" },
];

const DCM_CITIES = [
  { value: "delhi", label: "Delhi" },
  { value: "noida", label: "Noida" },
  { value: "gurugram", label: "Gurugram" },
  { value: "ghaziabad", label: "Ghaziabad" },
  { value: "faridabad", label: "Faridabad" },
  { value: "greater-noida", label: "Greater Noida" },
];

const PRICING_SCHEMA: Record<string, { label: string; unit: string }[]> = {
  "sofa-dry-cleaning": [
    { label: "1 Seater Sofa", unit: "per sofa" },
    { label: "2 Seater Sofa", unit: "per sofa" },
    { label: "3 Seater Sofa", unit: "per sofa" },
    { label: "L-Shape Sofa", unit: "per set" },
  ],
  "carpet-dry-cleaning": [
    { label: "Small Carpet (up to 4x6 ft)", unit: "per carpet" },
    { label: "Medium Carpet (4x6 to 6x9 ft)", unit: "per carpet" },
    { label: "Large Carpet (6x9 to 9x12 ft)", unit: "per carpet" },
    { label: "Runner / Doormat", unit: "per piece" },
  ],
  "mattress-dry-cleaning": [
    { label: "Single Mattress", unit: "per mattress" },
    { label: "Double Mattress", unit: "per mattress" },
    { label: "Queen / King Mattress", unit: "per mattress" },
  ],
  "curtain-dry-cleaning": [
    { label: "Single Curtain Panel", unit: "per panel" },
    { label: "Curtain Pair", unit: "per pair" },
    { label: "Heavy / Long Curtain", unit: "per panel" },
  ],
  "car-interior-cleaning": [
    { label: "Hatchback Interior", unit: "per car" },
    { label: "Sedan Interior", unit: "per car" },
    { label: "SUV Interior", unit: "per car" },
    { label: "Full Detailing", unit: "per car" },
  ],
  "office-chair-cleaning": [
    { label: "Mesh Chair", unit: "per chair" },
    { label: "Fabric Chair", unit: "per chair" },
    { label: "Leather Chair", unit: "per chair" },
  ],
};

interface PricingRow {
  label: string;
  price: number;
}

interface Vendor {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  status?: string;
  services?: string[];
  bio?: string;
  pricing?: Record<string, PricingRow[]>;
  createdAt?: unknown;
  [key: string]: unknown;
}

interface VendorFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  bio: string;
  services: string[];
  pricing: Record<string, Record<string, string>>;
}

const emptyForm = (): VendorFormData => ({
  name: "", email: "", phone: "", city: "", bio: "",
  services: [], pricing: {},
});

const fieldCls = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-colors";

const statusStyles: Record<string, string> = {
  approved: "bg-teal-50 text-teal-700 border-teal-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

const callApi = async (url: string, method: string, payload: unknown) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  const token = await user.getIdToken();
  return fetch(url, {
    method,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
};

export default function Vendor() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [form, setForm] = useState<VendorFormData>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [pricingEmailVendorId, setPricingEmailVendorId] = useState<string | null>(null);
  const [jobCounts, setJobCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, "vendors"), (snap) => {
      setVendors(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Vendor)));
      setLoading(false);
    });
    getDocs(collection(db, "bookings")).then((snap) => {
      const counts: Record<string, number> = {};
      snap.docs.forEach((d) => {
        const vid = d.data().assignedVendorId;
        if (vid) counts[vid] = (counts[vid] || 0) + 1;
      });
      setJobCounts(counts);
    });
    return () => unsub();
  }, []);

  const filtered = vendors.filter((v) => {
    const matchStatus = statusFilter === "all" || v.status === statusFilter;
    const matchSearch = [v.name, v.phone, v.email, v.city]
      .join(" ").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const toggleService = (serviceValue: string) => {
    setForm((f) => {
      const services = f.services.includes(serviceValue)
        ? f.services.filter((s) => s !== serviceValue)
        : [...f.services, serviceValue];
      const pricing = { ...f.pricing };
      if (!services.includes(serviceValue)) delete pricing[serviceValue];
      return { ...f, services, pricing };
    });
  };

  const setPriceRow = (serviceKey: string, rowLabel: string, price: string) => {
    setForm((f) => ({
      ...f,
      pricing: {
        ...f.pricing,
        [serviceKey]: {
          ...(f.pricing[serviceKey] || {}),
          [rowLabel]: price,
        },
      },
    }));
  };

  const pricingForApi = (formPricing: Record<string, Record<string, string>>, services: string[]): Record<string, PricingRow[]> => {
    const result: Record<string, PricingRow[]> = {};
    services.forEach((serviceKey) => {
      const schema = PRICING_SCHEMA[serviceKey] || [];
      result[serviceKey] = schema
        .filter((row) => formPricing[serviceKey]?.[row.label])
        .map((row) => ({ label: row.label, price: Number(formPricing[serviceKey]?.[row.label] || 0) }));
    });
    return result;
  };

  const openAdd = () => {
    setForm(emptyForm());
    setAddModal(true);
  };

  const openEdit = (vendor: Vendor) => {
    const pricingForm: Record<string, Record<string, string>> = {};
    if (vendor.pricing) {
      Object.entries(vendor.pricing).forEach(([serviceKey, rows]) => {
        pricingForm[serviceKey] = {};
        rows.forEach((row) => { pricingForm[serviceKey][row.label] = String(row.price || ""); });
      });
    }
    setForm({
      name: vendor.name || "",
      email: vendor.email || "",
      phone: vendor.phone || "",
      city: vendor.city || "",
      bio: vendor.bio || "",
      services: vendor.services || [],
      pricing: pricingForm,
    });
    setEditingVendor(vendor);
    setEditModal(true);
  };

  const handleAdd = async () => {
    if (!form.name || !form.phone) { alert("Name and phone are required."); return; }
    setSaving(true);
    try {
      const res = await callApi("/api/admin/vendor", "POST", {
        ...form, pricing: pricingForApi(form.pricing, form.services),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add vendor");
      setAddModal(false);
      setForm(emptyForm());
    } catch (err) { alert((err as Error).message); }
    setSaving(false);
  };

  const handleEdit = async () => {
    if (!editingVendor) return;
    setSaving(true);
    try {
      const res = await callApi("/api/admin/vendor", "PATCH", {
        id: editingVendor.id,
        ...form,
        pricing: pricingForApi(form.pricing, form.services),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update vendor");
      setEditModal(false);
      setEditingVendor(null);
    } catch (err) { alert((err as Error).message); }
    setSaving(false);
  };

  const updateStatus = async (vendor: Vendor, status: string) => {
    try {
      const res = await callApi("/api/admin/vendor", "PATCH", { id: vendor.id, status });
      if (!res.ok) throw new Error("Failed to update status");
    } catch (err) { alert((err as Error).message); }
  };

  const handleDelete = async (vendor: Vendor) => {
    if (!window.confirm(`Delete vendor "${vendor.name}"?`)) return;
    try {
      const res = await callApi("/api/admin/vendor", "DELETE", { id: vendor.id });
      if (!res.ok) throw new Error("Failed to delete vendor");
    } catch (err) { alert((err as Error).message); }
  };

  const sendPricingEmail = async (vendor: Vendor) => {
    if (!vendor.email) { alert("No email for this vendor."); return; }
    setPricingEmailVendorId(vendor.id);
    try {
      const services = (vendor.services || []).map((s) => {
        const match = DCM_SERVICES.find((d) => d.value === s);
        return match?.label || s;
      }).join(", ");
      const pricingText = Object.entries(vendor.pricing || {}).map(([key, rows]) => {
        const label = DCM_SERVICES.find((d) => d.value === key)?.label || key;
        const rowStr = rows.map((r) => `  - ${r.label}: ₹${r.price}`).join("\n");
        return `${label}:\n${rowStr}`;
      }).join("\n\n");
      const body = `Hi ${vendor.name},\n\nHere's a summary of your pricing for DryClean Masters:\n\nServices: ${services}\n\nPricing:\n${pricingText}\n\nPlease confirm this is correct by replying to this email.\n\nThank you,\nDryClean Masters Team`;
      const res = await fetch("/api/custom-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: vendor.email, subject: "Your Pricing Summary — DryClean Masters", body }),
      });
      if (!res.ok) throw new Error("Failed to send email");
      alert("Pricing email sent!");
    } catch (err) { alert((err as Error).message); }
    setPricingEmailVendorId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-slate-950 sm:text-2xl">Vendors</h1>
        <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800">
          <Plus size={16} /> Add Vendor
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="Search name, phone, city…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100">
          <option value="all">All statuses</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">Loading vendors...</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-semibold text-slate-700">No vendors found</p>
          <p className="mt-1 text-sm text-slate-500">Add your first vendor to get started.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              jobCount={jobCounts[vendor.id] || 0}
              expanded={expandedCard === vendor.id}
              onToggle={() => setExpandedCard((v) => (v === vendor.id ? null : vendor.id))}
              onEdit={() => openEdit(vendor)}
              onDelete={() => handleDelete(vendor)}
              onStatusChange={(s) => updateStatus(vendor, s)}
              onSendPricingEmail={() => sendPricingEmail(vendor)}
              emailSending={pricingEmailVendorId === vendor.id}
            />
          ))}
        </div>
      )}

      {addModal && <VendorFormModal title="Add Vendor" form={form} setForm={setForm} onSubmit={handleAdd} onClose={() => setAddModal(false)} saving={saving} toggleService={toggleService} setPriceRow={setPriceRow} />}
      {editModal && <VendorFormModal title="Edit Vendor" form={form} setForm={setForm} onSubmit={handleEdit} onClose={() => { setEditModal(false); setEditingVendor(null); }} saving={saving} toggleService={toggleService} setPriceRow={setPriceRow} />}
    </div>
  );
}

function VendorCard({ vendor, jobCount, expanded, onToggle, onEdit, onDelete, onStatusChange, onSendPricingEmail, emailSending }: {
  vendor: Vendor; jobCount: number; expanded: boolean; onToggle: () => void;
  onEdit: () => void; onDelete: () => void; onStatusChange: (s: string) => void;
  onSendPricingEmail: () => void; emailSending: boolean;
}) {
  const status = vendor.status || "pending";
  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button onClick={onToggle} className="flex w-full items-start justify-between gap-3 p-4 text-left">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate font-bold text-slate-900">{vendor.name || "Unnamed Vendor"}</p>
            <span className={`shrink-0 inline-flex rounded-full border px-2.5 py-0.5 text-xs font-bold capitalize ${statusStyles[status] || statusStyles.pending}`}>{status}</span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-slate-500">
            {vendor.phone && <span className="flex items-center gap-1"><Phone size={11} />{vendor.phone}</span>}
            {vendor.city && <span className="flex items-center gap-1"><MapPin size={11} />{vendor.city}</span>}
          </div>
          {jobCount > 0 && <p className="mt-1 text-xs font-semibold text-teal-700">{jobCount} job{jobCount !== 1 ? "s" : ""} assigned</p>}
        </div>
        <ChevronDown size={16} className={`mt-1 shrink-0 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="space-y-3 border-t border-slate-100 p-4">
          {vendor.email && <a href={`mailto:${vendor.email}`} className="flex items-center gap-2 text-xs text-teal-700 hover:underline"><Mail size={12} />{vendor.email}</a>}
          {vendor.bio && <p className="text-xs text-slate-500">{vendor.bio}</p>}
          {(vendor.services || []).length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Services</p>
              <div className="flex flex-wrap gap-1.5">
                {(vendor.services || []).map((s) => {
                  const label = DCM_SERVICES.find((d) => d.value === s)?.label || s;
                  return <span key={s} className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">{label}</span>;
                })}
              </div>
            </div>
          )}
          {vendor.pricing && Object.keys(vendor.pricing).length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Pricing</p>
              <div className="space-y-2">
                {Object.entries(vendor.pricing).map(([key, rows]) => {
                  if (!rows.length) return null;
                  const label = DCM_SERVICES.find((d) => d.value === key)?.label || key;
                  return (
                    <div key={key}>
                      <p className="text-xs font-semibold text-slate-700">{label}</p>
                      <div className="mt-1 space-y-1">
                        {rows.map((row) => (
                          <div key={row.label} className="flex items-center justify-between text-xs text-slate-600">
                            <span>{row.label}</span>
                            <span className="font-bold text-slate-900">₹ {row.price.toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</p>
            <div className="flex flex-wrap gap-2">
              {["approved", "pending", "rejected"].map((s) => (
                <button key={s} onClick={() => onStatusChange(s)} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition ${vendor.status === s ? "bg-teal-700 text-white" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>
                  {vendor.status === s && <CheckCircle2 size={12} />}{s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-3">
            <button onClick={onEdit} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50">Edit</button>
            <button onClick={onSendPricingEmail} disabled={emailSending || !vendor.email} className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700 hover:bg-teal-100 disabled:cursor-not-allowed disabled:opacity-50">
              <Mail size={12} />{emailSending ? "Sending…" : "Pricing Email"}
            </button>
            <button onClick={onDelete} className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100">Delete</button>
          </div>
        </div>
      )}
    </article>
  );
}

function VendorFormModal({ title, form, setForm, onSubmit, onClose, saving, toggleService, setPriceRow }: {
  title: string; form: VendorFormData; setForm: (f: VendorFormData) => void;
  onSubmit: () => void; onClose: () => void; saving: boolean;
  toggleService: (s: string) => void; setPriceRow: (key: string, label: string, price: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-950/60 p-3 sm:items-center sm:justify-center">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
          <h2 className="text-xl font-bold text-slate-950">{title}</h2>
          <button onClick={onClose} className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50"><X size={18} /></button>
        </div>
        <div className="space-y-5 px-5 py-5 sm:px-6">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Name *</label><input type="text" className={fieldCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Phone *</label><input type="text" className={fieldCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Email</label><input type="email" className={fieldCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">City</label>
            <select className={fieldCls} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
              <option value="">Select city</option>
              {DCM_CITIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Bio / Notes</label><textarea rows={2} className={fieldCls} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Services</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {DCM_SERVICES.map((s) => (
                <label key={s.value} className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${form.services.includes(s.value) ? "border-teal-200 bg-teal-50 text-teal-800" : "border-slate-200 hover:bg-slate-50"}`}>
                  <input type="checkbox" checked={form.services.includes(s.value)} onChange={() => toggleService(s.value)} className="h-3.5 w-3.5 accent-teal-600" />
                  <span className="text-xs font-semibold">{s.label}</span>
                </label>
              ))}
            </div>
          </div>
          {form.services.map((serviceKey) => {
            const schema = PRICING_SCHEMA[serviceKey] || [];
            const serviceLabel = DCM_SERVICES.find((s) => s.value === serviceKey)?.label || serviceKey;
            if (!schema.length) return null;
            return (
              <div key={serviceKey} className="rounded-xl border border-slate-200 p-4">
                <p className="mb-3 text-sm font-bold text-slate-800">{serviceLabel} — Pricing</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {schema.map((row) => (
                    <div key={row.label} className="flex items-center gap-2">
                      <label className="min-w-0 flex-1 text-xs font-semibold text-slate-600">{row.label}</label>
                      <div className="relative w-28 shrink-0">
                        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">₹</span>
                        <input type="number" placeholder="0" value={form.pricing[serviceKey]?.[row.label] || ""} onChange={(e) => setPriceRow(serviceKey, row.label, e.target.value)} className="w-full rounded-lg border border-slate-200 py-2 pl-6 pr-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancel</button>
          <button onClick={onSubmit} disabled={saving} className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? "Saving…" : "Save Vendor"}
          </button>
        </div>
      </div>
    </div>
  );
}
