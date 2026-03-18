"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function GalleryGrid({
  images,
  className,
}: {
  images: { src: string; alt: string }[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 md:grid-cols-3", className)}>
      {images.map((img, idx) => (
        <motion.div
          key={img.src}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: idx * 0.04 }}
          className={cn(
            "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5",
            idx % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
          )}
        >
          <div className="relative aspect-square md:aspect-[4/3] h-full w-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition duration-700 group-hover:scale-[1.06]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent_45%,rgba(0,0,0,0.25))] opacity-90 transition group-hover:opacity-100" />
        </motion.div>
      ))}
    </div>
  );
}

