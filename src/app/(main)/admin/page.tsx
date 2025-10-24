import type { Metadata } from "next";
import { DeleteApplication } from "./delete-application";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPage() {
  // TODO: Check for admin role

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="text-muted-foreground">
            You have administrator access.
          </p>
        </div>
        <DeleteApplication />
      </div>
    </main>
  );
}
