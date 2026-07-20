"use client";

// ================================================================
// StudentOS — Platform Layout
// Sidebar + Header + Content shell for authenticated pages
// ================================================================

import { useState } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Sidebar — hidden on mobile */}
      <div className="hidden lg:block">
        <AppSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Header */}
      <div className="hidden lg:block">
        <AppHeader sidebarCollapsed={sidebarCollapsed} />
      </div>

      {/* Mobile header (simplified) */}
      <div className="lg:hidden">
        <AppHeader sidebarCollapsed={false} />
      </div>

      {/* Main content */}
      <main
        className={cn(
          "pt-16 pb-20 lg:pb-8 transition-all duration-300",
          sidebarCollapsed
            ? "lg:ml-[var(--sidebar-width-collapsed)]"
            : "lg:ml-[var(--sidebar-width)]"
        )}
      >
        <div className="mx-auto max-w-[var(--content-max-width)] px-4 sm:px-6 py-6 sm:py-8">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
