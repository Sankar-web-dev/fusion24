"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PricingCard({
  name,
  price,
  tagline,
  features,
  highlight = false,
  delay = 0,
}: {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.21, 0.96], delay }}
      className={cn(highlight && "md:-translate-y-3")}
    >
      <Card
        className={cn(
          "relative h-full overflow-hidden",
          highlight &&
            "glass-strong neon-ring border-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_40px_140px_rgba(0,0,0,0.8)]"
        )}
      >
        {highlight && (
          <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--neon),var(--neon-2))]" />
        )}
        <CardHeader>
          <CardTitle className="flex items-baseline justify-between">
            <span className="text-2xl">{name}</span>
            {highlight ? (
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/85">
                Most Popular
              </span>
            ) : null}
          </CardTitle>
          <div className="mt-5">
            <div className="text-5xl font-semibold tracking-tight">
              {price}
              <span className="ml-1 text-base font-semibold text-white/55">/mo</span>
            </div>
            <div className="mt-2 text-sm text-white/65">{tagline}</div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-white/72">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white/90">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild variant={highlight ? "neon" : "outline"} className="w-full neon-ring">
            <Link href="/login">Get Started</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

