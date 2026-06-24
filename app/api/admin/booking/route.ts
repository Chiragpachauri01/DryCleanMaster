import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/firebase/firebase.admin";

async function verifyAdmin(req: NextRequest) {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) throw new Error("Missing token");
  const token = auth.slice(7);
  const decoded = await adminAuth.verifyIdToken(token);
  if (!decoded.admin) throw new Error("Not an admin");
  return decoded;
}

export async function POST(req: NextRequest) {
  try {
    await verifyAdmin(req);
    const body = await req.json();
    const { name, phone, email, service, serviceLabel, city, cityLabel, preferredDate, preferredTime, details, status, totalAmount, baseAmount, advancePaid, pendingAmount, vendorPay, jobExpense, jobProfit, finalDate, finalTime, exactLocation, addOns, discountType, discountValue, discountAmount } = body;
    if (!name || !phone) return NextResponse.json({ error: "Name and phone required" }, { status: 400 });
    const ref = await adminDb.collection("bookings").add({
      name, phone, email: email || "",
      service: service || "", serviceLabel: serviceLabel || "",
      city: city || "", cityLabel: cityLabel || "",
      preferredDate: preferredDate || "", preferredTime: preferredTime || "",
      details: details || "", status: status || "New",
      ...(totalAmount !== undefined && { totalAmount }),
      ...(baseAmount !== undefined && { baseAmount }),
      ...(advancePaid !== undefined && { advancePaid }),
      ...(pendingAmount !== undefined && { pendingAmount }),
      ...(vendorPay !== undefined && { vendorPay }),
      ...(jobExpense !== undefined && { jobExpense }),
      ...(jobProfit !== undefined && { jobProfit }),
      ...(finalDate && { finalDate }),
      ...(finalTime && { finalTime }),
      ...(exactLocation && { exactLocation }),
      ...(addOns && { addOns }),
      ...(discountType && { discountType }),
      ...(discountValue !== undefined && { discountValue }),
      ...(discountAmount !== undefined && { discountAmount }),
      createdAt: new Date(),
    });
    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch (err) {
    const message = (err as Error).message || "Unauthorized";
    return NextResponse.json({ error: message }, { status: message === "Not an admin" ? 403 : 401 });
  }
}
