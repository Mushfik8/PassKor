// ================================================================
// StudentOS — Application Constants
// ================================================================

import type { AITool } from "@/types";

/** Application metadata */
export const APP_NAME = "StudentOS";
export const APP_DESCRIPTION = "Bangladesh's most advanced AI-powered Student Companion platform";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://studentos.app";

/** Supported locales */
export const LOCALES = ["en", "bn"] as const;
export const DEFAULT_LOCALE = "en" as const;

/** AIUB Grading Scale */
export const AIUB_GRADING_SCALE = [
  { grade: "A+", minPercentage: 90, maxPercentage: 100, gradePoint: 4.0 },
  { grade: "A",  minPercentage: 85, maxPercentage: 89,  gradePoint: 3.75 },
  { grade: "B+", minPercentage: 80, maxPercentage: 84,  gradePoint: 3.5 },
  { grade: "B",  minPercentage: 75, maxPercentage: 79,  gradePoint: 3.25 },
  { grade: "C+", minPercentage: 70, maxPercentage: 74,  gradePoint: 3.0 },
  { grade: "C",  minPercentage: 65, maxPercentage: 69,  gradePoint: 2.75 },
  { grade: "D+", minPercentage: 60, maxPercentage: 64,  gradePoint: 2.5 },
  { grade: "D",  minPercentage: 50, maxPercentage: 59,  gradePoint: 2.25 },
  { grade: "F",  minPercentage: 0,  maxPercentage: 49,  gradePoint: 0.0 },
] as const;

/** AIUB minimum CGPA for graduation */
export const AIUB_MIN_CGPA = 2.5;

/** AIUB minimum attendance */
export const AIUB_MIN_ATTENDANCE = 0.7;

/** AI rate limits (daily, per user, free tier) */
export const AI_RATE_LIMITS: Record<AITool, number> = {
  "study-planner": 5,
  "quiz": 10,
  "flashcards": 10,
  "tutor": 30,
  "pdf-summary": 3,
  "schedule": 5,
  "gpa-prediction": 10,
  "mentor": 5,
  "teacher": 15,
  "voice-tutor": 10,
  "interview-coach": 5,
  "code-reviewer": 10,
  "assignment-feedback": 5,
  "exam-strategy": 5,
  "research": 3,
  "career-coach": 5,
  "resume-reviewer": 3,
};

/** Pro tier gets unlimited AI */
export const AI_RATE_LIMITS_PRO: Record<AITool, number> = Object.fromEntries(
  Object.keys(AI_RATE_LIMITS).map((k) => [k, Infinity])
) as Record<AITool, number>;

/** Pagination */
export const PAGE_SIZE = 20;

/** File upload limits */
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
];
export const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB

/** Dashboard sidebar navigation groups */
export const SIDEBAR_NAV = [
  {
    titleKey: "nav.main",
    items: [
      { titleKey: "nav.dashboard", href: "/dashboard", icon: "LayoutDashboard" },
      { titleKey: "nav.courses", href: "/courses", icon: "BookOpen" },
      { titleKey: "nav.materials", href: "/materials", icon: "FileText" },
      { titleKey: "nav.schedule", href: "/schedule", icon: "Calendar" },
    ],
  },
  {
    titleKey: "nav.ai",
    items: [
      { titleKey: "nav.aiHub", href: "/ai", icon: "Brain" },
      { titleKey: "nav.aiTutor", href: "/ai/tutor", icon: "MessageCircle" },
      { titleKey: "nav.studyPlanner", href: "/ai/study-planner", icon: "ClipboardList" },
    ],
  },
  {
    titleKey: "nav.academic",
    items: [
      { titleKey: "nav.cgpa", href: "/cgpa", icon: "Calculator" },
      { titleKey: "nav.examRoutine", href: "/exam-routine", icon: "Clock" },
      { titleKey: "nav.attendance", href: "/attendance", icon: "CheckSquare" },
      { titleKey: "nav.notes", href: "/notes", icon: "StickyNote" },
      { titleKey: "nav.analytics", href: "/analytics", icon: "BarChart3" },
    ],
  },
  {
    titleKey: "nav.social",
    items: [
      { titleKey: "nav.community", href: "/community", icon: "Users" },
      { titleKey: "nav.career", href: "/career", icon: "Briefcase" },
    ],
  },
] as const;

/** Mobile bottom navigation */
export const MOBILE_NAV = [
  { titleKey: "nav.dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { titleKey: "nav.courses", href: "/courses", icon: "BookOpen" },
  { titleKey: "nav.aiHub", href: "/ai", icon: "Brain" },
  { titleKey: "nav.community", href: "/community", icon: "Users" },
  { titleKey: "nav.profile", href: "/profile", icon: "User" },
] as const;

/** Achievement definitions */
export const ACHIEVEMENTS = [
  { id: "first_steps", icon: "🎓", nameKey: "achievements.firstSteps" },
  { id: "bookworm_50", icon: "📚", nameKey: "achievements.bookworm" },
  { id: "streak_7", icon: "🔥", nameKey: "achievements.streakMaster" },
  { id: "ai_explorer", icon: "🤖", nameKey: "achievements.aiExplorer" },
  { id: "community_star", icon: "⭐", nameKey: "achievements.communityStar" },
  { id: "cgpa_climber", icon: "📈", nameKey: "achievements.cgpaClimber" },
  { id: "night_owl", icon: "🦉", nameKey: "achievements.nightOwl" },
  { id: "perfect_score", icon: "💯", nameKey: "achievements.perfectScore" },
] as const;
