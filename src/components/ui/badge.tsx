// ================================================================
// StudentOS — Badge Component
// Status badges with variants
// ================================================================

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
        secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
        success: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
        warning: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
        destructive: "bg-[var(--color-destructive)]/10 text-[var(--color-destructive)]",
        info: "bg-[var(--color-info)]/10 text-[var(--color-info)]",
        outline: "border border-[var(--border)] text-[var(--muted-foreground)]",
        gradient:
          "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
