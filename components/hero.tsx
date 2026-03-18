"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2600&q=80";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Premium gym training"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[radial-gradient(800px_420px_at_20%_12%,rgba(43,107,255,0.35),transparent_60%),linear-gradient(to_top,rgba(0,0,0,0.92),rgba(0,0,0,0.38),rgba(0,0,0,0.7))]" />
      <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_45%_15%,black,transparent_62%)] opacity-70">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container-px relative mx-auto flex max-w-7xl items-center pt-24">
        <div className="w-full max-w-3xl pb-16">
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.21, 0.96] }}
          >
            <Badge variant="neon" className="inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              24/7 premium access • elite coaching • modern equipment
            </Badge>

            <div className="mt-7 font-[family-name:var(--font-display)] text-[64px] leading-[0.9] tracking-wide text-white sm:text-[86px] md:text-[104px]">
              FUSION 24
            </div>
            <div className="mt-2 text-balance text-2xl font-semibold tracking-tight text-white/90 sm:text-3xl">
              UNLEASH YOUR STRENGTH
            </div>

            <p className="mt-6 max-w-2xl text-balance text-sm leading-relaxed text-white/70 sm:text-base">
              A cinematic training experience built for athletes, creators, and anyone obsessed
              with progress. Minimal noise. Maximum performance.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="neon" size="lg" className="neon-ring">
                <Link href="/memberships">
                  Join Now <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/memberships">View Memberships</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="mt-12 flex items-center gap-6 text-xs font-semibold tracking-[0.22em] text-white/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--neon)] shadow-[0_0_16px_rgba(43,107,255,0.9)]" />
              SCROLL
            </div>
            <motion.div
              className="h-px flex-1 bg-white/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.85, duration: 0.9 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

