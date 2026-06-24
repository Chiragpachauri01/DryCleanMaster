import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/firebase/firebase.admin";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-admin-setup-secret");
    if (!process.env.ADMIN_SETUP_SECRET || secret !== process.env.ADMIN_SETUP_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { uid, email, password, admin: makeAdmin = true } = await req.json();
    if (!uid && !email) {
      return NextResponse.json({ error: "Provide either uid or email" }, { status: 400 });
    }

    let userRecord;
    try {
      userRecord = uid ? await adminAuth.getUser(uid) : await adminAuth.getUserByEmail(email);
    } catch (lookupErr: unknown) {
      if ((lookupErr as { code?: string }).code === "auth/user-not-found" && email && password) {
        userRecord = await adminAuth.createUser({ email, password });
      } else {
        throw lookupErr;
      }
    }

    await adminAuth.setCustomUserClaims(userRecord.uid, {
      ...(userRecord.customClaims || {}),
      admin: Boolean(makeAdmin),
    });

    return NextResponse.json({
      success: true,
      uid: userRecord.uid,
      email: userRecord.email,
      admin: Boolean(makeAdmin),
    });
  } catch (err) {
    console.error("[set-admin-claim]", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
