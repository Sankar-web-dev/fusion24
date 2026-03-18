import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur",
  {
    variants: {
      variant: {
        default: "",
        neon: "border-white/15 bg-[rgba(43,107,255,0.18)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_24px_rgba(43,107,255,0.22)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

