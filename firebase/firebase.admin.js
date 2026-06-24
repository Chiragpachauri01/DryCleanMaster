
import "server-only";
import admin from "firebase-admin";

// DCM app — auth, bookings, all admin operations
if (!admin.apps.find((a) => a.name === "dcm")) {
  admin.initializeApp(
    {
      credential: admin.credential.cert({
        projectId: process.env.DCM_FIREBASE_PROJECT_ID,
        clientEmail: process.env.DCM_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.DCM_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    },
    "dcm"
  );
}

// QCS app — blog posts only
if (!admin.apps.find((a) => a.name === "qcs")) {
  admin.initializeApp(
    {
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
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
