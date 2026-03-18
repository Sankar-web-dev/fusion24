import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full resize-none rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur transition focus:border-white/25 focus:ring-2 focus:ring-[var(--neon)] focus:ring-offset-2 focus:ring-offset-[color:var(--background)]",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

