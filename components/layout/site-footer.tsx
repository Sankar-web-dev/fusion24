import Link from "next/link";
import { Instagram, MapPin, Phone, Mail, Youtube } from "lucide-react";

import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="font-[family-name:var(--font-display)] text-3xl tracking-wide">
              FUSION 24
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/65">
              A premium, performance-first gym built for consistency. Train harder. Recover
              smarter. Become unstoppable.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold tracking-wide text-white">Quick Links</div>
            <div className="mt-4 grid gap-2 text-sm text-white/70">
              <Link className="hover:text-white" href="/memberships">
                Memberships
              </Link>
              <Link className="hover:text-white" href="/trainers">
                Trainers
              </Link>
              <Link className="hover:text-white" href="/gallery">
                Gallery
              </Link>
              <Link className="hover:text-white" href="/contact">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold tracking-wide text-white">Location</div>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <div className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-white/60" />
                <span>Downtown Performance District, City Center</span>
              </div>
              <div className="text-white/60">Open 24/7 • Secure access • Premium amenities</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold tracking-wide text-white">Contact</div>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <div className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-white/60" />
                <span>+1 (555) 240-2424</span>
              </div>
              <div className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-white/60" />
                <span>hello@fusion24.fit</span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="rounded-md border border-white/12 bg-white/5 p-2 text-white/80 transition hover:bg-white/10"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  aria-label="YouTube"
                  className="rounded-md border border-white/12 bg-white/5 p-2 text-white/80 transition hover:bg-white/10"
                >
                  <Youtube className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Separator />
          <div className="mt-6 flex flex-col gap-2 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} FUSION 24. All rights reserved.</div>
            <div className="flex gap-4">
              <Link className="hover:text-white/80" href="#">
                Privacy
              </Link>
              <Link className="hover:text-white/80" href="#">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

