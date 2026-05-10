"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeSwitcherButton } from "@/components/ThemeSwitcherButton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Your Profile", href: "/profile" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthed, firstName, logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <header className="border-b bg-background">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-4 px-6">
        <div className="flex items-center gap-10">
          {navItems.map((item) => {
            if (!isAuthed && item.href === "/profile") return null;

            return (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "text-lg font-medium text-muted-foreground transition-colors hover:text-foreground",
                    isActive(item.href) && "text-foreground"
                  )}
                >
                  {item.label}
                </Link>

                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-blue-400" />
                )}
              </div>
            );
          })}

          {isAuthed && (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-1 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground outline-none",
                  (pathname.startsWith("/classes") ||
                    pathname.startsWith("/program-of-study")) &&
                    "text-foreground"
                )}
              >
                Classes
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem asChild>
                  <Link href="/classes" className="cursor-pointer">
                    Class Search
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/program-of-study" className="cursor-pointer">
                    Program of Study
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthed && firstName ? (
            <>
              <span className="text-sm font-medium">
                Welcome, {firstName}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-md border border-blue-500 bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600"
              >
                Sign up
              </Link>
            </>
          )}

          <ThemeSwitcherButton />
        </div>
      </nav>
    </header>
  );
}