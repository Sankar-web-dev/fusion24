import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <div className="text-xs font-semibold tracking-[0.28em] text-white/60">{eyebrow}</div>
      ) : null}
      <div className="mt-3 text-balance font-[family-name:var(--font-display)] text-5xl leading-[0.92] tracking-wide md:text-6xl">
        {title}
      </div>
      {description ? (
        <p className="mt-5 text-balance text-sm leading-relaxed text-white/70 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

