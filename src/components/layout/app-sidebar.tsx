"use client";

// ================================================================
// StudentOS — App Sidebar
// Collapsible sidebar with nav groups, icons, and active state
// ================================================================

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Calendar,
  Brain,
  MessageCircle,
  ClipboardList,
  Calculator,
  Clock,
  CheckSquare,
  StickyNote,
  BarChart3,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Settings,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SIDEBAR_NAV } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  BookOpen,
  FileText,
  Calendar,
  Brain,
  MessageCircle,
  ClipboardList,
  Calculator,
  Clock,
  CheckSquare,
  StickyNote,
  BarChart3,
  Users,
  Briefcase,
};

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations();

  // Strip locale prefix for matching
  const cleanPath = pathname.replace(/^\/(en|bn)/, "") || "/dashboard";

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-[var(--z-sticky)] h-screen flex flex-col border-r border-[var(--border)] bg-[var(--card)] transition-all duration-300 ease-in-out",
        collapsed ? "w-[var(--sidebar-width-collapsed)]" : "w-[var(--sidebar-width)]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[var(--border)] px-4">
        <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-sm">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-lg font-bold tracking-tight whitespace-nowrap"
            >
              Student<span className="gradient-text">OS</span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin">
        {SIDEBAR_NAV.map((group) => (
          <div key={group.titleKey}>
            {!collapsed && (
              <h4 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                {t(group.titleKey)}
              </h4>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon] || LayoutDashboard;
                const isActive = cleanPath === item.href || cleanPath.startsWith(item.href + "/");

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                          : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]",
                        collapsed && "justify-center px-0"
                      )}
                      title={collapsed ? t(item.titleKey) : undefined}
                    >
                      <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-[var(--color-primary)]")} />
                      {!collapsed && <span className="truncate">{t(item.titleKey)}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-[var(--border)] p-3 space-y-1">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-all",
            collapsed && "justify-center px-0"
          )}
          title={collapsed ? t("nav.settings") : undefined}
        >
          <Settings className="h-5 w-5 shrink-0" />
          {!collapsed && <span>{t("nav.settings")}</span>}
        </Link>
        <button
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer",
            collapsed && "justify-center px-0"
          )}
          title={collapsed ? t("nav.logout") : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>{t("nav.logout")}</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] shadow-sm hover:bg-[var(--secondary)] transition-colors cursor-pointer"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </aside>
  );
}
