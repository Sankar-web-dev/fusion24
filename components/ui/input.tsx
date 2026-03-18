import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur transition focus:border-white/25 focus:ring-2 focus:ring-[var(--neon)] focus:ring-offset-2 focus:ring-offset-[color:var(--background)]",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

