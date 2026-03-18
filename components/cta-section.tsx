"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="container-px mx-auto max-w-7xl py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.21, 0.47, 0.21, 0.96] }}
        className="relative overflow-hidden rounded-3xl border border-white/12 bg-[linear-gradient(135deg,rgba(43,107,255,0.20),rgba(168,85,247,0.12),rgba(255,43,43,0.10))] p-10 shadow-[0_40px_140px_rgba(0,0,0,0.75)] backdrop-blur-xl md:p-14"
      >
        <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_35%_30%,black,transparent_60%)]">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <div className="relative">
          <div className="text-xs font-semibold tracking-[0.28em] text-white/70">
            READY TO TRANSFORM YOUR BODY?
          </div>
          <div className="mt-3 text-balance font-[family-name:var(--font-display)] text-5xl leading-[0.92] tracking-wide md:text-6xl">
            Join Fusion 24 Today.
          </div>
          <p className="mt-5 max-w-2xl text-sm text-white/70 md:text-base">
            Premium facilities. Coaches who care. A system built for consistency—so your results
            become inevitable.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="neon" size="lg" className="neon-ring">
              <Link href="/memberships">
                Join Now <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Talk to a Coach</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

