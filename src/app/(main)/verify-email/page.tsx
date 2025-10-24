import type { Metadata } from "next";
import { ResendVerificationButton } from "./resend-verification-button";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default function VerifyEmailPage() {
  // TODO: Redirect user if not authenticated or already verified

  return (
    <main className="flex flex-1 items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Verify your email</h1>
          <p className="text-muted-foreground">
            A verification email was sent to your inbox.
          </p>
        </div>
        <ResendVerificationButton email="john.doe@example.com" />
      </div>
    </main>
  );
}
