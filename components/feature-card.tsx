"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FeatureCard({
  icon,
  title,
  description,
  accent = "blue",
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent?: "blue" | "red" | "purple";
  delay?: number;
}) {
  const glow =
    accent === "red"
      ? "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_70px_rgba(255,43,43,0.10)]"
      : accent === "purple"
        ? "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_70px_rgba(168,85,247,0.12)]"
        : "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_70px_rgba(43,107,255,0.12)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.21, 0.96], delay }}
    >
      <Card className={cn("group h-full rounded-2xl transition", glow)}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="rounded-xl border border-white/12 bg-white/5 p-3 text-white/90 backdrop-blur transition group-hover:bg-white/10">
              {icon}
            </div>
            <div className="h-[10px] w-[10px] rounded-full bg-white/15" />
          </div>
          <CardTitle className="mt-4 text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-white/70">
          {description}
        </CardContent>
      </Card>
    </motion.div>
  );
}

