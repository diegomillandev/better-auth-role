import betterAuthLogo from "@/assets/better_auth_logo.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-8 flex items-center justify-center gap-4">
          <Image
            src={betterAuthLogo}
            alt="Better Auth logo"
            width={80}
            height={80}
            className="border-muted rounded-full border"
          />
        </div>
        <h1 className="text-3xl font-semibold sm:text-4xl">Better-Auth</h1>
        <p className="text-muted-foreground mt-4 text-lg sm:text-xl">
          Secure and Seamless Authentication for Your Applications
        </p>
        <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
