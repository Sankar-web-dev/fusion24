"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TrainerCard({
  name,
  specialty,
  image,
  bio,
  delay = 0,
}: {
  name: string;
  specialty: string;
  image: string;
  bio?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.21, 0.96], delay }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={image}
            alt={`${name} trainer`}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),rgba(0,0,0,0.05),rgba(0,0,0,0.2))]" />
        </div>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-baseline justify-between gap-3">
            <span className="text-xl">{name}</span>
            <span className="text-xs font-semibold tracking-[0.18em] text-white/55">
              {specialty}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-4 pb-6">
          {bio ? <p className="text-sm leading-relaxed text-white/70">{bio}</p> : null}
          <div className="mt-auto flex gap-2">
            <Link
              href="#"
              className="rounded-md border border-white/12 bg-white/5 p-2 text-white/75 transition hover:bg-white/10 hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="rounded-md border border-white/12 bg-white/5 p-2 text-white/75 transition hover:bg-white/10 hover:text-white"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

