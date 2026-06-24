"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, getIdTokenResult, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase.auth";
import { isAllowedAdminEmail } from "@/lib/allowedAdmins";
import { useRouter } from "next/navigation";

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"checking" | "ok" | "error">("checking");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }

      if (!isAllowedAdminEmail(user.email)) {
        await signOut(auth);
        router.replace("/admin/login");
        return;
      }

      try {
        const tokenResult = await getIdTokenResult(user, true);

        if (!tokenResult.claims.admin) {
          router.replace("/");
          return;
        }

        setStatus("ok");
      } catch (error: unknown) {
        console.error("Admin check failed:", error);

        if ((error as { code?: string })?.code === "auth/network-request-failed") {
          setErrorMsg("Network issue while verifying admin access. Check your connection and retry.");
          setStatus("error");
          return;
        }

        router.replace("/admin/login");
      }
    });

    return () => unsub();
  }, [router]);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex justify-center items-center text-slate-600">
        Verifying Admin Access...
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col gap-4 justify-center items-center px-6 text-center">
        <p className="text-slate-700">{errorMsg}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-teal-700 text-white px-6 py-2 rounded-xl font-bold hover:bg-teal-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
