// ================================================================
// StudentOS — Utility Functions
// ================================================================

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx. Used by shadcn/ui components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with commas (e.g., 1,234,567)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

/**
 * Get time-of-day greeting key for i18n
 */
export function getGreetingKey(): "morning" | "afternoon" | "evening" {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

/**
 * Calculate GPA from grade points and credits
 */
export function calculateGPA(
  courses: { gradePoint: number; credits: number }[]
): number {
  if (courses.length === 0) return 0;
  const totalPoints = courses.reduce(
    (sum, c) => sum + c.gradePoint * c.credits,
    0
  );
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  if (totalCredits === 0) return 0;
  return Math.round((totalPoints / totalCredits) * 100) / 100;
}

/**
 * Calculate target GPA needed to achieve desired CGPA
 */
export function calculateTargetGPA(
  currentCGPA: number,
  completedCredits: number,
  targetCGPA: number,
  remainingCredits: number
): number | null {
  if (remainingCredits <= 0) return null;
  const needed =
    (targetCGPA * (completedCredits + remainingCredits) -
      currentCGPA * completedCredits) /
    remainingCredits;
  if (needed > 4.0 || needed < 0) return null;
  return Math.round(needed * 100) / 100;
}

/**
 * Generate initials from a name (e.g., "Mushfik Rahman" → "MR")
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Format file size in human-readable form
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

/**
 * Generate search tokens from text for Firestore search
 */
export function generateSearchTokens(text: string): string[] {
  const normalized = text.toLowerCase().trim();
  const words = normalized.split(/\s+/).filter((w) => w.length > 1);
  const tokens = new Set<string>();

  words.forEach((word) => {
    tokens.add(word);
    // Add prefixes for autocomplete (min 2 chars)
    for (let i = 2; i <= Math.min(word.length, 8); i++) {
      tokens.add(word.slice(0, i));
    }
  });

  return Array.from(tokens);
}

/**
 * Generate a deterministic cache key from AI inputs
 */
export function generateCacheKey(
  tool: string,
  input: Record<string, unknown>
): string {
  const sorted = JSON.stringify(input, Object.keys(input).sort());
  let hash = 0;
  for (let i = 0; i < sorted.length; i++) {
    const char = sorted.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `${tool}_${Math.abs(hash).toString(36)}`;
}

/**
 * Debounce a function call
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/**
 * Sleep for a given number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get AIUB grade from grade point
 */
export function getGradeFromPoint(point: number): string {
  if (point >= 4.0) return "A+";
  if (point >= 3.75) return "A";
  if (point >= 3.5) return "B+";
  if (point >= 3.25) return "B";
  if (point >= 3.0) return "C+";
  if (point >= 2.75) return "C";
  if (point >= 2.5) return "D+";
  if (point >= 2.25) return "D";
  return "F";
}
