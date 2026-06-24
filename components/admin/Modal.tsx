"use client";

import { useState } from "react";
import { ChevronDown, Minus, X } from "lucide-react";

const fieldCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-colors";

interface FormData {
  finalDate: string;
  finalTime: string;
  baseAmount: string | number;
  advancePaid: string | number;
  exactLocation: string;
  addOns: { name: string; price: string | number }[];
  vendorPay: string | number;
  vendorPayBreakdown: { label: string; qty: number; subtotal: number }[];
  jobExpense: string | number;
  discountType: string;
  discountValue: string | number;
}

interface Booking {
  id: string;
  name?: string;
  serviceLabel?: string;
  service?: string;
  assignedVendorId?: string;
  advancePaid?: number;
  vendorPay?: number;
  vendorPayBreakdown?: { label: string; qty: number; subtotal: number }[];
  [key: string]: unknown;
}

interface Vendor {
  pricing?: Record<string, { label: string; price: number }[]>;
  [key: string]: unknown;
}

export function Modal({
  title,
  formData,
  setFormData,
  onSubmit,
  onClose,
  booking,
  vendor,
}: {
  title: string;
  formData: FormData;
  setFormData: (v: FormData) => void;
  onSubmit: () => void;
  onClose: () => void;
  booking?: Booking;
  vendor?: Vendor;
}) {
  const isConfirmMode = title === "Confirm Booking";
  const isCompleteMode = title === "Complete Booking";

  const isVendorAssigned = !!booking?.assignedVendorId;
  const isVendorJob = isVendorAssigned && isCompleteMode;

  const addOns = formData.addOns || [{ name: "", price: "" }];
  const validAddOns = addOns.filter((a) => a.name?.trim() && String(a.price) !== "");
  const addOnsSum = validAddOns.reduce((sum, a) => sum + Number(a.price || 0), 0);
  const grossAmount = Number(formData.baseAmount || 0) + addOnsSum;
  const discountType = formData.discountType || "flat";
  const rawDiscount = Number(formData.discountValue || 0);
  const discountAmount =
    discountType === "percent"
      ? Math.round((grossAmount * Math.min(Math.max(rawDiscount, 0), 100)) / 100)
      : Math.min(Math.max(rawDiscount, 0), grossAmount);
  const discountOverflow =
    String(formData.discountValue || "") !== "" &&
    (discountType === "percent" ? rawDiscount > 100 : rawDiscount > grossAmount && grossAmount > 0);
  const totalAmount = Math.max(0, grossAmount - discountAmount);
  const advancePaid = Number(formData.advancePaid || 0);
  const pendingAmount = totalAmount - advancePaid;
  const advanceOverflow = advancePaid > totalAmount && !!formData.baseAmount;
  const vendorPay = isVendorJob ? Number(formData.vendorPay || 0) : 0;
  const additionalExpense = Number(formData.jobExpense || 0);
  const totalJobExpense = isVendorJob ? vendorPay + additionalExpense : additionalExpense;
  const netProfit = totalAmount - totalJobExpense;

  const canSubmit = isCompleteMode
    ? !discountOverflow
    : formData.finalDate &&
      formData.finalTime &&
      !discountOverflow &&
      (!isConfirmMode ||
        (formData.baseAmount &&
          formData.advancePaid !== "" &&
          formData.exactLocation &&
          !advanceOverflow));

  const resetForm = () => {
    setFormData({
      finalDate: "",
      finalTime: "",
      baseAmount: "",
      advancePaid: "",
      exactLocation: "",
      addOns: [{ name: "", price: "" }],
      vendorPay: "",
      vendorPayBreakdown: [],
      jobExpense: "",
      discountType: "flat",
      discountValue: "",
    });
    onClose();
  };

  const handleAddOnChange = (index: number, field: string, value: string) => {
    const updated = [...addOns];
    updated[index] = { ...updated[index], [field]: value };
    const last = updated[updated.length - 1];
    if (last.name?.trim() && String(last.price) !== "") {
      updated.push({ name: "", price: "" });
    }
    setFormData({ ...formData, addOns: updated });
  };

  const removeAddOn = (index: number) => {
    const updated = addOns.filter((_, i) => i !== index);
    setFormData({ ...formData, addOns: updated.length ? updated : [{ name: "", price: "" }] });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-950/60 p-3 sm:items-center sm:justify-center">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">Booking update</p>
            <h2 className="mt-0.5 text-xl font-bold text-slate-950">{title}</h2>
            {booking && (
              <p className="mt-0.5 text-sm text-slate-500">
                {booking.name}{booking.serviceLabel ? ` · ${booking.serviceLabel}` : ""}
              </p>
            )}
          </div>
          <button onClick={resetForm} className="flex-shrink-0 rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 px-5 py-5 sm:px-6">

          {!isCompleteMode && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Final Date</label>
                <input
                  type="date"
                  className={fieldCls}
                  value={formData.finalDate}
                  onChange={(e) => setFormData({ ...formData, finalDate: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Final Time</label>
                <input
                  type="time"
                  className={fieldCls}
                  value={formData.finalTime}
                  onChange={(e) => setFormData({ ...formData, finalTime: e.target.value })}
                />
              </div>
            </div>
          )}

          {(isConfirmMode || isCompleteMode) && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Base Service Price</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₹</span>
                    <input type="number" placeholder="0" className={`${fieldCls} pl-7`} value={formData.baseAmount} onChange={(e) => setFormData({ ...formData, baseAmount: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Advance Paid</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₹</span>
                    <input type="number" placeholder="0" className={`${fieldCls} pl-7`} value={formData.advancePaid} onChange={(e) => setFormData({ ...formData, advancePaid: e.target.value })} />
                  </div>
                </div>
              </div>

              {isConfirmMode && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Exact Location</label>
                  <input type="text" placeholder="Full address / landmark" className={fieldCls} value={formData.exactLocation} onChange={(e) => setFormData({ ...formData, exactLocation: e.target.value })} />
                </div>
              )}

              {isConfirmMode && isVendorAssigned && (
                <div className="space-y-3 rounded-xl border border-teal-100 bg-teal-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                    Vendor Payment <span className="font-normal normal-case text-teal-500">(optional)</span>
                  </p>
                  {vendor?.pricing && Object.keys(vendor.pricing).length > 0 && (
                    <VendorPayCalculator
                      pricing={vendor.pricing}
                      onApply={(total, breakdown) => setFormData({ ...formData, vendorPay: total, vendorPayBreakdown: breakdown })}
                    />
                  )}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Agreed Vendor Pay</label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₹</span>
                      <input type="number" placeholder="0" className={`${fieldCls} pl-7`} value={formData.vendorPay ?? ""} onChange={(e) => setFormData({ ...formData, vendorPay: e.target.value })} />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {isCompleteMode && (
            <div className="space-y-3">
              {isVendorJob && vendor?.pricing && Object.keys(vendor.pricing).length > 0 && (
                <VendorPayCalculator
                  pricing={vendor.pricing}
                  onApply={(total, breakdown) => setFormData({ ...formData, vendorPay: total, vendorPayBreakdown: breakdown })}
                />
              )}
              {isVendorJob && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Vendor Pay <span className="font-normal normal-case text-slate-400">(amount you pay the vendor)</span>
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₹</span>
                    <input type="number" placeholder="0" className={`${fieldCls} pl-7`} value={formData.vendorPay ?? ""} onChange={(e) => setFormData({ ...formData, vendorPay: e.target.value })} />
                  </div>
                </div>
              )}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {isVendorJob ? "Additional Expense" : "Job Expense"}{" "}
                  <span className="font-normal normal-case text-slate-400">(supplies, travel, machine costs…)</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₹</span>
                  <input type="number" placeholder="0" className={`${fieldCls} pl-7`} value={formData.jobExpense ?? ""} onChange={(e) => setFormData({ ...formData, jobExpense: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {(isConfirmMode || isCompleteMode) && (
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Add-on Services <span className="font-normal normal-case text-slate-400">(optional)</span>
              </label>
              <div className="space-y-2">
                {addOns.map((addOn, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Carpet Cleaning"
                      value={addOn.name}
                      onChange={(e) => handleAddOnChange(index, "name", e.target.value)}
                      className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-colors"
                    />
                    <div className="relative w-28 flex-shrink-0">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₹</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={addOn.price}
                        onChange={(e) => handleAddOnChange(index, "price", e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white pl-7 pr-2 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-colors"
                      />
                    </div>
                    {(addOn.name || addOn.price) && (
                      <button type="button" onClick={() => removeAddOn(index)} className="flex-shrink-0 rounded-lg border border-slate-200 p-2 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500">
                        <Minus size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-slate-400">Fill both fields — next row appears automatically.</p>
            </div>
          )}

          {(isConfirmMode || isCompleteMode) && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Discount <span className="font-normal normal-case text-slate-400">(optional)</span>
              </label>
              <div className="flex items-stretch gap-2">
                <div className="inline-flex flex-shrink-0 rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-sm font-semibold">
                  <button type="button" onClick={() => setFormData({ ...formData, discountType: "flat" })} className={`rounded-md px-3 py-1.5 transition-colors ${discountType === "flat" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>₹ Flat</button>
                  <button type="button" onClick={() => setFormData({ ...formData, discountType: "percent" })} className={`rounded-md px-3 py-1.5 transition-colors ${discountType === "percent" ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>% Percent</button>
                </div>
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">{discountType === "percent" ? "%" : "₹"}</span>
                  <input type="number" min="0" max={discountType === "percent" ? 100 : undefined} placeholder="0" className={`${fieldCls} pl-7`} value={formData.discountValue ?? ""} onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })} />
                </div>
              </div>
              {discountOverflow && (
                <p className="mt-1.5 text-xs font-semibold text-red-600">
                  {discountType === "percent" ? "Discount cannot exceed 100%." : "Discount cannot exceed the gross total."}
                </p>
              )}
            </div>
          )}

          {(isConfirmMode || isCompleteMode) && (
            <div className="overflow-hidden rounded-xl border border-slate-200 text-sm">
              <div className="flex items-center justify-between bg-slate-50 px-4 py-2.5">
                <span className="text-slate-500">Base Service</span>
                <span className="font-medium text-slate-800">₹ {Number(formData.baseAmount || 0).toLocaleString("en-IN")}</span>
              </div>
              {addOnsSum > 0 && (
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5">
                  <span className="text-slate-500">Add-ons ({validAddOns.length})</span>
                  <span className="font-medium text-slate-800">+ ₹ {addOnsSum.toLocaleString("en-IN")}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex items-center justify-between border-t border-slate-100 bg-amber-50 px-4 py-2.5">
                  <span className="text-amber-700">Discount{discountType === "percent" ? ` (${Math.min(Math.max(rawDiscount, 0), 100)}%)` : ""}</span>
                  <span className="font-medium text-amber-700">− ₹ {discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-2.5">
                <span className="font-semibold text-slate-700">Total</span>
                <span className="font-bold text-slate-900">₹ {totalAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5">
                <span className="text-slate-500">Advance Paid</span>
                <span className="font-medium text-slate-800">− ₹ {advancePaid.toLocaleString("en-IN")}</span>
              </div>
              <div className={`flex items-center justify-between border-t px-4 py-3 ${advanceOverflow ? "border-red-100 bg-red-50" : "border-teal-100 bg-teal-50"}`}>
                <span className={`font-bold ${advanceOverflow ? "text-red-700" : "text-teal-700"}`}>
                  {isCompleteMode ? "Pending (clears to ₹0)" : "Pending Amount"}
                </span>
                <span className={`font-bold ${advanceOverflow ? "text-red-700" : "text-teal-700"}`}>
                  ₹ {Math.max(0, pendingAmount).toLocaleString("en-IN")}
                </span>
              </div>
              {advanceOverflow && (
                <p className="border-t border-red-100 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600">
                  Advance cannot exceed total amount.
                </p>
              )}
              {isCompleteMode && totalJobExpense > 0 && (
                <>
                  {isVendorJob && vendorPay > 0 && (
                    <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5">
                      <span className="text-slate-500">Vendor Pay</span>
                      <span className="font-medium text-rose-600">− ₹ {vendorPay.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {additionalExpense > 0 && (
                    <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5">
                      <span className="text-slate-500">{isVendorJob ? "Additional Expense" : "Job Expense"}</span>
                      <span className="font-medium text-rose-600">− ₹ {additionalExpense.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className={`flex items-center justify-between border-t px-4 py-3 ${netProfit >= 0 ? "border-violet-100 bg-violet-50" : "border-red-100 bg-red-50"}`}>
                    <span className={`font-bold ${netProfit >= 0 ? "text-violet-700" : "text-red-700"}`}>Net Profit</span>
                    <span className={`font-bold ${netProfit >= 0 ? "text-violet-700" : "text-red-700"}`}>
                      ₹ {netProfit.toLocaleString("en-IN")}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button onClick={resetForm} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button
            disabled={!canSubmit}
            onClick={onSubmit}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-colors ${
              canSubmit ? "bg-teal-700 hover:bg-teal-800" : "cursor-not-allowed bg-slate-300"
            }`}
          >
            {isCompleteMode ? "Mark as Completed" : "Save & Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

function VendorPayCalculator({
  pricing,
  onApply,
}: {
  pricing: Record<string, { label: string; price: number }[]>;
  onApply: (total: number, breakdown: { label: string; qty: number; subtotal: number }[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number[]>>(() => {
    const init: Record<string, number[]> = {};
    for (const [cat, rates] of Object.entries(pricing)) {
      init[cat] = rates.map(() => 0);
    }
    return init;
  });

  const total = Object.entries(pricing).reduce(
    (sum, [cat, rates]) =>
      sum + rates.reduce((s, rate, i) => s + rate.price * (quantities[cat]?.[i] || 0), 0),
    0
  );

  const getBreakdown = () =>
    Object.entries(pricing).flatMap(([cat, rates]) =>
      rates
        .map((rate, i) => ({ label: rate.label, price: rate.price, qty: quantities[cat]?.[i] || 0, subtotal: rate.price * (quantities[cat]?.[i] || 0) }))
        .filter((item) => item.qty > 0)
    );

  const setQty = (cat: string, idx: number, val: string) => {
    setQuantities((prev) => ({
      ...prev,
      [cat]: prev[cat].map((q, i) => (i === idx ? Math.max(0, Number(val) || 0) : q)),
    }));
  };

  return (
    <div className="overflow-hidden rounded-xl border border-teal-200 bg-teal-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-teal-800 hover:bg-teal-100"
      >
        <span>Vendor Pay Calculator</span>
        <div className="flex items-center gap-2">
          {total > 0 && <span className="text-xs font-bold text-teal-700">₹ {total.toLocaleString("en-IN")}</span>}
          <ChevronDown size={15} className={`text-teal-500 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      {open && (
        <div className="space-y-4 border-t border-teal-200 bg-white p-4">
          {Object.entries(pricing).map(([cat, rates]) => (
            <div key={cat}>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">{cat}</p>
              <div className="space-y-1.5">
                {rates.map((rate, i) => {
                  const qty = quantities[cat]?.[i] || 0;
                  const subtotal = rate.price * qty;
                  return (
                    <div key={rate.label} className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm">
                      <span className="min-w-0 flex-1 truncate text-slate-600">{rate.label}</span>
                      <span className="flex-shrink-0 text-xs text-slate-400">₹{Number(rate.price).toLocaleString("en-IN")} ×</span>
                      <input type="number" min="0" value={qty || ""} placeholder="0" onChange={(e) => setQty(cat, i, e.target.value)} className="w-14 flex-shrink-0 rounded-md border border-slate-200 bg-white px-2 py-1 text-center text-sm outline-none focus:border-teal-500" />
                      {subtotal > 0 && <span className="w-16 flex-shrink-0 text-right text-xs font-semibold text-slate-700">₹{subtotal.toLocaleString("en-IN")}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {total > 0 && (
            <div className="flex items-center justify-between rounded-xl bg-teal-50 px-4 py-3">
              <span className="text-sm font-bold text-teal-800">Total Vendor Pay</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-teal-800">₹ {total.toLocaleString("en-IN")}</span>
                <button type="button" onClick={() => onApply(total, getBreakdown())} className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-800">Apply</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
