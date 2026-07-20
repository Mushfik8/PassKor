"use client";

// ================================================================
// StudentOS — Smart Dashboard
// Personalized greeting, stats, study streak, AI suggestions,
// weekly progress, today's classes, upcoming exams, achievements
// ================================================================

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Flame,
  TrendingUp,
  BookOpen,
  Clock,
  Brain,
  Trophy,
  Calendar,
  Megaphone,
  Bookmark,
  Target,
  StickyNote,
  Briefcase,
  ArrowRight,
  Sparkles,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, getGreetingKey } from "@/lib/utils";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function DashboardPage() {
  const t = useTranslations();
  const greetingKey = getGreetingKey();

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Personalized Greeting */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {t(`dashboard.greeting.${greetingKey}`)}, Mushfik 👋
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1">
            {t("dashboard.motivational")}
          </p>
        </div>
        <Button variant="gradient" size="default" className="shrink-0 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          {t("dashboard.quickActions")}
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: t("dashboard.stats.cgpa"), value: "3.72", color: "text-indigo-500", bg: "bg-indigo-500/10", trend: "+0.05" },
          { icon: BookOpen, label: t("dashboard.stats.credits"), value: "98/156", color: "text-blue-500", bg: "bg-blue-500/10", trend: "63%" },
          { icon: Flame, label: t("dashboard.studyStreak"), value: "7", color: "text-orange-500", bg: "bg-orange-500/10", trend: "🔥" },
          { icon: Clock, label: t("dashboard.stats.studyHours"), value: "24.5h", color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "This week" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5 card-interactive"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", stat.bg)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <span className="text-xs font-medium text-[var(--muted-foreground)] bg-[var(--secondary)] px-2 py-0.5 rounded-full">
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-[var(--muted-foreground)] mt-0.5">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Progress Chart */}
          <motion.div variants={fadeUp} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold">{t("dashboard.weeklyProgress")}</h2>
              <span className="text-xs text-[var(--muted-foreground)]">This week</span>
            </div>
            <div className="flex items-end gap-2 h-36">
              {[
                { day: "Mon", hours: 3.5, max: 6 },
                { day: "Tue", hours: 5.0, max: 6 },
                { day: "Wed", hours: 2.0, max: 6 },
                { day: "Thu", hours: 6.0, max: 6 },
                { day: "Fri", hours: 4.0, max: 6 },
                { day: "Sat", hours: 3.0, max: 6 },
                { day: "Sun", hours: 1.0, max: 6 },
              ].map((bar, i) => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative" style={{ height: "120px" }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(bar.hours / bar.max) * 100}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className={cn(
                        "absolute bottom-0 left-1/2 -translate-x-1/2 w-8 sm:w-10 rounded-t-lg",
                        i === new Date().getDay() - 1
                          ? "bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)]"
                          : "bg-[var(--color-primary)]/20"
                      )}
                    />
                  </div>
                  <span className="text-[10px] text-[var(--muted-foreground)] font-medium">{bar.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Today's Classes + Study Plan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Today's Classes */}
            <motion.div variants={fadeUp} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[var(--color-primary)]" />
                  {t("dashboard.todaysClasses")}
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  { time: "09:00 AM", code: "CSC 4101", name: "Algorithms", room: "AB5-701", status: "done" },
                  { time: "11:00 AM", code: "EEE 2201", name: "Circuits", room: "AB4-502", status: "current" },
                  { time: "02:00 PM", code: "MAT 3101", name: "Linear Algebra", room: "AB3-301", status: "upcoming" },
                ].map((cls) => (
                  <div key={cls.time} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-mono text-[var(--muted-foreground)]">{cls.time}</span>
                    </div>
                    <div className={cn(
                      "h-8 w-1 rounded-full shrink-0",
                      cls.status === "done" ? "bg-green-400" : cls.status === "current" ? "bg-[var(--color-primary)] animate-pulse-soft" : "bg-[var(--border)]"
                    )} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{cls.code}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{cls.name} · {cls.room}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Study Plan */}
            <motion.div variants={fadeUp} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold flex items-center gap-2">
                  <Brain className="h-4 w-4 text-[var(--color-accent)]" />
                  {t("dashboard.studyPlan")}
                </h2>
                <span className="text-[10px] font-medium text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> AI
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { time: "2 hrs", topic: "Sorting Algorithms", course: "CSC 4101", priority: "high" },
                  { time: "1 hr", topic: "KVL/KCL Review", course: "EEE 2201", priority: "medium" },
                  { time: "30 min", topic: "Matrix Operations", course: "MAT 3101", priority: "low" },
                ].map((block) => (
                  <div key={block.topic} className="flex items-start gap-3">
                    <div className={cn(
                      "mt-1 h-2 w-2 rounded-full shrink-0",
                      block.priority === "high" ? "bg-red-400" : block.priority === "medium" ? "bg-yellow-400" : "bg-green-400"
                    )} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">{block.topic}</div>
                      <div className="text-xs text-[var(--muted-foreground)]">{block.course} · {block.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 text-xs">
                {t("dashboard.createPlan")} →
              </Button>
            </motion.div>
          </div>

          {/* AI Suggestions */}
          <motion.div variants={fadeUp} className="rounded-xl border border-[var(--color-primary)]/20 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  {t("dashboard.aiSuggestions")}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">
                  Focus on <strong>CSC 4101 — Algorithms</strong>. Your midterm is in 5 days and you&apos;ve covered 60% of the syllabus. Spend 2 extra hours on sorting and graph algorithms today.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Continue Learning */}
          <motion.div variants={fadeUp} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold">{t("dashboard.continueLearning")}</h2>
              <Button variant="ghost" size="sm" className="text-xs">{t("common.viewAll")} →</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { code: "CSC 4101", name: "Intro to Algorithms", progress: 65 },
                { code: "EEE 2201", name: "Digital Circuits", progress: 40 },
              ].map((course) => (
                <div key={course.code} className="flex items-center gap-3 rounded-lg border border-[var(--border)] p-3 hover:bg-[var(--secondary)]/50 transition-colors cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-sm font-bold text-[var(--color-primary)]">
                    {course.code.slice(0, 3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{course.code}</div>
                    <div className="text-xs text-[var(--muted-foreground)] truncate">{course.name}</div>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-[var(--secondary)]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[var(--muted-foreground)]">{course.progress}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column (1/3) */}
        <div className="space-y-6">
          {/* Upcoming Exams */}
          <motion.div variants={fadeUp} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-500" />
              {t("dashboard.upcomingExams")}
            </h2>
            <div className="space-y-3">
              {[
                { course: "CSC 4101", name: "Algorithms", days: 5, type: "Midterm" },
                { course: "MAT 3101", name: "Linear Algebra", days: 12, type: "Final" },
                { course: "EEE 2201", name: "Circuits", days: 18, type: "Midterm" },
              ].map((exam) => (
                <div key={exam.course} className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3">
                  <div>
                    <div className="text-sm font-medium">{exam.course}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{exam.type}</div>
                  </div>
                  <span className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full",
                    exam.days <= 7 ? "bg-red-500/10 text-red-500" : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                  )}>
                    {t("dashboard.daysLeft", { count: exam.days })}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Announcements */}
          <motion.div variants={fadeUp} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-amber-500" />
              {t("dashboard.announcements")}
            </h2>
            <div className="space-y-3">
              {[
                { title: "Spring 2026 Registration", time: "2h ago", priority: "high" },
                { title: "Library hours extended", time: "1d ago", priority: "low" },
              ].map((ann) => (
                <div key={ann.title} className="flex items-start gap-2.5">
                  <div className={cn(
                    "mt-1.5 h-2 w-2 rounded-full shrink-0",
                    ann.priority === "high" ? "bg-amber-400" : "bg-[var(--border)]"
                  )} />
                  <div>
                    <div className="text-sm font-medium">{ann.title}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{ann.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={fadeUp} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              {t("dashboard.achievements")}
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: "🎓", label: "First Steps", unlocked: true },
                { icon: "🔥", label: "7-Day Streak", unlocked: true },
                { icon: "📚", label: "Bookworm", unlocked: true },
                { icon: "🤖", label: "AI Explorer", unlocked: false },
                { icon: "⭐", label: "Community Star", unlocked: false },
                { icon: "📈", label: "CGPA Climber", unlocked: false },
                { icon: "🦉", label: "Night Owl", unlocked: false },
                { icon: "💯", label: "Perfect Score", unlocked: false },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg p-2 text-center",
                    badge.unlocked
                      ? "bg-yellow-500/5"
                      : "opacity-30 grayscale"
                  )}
                  title={badge.label}
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-[9px] text-[var(--muted-foreground)] leading-tight">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bookmarks */}
          <motion.div variants={fadeUp} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-blue-500" />
              {t("dashboard.bookmarks")}
            </h2>
            <div className="space-y-2">
              {[
                { title: "CSC 4101 — Sorting Notes", type: "📄 PDF" },
                { title: "Graph Theory Playlist", type: "🎥 Video" },
              ].map((bm) => (
                <div key={bm.title} className="flex items-center gap-2.5 rounded-lg p-2 hover:bg-[var(--secondary)]/50 transition-colors cursor-pointer">
                  <span className="text-sm">{bm.type.split(" ")[0]}</span>
                  <span className="text-sm truncate">{bm.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
