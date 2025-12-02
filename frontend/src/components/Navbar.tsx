"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeSwitcherButton } from "@/components/ThemeSwitcherButton"; // ✅ import your theme toggle

const navItems = [
  { label: "Home", href: "/" },
  { label: "Your Profile", href: "/profile" },
  { label: "Classes", href: "/classes" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b bg-background">
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-4 px-6">
        {/* Left side: nav links */}
        <div className="flex items-center gap-10">
          {navItems.map((item) => (
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
          ))}
        </div>

        {/* Right side: theme toggle */}
        <div className="flex items-center">
          <ThemeSwitcherButton />
        </div>
      </nav>
    </header>
  );
}
