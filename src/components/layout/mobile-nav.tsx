"use client";

// ================================================================
// StudentOS — Mobile Bottom Navigation
// Fixed bottom nav bar for mobile screens
// ================================================================

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Users,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOBILE_NAV } from "@/lib/constants";

const mobileIconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  BookOpen,
  Brain,
  Users,
  User,
};

export function MobileNav() {
  const pathname = usePathname();
  const t = useTranslations();
  const cleanPath = pathname.replace(/^\/(en|bn)/, "") || "/dashboard";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] flex h-16 items-center justify-around border-t border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-md lg:hidden">
      {MOBILE_NAV.map((item) => {
        const Icon = mobileIconMap[item.icon] || LayoutDashboard;
        const isActive = cleanPath === item.href || cleanPath.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors",
              isActive
                ? "text-[var(--color-primary)]"
                : "text-[var(--muted-foreground)]"
            )}
          >
            <Icon className={cn("h-5 w-5", isActive && "text-[var(--color-primary)]")} />
            <span className="text-[10px] font-medium">{t(item.titleKey)}</span>
            {isActive && (
              <div className="absolute bottom-0 h-0.5 w-8 rounded-full bg-[var(--color-primary)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
