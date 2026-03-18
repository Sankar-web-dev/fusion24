"use client";

import Link from "next/link";
import * as React from "react";
import { Menu, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/hooks/use-session";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/memberships", label: "Memberships" },
  { href: "/trainers", label: "Trainers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteNavbar() {
  const [open, setOpen] = React.useState(false);
  const { session } = useSession();

  async function signOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-white">
            FUSION 24
          </span>
          <span className="hidden text-xs font-semibold tracking-[0.2em] text-white/50 md:inline">
            PERFORMANCE CLUB
          </span>
          <span className="ml-2 hidden h-[6px] w-[6px] rounded-full bg-[var(--neon)] shadow-[0_0_18px_rgba(43,107,255,0.8)] md:inline-block" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold tracking-wide text-white/70 transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button asChild variant="neon" size="sm" className="neon-ring">
              <Link href="/memberships">Join Now</Link>
            </Button>
          </div>

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Account">
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Member Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin">Admin</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-white/10 bg-black/40 backdrop-blur-xl transition-[max-height,opacity] duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container-px mx-auto flex max-w-7xl flex-col gap-4 py-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold tracking-wide text-white/75"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            <Button asChild variant="neon" className="w-full neon-ring">
              <Link href="/memberships" onClick={() => setOpen(false)}>
                Join Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

