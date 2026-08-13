// ================================================================
// StudentOS — Auth Layout
// Centered container with mesh background and brand header
// ================================================================

import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 mesh-gradient">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute top-12 left-1/4 h-80 w-80 rounded-full bg-[var(--color-primary)] opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 right-1/4 h-80 w-80 rounded-full bg-[var(--color-accent)] opacity-10 blur-3xl" />

      {/* Brand logo at top */}
      <div className="mb-8 z-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-md group-hover:shadow-lg transition-shadow">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Student<span className="gradient-text">OS</span>
          </span>
        </Link>
      </div>

      {/* Main card container */}
      <div className="w-full max-w-md z-10">{children}</div>

      {/* Footer copyright */}
      <div className="mt-8 text-center text-xs text-[var(--muted-foreground)] z-10">
        &copy; {new Date().getFullYear()} StudentOS. Bangladesh&apos;s AI Student Platform.
      </div>
    </div>
  );
}
