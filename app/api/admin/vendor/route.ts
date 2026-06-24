import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/firebase/firebase.admin";

async function verifyAdmin(req: NextRequest) {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) throw new Error("Missing token");
  const decoded = await adminAuth.verifyIdToken(auth.slice(7));
  if (!decoded.admin) throw new Error("Not an admin");
  return decoded;
}

export async function POST(req: NextRequest) {
  try {
    await verifyAdmin(req);
    const { name, phone, email, city, bio, services, pricing } = await req.json();
    if (!name || !phone) return NextResponse.json({ error: "Name and phone required" }, { status: 400 });
    const ref = await adminDb.collection("vendors").add({
      name, phone, email: email || "", city: city || "", bio: bio || "",
      services: services || [], pricing: pricing || {},
      status: "pending", createdAt: new Date(),
    });
    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch (err) {
    const message = (err as Error).message || "Unauthorized";
    return NextResponse.json({ error: message }, { status: message === "Not an admin" ? 403 : 401 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await verifyAdmin(req);
    const { id, ...updates } = await req.json();
    if (!id) return NextResponse.json({ error: "Vendor ID required" }, { status: 400 });
    await adminDb.collection("vendors").doc(id).update({ ...updates, updatedAt: new Date() });
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = (err as Error).message || "Unauthorized";
    return NextResponse.json({ error: message }, { status: message === "Not an admin" ? 403 : 401 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await verifyAdmin(req);
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Vendor ID required" }, { status: 400 });
    await adminDb.collection("vendors").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = (err as Error).message || "Unauthorized";
    return NextResponse.json({ error: message }, { status: message === "Not an admin" ? 403 : 401 });
  }
}
