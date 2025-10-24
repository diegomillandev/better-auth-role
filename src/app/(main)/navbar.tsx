import better_auth_logo from "@/assets/better_auth_logo.png";
import { ModeToggle } from "@/components/mode-toggle";
import { UserDropdown } from "@/components/user-dropdown";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  // TODO: Display logged-in user

  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <Image
            src={better_auth_logo}
            alt="Coding in Flow logo"
            width={32}
            height={32}
            className="border-muted rounded-full border"
          />
          Better-Auth
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
