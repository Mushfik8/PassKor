"use client";

// ================================================================
// StudentOS — Progress Component
// Progress bar with customizable height, gradient fill, and animation
// ================================================================

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  showValue?: boolean;
  variant?: "default" | "gradient" | "success" | "warning" | "destructive";
}

const variantStyles = {
  default: "bg-[var(--color-primary)]",
  gradient: "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]",
  success: "bg-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]",
  destructive: "bg-[var(--color-destructive)]",
};

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, showValue = false, variant = "gradient", ...props }, ref) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

    return (
      <div className="w-full space-y-1">
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            "relative h-2 w-full overflow-hidden rounded-full bg-[var(--secondary)]",
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              variantStyles[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <div className="flex justify-end">
            <span className="text-xs font-medium text-[var(--muted-foreground)]">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
