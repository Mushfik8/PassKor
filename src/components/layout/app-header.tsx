"use client";

// ================================================================
// StudentOS — App Header
// Top bar with search, notifications, theme toggle, profile
// ================================================================

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  User,
  ChevronDown,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

interface AppHeaderProps {
  sidebarCollapsed: boolean;
}

export function AppHeader({ sidebarCollapsed }: AppHeaderProps) {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-[var(--z-sticky)] h-16 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md transition-all duration-300",
        sidebarCollapsed
          ? "left-[var(--sidebar-width-collapsed)]"
          : "left-[var(--sidebar-width)]"
      )}
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* Search bar */}
        <div className="flex-1 max-w-lg">
          <button
            className="flex w-full items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/50 px-4 py-2.5 text-sm text-[var(--muted-foreground)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
            onClick={() => {
              // TODO: Open command palette
            }}
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">{t("common.searchPlaceholder")}</span>
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--card)] px-2 py-0.5 text-[10px] font-mono text-[var(--muted-foreground)]">
              <Command className="h-3 w-3" />K
            </kbd>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2 ml-4">
          {/* Language toggle */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Switch language"
            title="Switch language"
          >
            <Globe className="h-[18px] w-[18px]" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
            {/* Unread badge */}
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-primary)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-primary)]" />
            </span>
          </button>

          {/* Profile */}
          <div className="relative ml-1">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-[var(--secondary)] transition-colors cursor-pointer"
              aria-label="Profile menu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-xs font-bold text-white">
                {getInitials("Mushfik Rahman")}
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[var(--muted-foreground)] hidden sm:block" />
            </button>

            {/* Profile dropdown */}
            {showProfile && (
              <>
                <div
                  className="fixed inset-0 z-[var(--z-dropdown)]"
                  onClick={() => setShowProfile(false)}
                />
                <div className="absolute right-0 top-12 z-[var(--z-popover)] w-56 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-xl animate-fade-in">
                  <div className="px-3 py-2 mb-1">
                    <p className="text-sm font-semibold">Mushfik Rahman</p>
                    <p className="text-xs text-[var(--muted-foreground)]">mushfik@aiub.edu</p>
                  </div>
                  <hr className="border-[var(--border)] my-1" />
                  <Link
                    href="/profile"
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm hover:bg-[var(--secondary)] transition-colors"
                  >
                    <User className="h-4 w-4 text-[var(--muted-foreground)]" />
                    {t("nav.profile")}
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm hover:bg-[var(--secondary)] transition-colors"
                  >
                    <Sun className="h-4 w-4 text-[var(--muted-foreground)]" />
                    {t("nav.settings")}
                  </Link>
                  <hr className="border-[var(--border)] my-1" />
                  <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer">
                    <span className="text-sm">🚪</span>
                    {t("nav.logout")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
