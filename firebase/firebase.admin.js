
import "server-only";
import admin from "firebase-admin";

// Private keys in env can be single- (\n) or double-escaped (\\n) depending on
// how they were pasted. Normalize both to real newlines, else PEM parsing fails
// with "Invalid PEM formatted message" / UNAUTHENTICATED at request time.
const normalizeKey = (k) =>
  k?.replace(/\\\\n/g, "\n").replace(/\\n/g, "\n");

// DCM app — auth, bookings, all admin operations
if (!admin.apps.find((a) => a.name === "dcm")) {
  admin.initializeApp(
    {
      credential: admin.credential.cert({
        projectId: process.env.DCM_FIREBASE_PROJECT_ID,
        clientEmail: process.env.DCM_FIREBASE_CLIENT_EMAIL,
        privateKey: normalizeKey(process.env.DCM_FIREBASE_PRIVATE_KEY),
      }),
    },
    "dcm"
  );
}

// QCS app — shared BlogSpot content project (blog posts + web stories)
if (!admin.apps.find((a) => a.name === "qcs")) {
  admin.initializeApp(
    {
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: normalizeKey(process.env.FIREBASE_PRIVATE_KEY),
      }),
    },
    "qcs"
  );
}

const dcmApp = admin.app("dcm");
const qcsApp = admin.app("qcs");

export const adminDb = dcmApp.firestore();
export const adminAuth = dcmApp.auth();

export const qcsDb = qcsApp.firestore();
