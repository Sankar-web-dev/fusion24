import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--neon)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-white/90 shadow-[0_10px_35px_rgba(0,0,0,0.45)]",
        neon:
          "bg-[linear-gradient(135deg,var(--neon),var(--neon-2))] text-white hover:opacity-95 shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_18px_60px_rgba(43,107,255,0.25)]",
        outline:
          "border border-white/15 bg-white/5 text-white hover:bg-white/10 backdrop-blur",
        ghost: "text-white hover:bg-white/10",
        destructive:
          "bg-[linear-gradient(135deg,var(--danger),#ff6b2b)] text-white hover:opacity-95",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-10 rounded-md px-4",
        lg: "h-12 rounded-md px-7 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };

