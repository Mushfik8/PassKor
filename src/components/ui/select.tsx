"use client";

// ================================================================
// StudentOS — Select Component
// Styled native select dropdown with label, error, and icon
// ================================================================

import { forwardRef, type SelectHTMLAttributes, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, icon, id, children, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-[var(--foreground)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
              {icon}
            </div>
          )}
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "flex h-11 w-full appearance-none rounded-lg border bg-[var(--card)] px-3.5 py-2 text-sm transition-all duration-200 cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-[var(--color-destructive)] focus:ring-[var(--color-destructive)]/30"
                : "border-[var(--input)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20",
              icon && "pl-10",
              "pr-10",
              className
            )}
            aria-invalid={!!error}
            {...props}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && (
          <p className="text-xs text-[var(--color-destructive)] mt-1">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
