import { Suspense } from "react";
import AdminShell from "@/components/admin/AdminShell";
import CustomEmail from "@/components/admin/CustomEmail";

export default function EmailPage() {
  return (
    <AdminShell>
      <Suspense fallback={<div className="py-8 text-center text-sm text-slate-500">Loading…</div>}>
        <CustomEmail />
      </Suspense>
    </AdminShell>
  );
}
