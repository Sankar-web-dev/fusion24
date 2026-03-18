"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const base: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={base}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.21, 0.96], delay }}
    >
      {children}
    </motion.div>
  );
}

