"use client";

// ================================================================
// StudentOS — Avatar Component
// User avatar with image and fallback initials
// ================================================================

import { forwardRef, type HTMLAttributes, useState } from "react";
import Image from "next/image";
import { cn, getInitials } from "@/lib/utils";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = "Avatar", name = "", size = "md", ...props }, ref) => {
    const [imageError, setImageError] = useState(false);
    const initials = name ? getInitials(name) : "?";

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold select-none",
          "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-sm",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="64px"
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
