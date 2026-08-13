"use client";

// ================================================================
// StudentOS — AI Study Companion Hub
// 17 AI tools categorized into Study, Academic, Career, and Feedback
// Daily usage limit tracking, Pro upgrades, and direct tool navigation
// ================================================================

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Brain,
  MessageCircle,
  ClipboardList,
  HelpCircle,
  Layers,
  FileText,
  Calendar,
  TrendingUp,
  UserCheck,
  GraduationCap,
  Volume2,
  Video,
  Code2,
  CheckSquare,
  Sparkles,
  Search,
  Briefcase,
  FileSpreadsheet,
  Zap,
  ArrowRight,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AI_RATE_LIMITS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ToolItem {
  id: string;
  nameKey: string;
  descKey: string;
  icon: any;
  category: "study" | "academic" | "career" | "feedback";
  isPro?: boolean;
  queriesUsed: number;
}

const AI_TOOLS_DATA: ToolItem[] = [
  {
    id: "study-planner",
    nameKey: "studyPlanner",
    descKey: "studyPlannerDesc",
    icon: ClipboardList,
    category: "study",
    queriesUsed: 2,
  },
  {
    id: "tutor",
    nameKey: "tutor",
    descKey: "tutorDesc",
    icon: MessageCircle,
    category: "study",
    queriesUsed: 14,
  },
  {
    id: "quiz",
    nameKey: "quiz",
    descKey: "quizDesc",
    icon: HelpCircle,
    category: "study",
    queriesUsed: 4,
  },
  {
    id: "flashcards",
    nameKey: "flashcards",
    descKey: "flashcardsDesc",
    icon: Layers,
    category: "study",
    queriesUsed: 5,
  },
  {
    id: "pdf-summary",
    nameKey: "pdfSummary",
    descKey: "pdfSummaryDesc",
    icon: FileText,
    category: "study",
    queriesUsed: 1,
  },
  {
    id: "schedule",
    nameKey: "schedule",
    descKey: "scheduleDesc",
    icon: Calendar,
    category: "academic",
    queriesUsed: 0,
  },
  {
    id: "gpa-prediction",
    nameKey: "gpaPrediction",
    descKey: "gpaPredictionDesc",
    icon: TrendingUp,
    category: "academic",
    queriesUsed: 3,
  },
  {
    id: "mentor",
    nameKey: "mentor",
    descKey: "mentorDesc",
    icon: UserCheck,
    category: "academic",
    queriesUsed: 1,
  },
  {
    id: "teacher",
    nameKey: "teacher",
    descKey: "teacherDesc",
    icon: GraduationCap,
    category: "study",
    queriesUsed: 6,
  },
  {
    id: "voice-tutor",
    nameKey: "voiceTutor",
    descKey: "voiceTutorDesc",
    icon: Volume2,
    category: "study",
    isPro: true,
    queriesUsed: 0,
  },
  {
    id: "interview-coach",
    nameKey: "interviewCoach",
    descKey: "interviewCoachDesc",
    icon: Video,
    category: "career",
    isPro: true,
    queriesUsed: 0,
  },
  {
    id: "code-reviewer",
    nameKey: "codeReviewer",
    descKey: "codeReviewerDesc",
    icon: Code2,
    category: "feedback",
    queriesUsed: 3,
  },
  {
    id: "assignment-feedback",
    nameKey: "assignmentFeedback",
    descKey: "assignmentFeedbackDesc",
    icon: CheckSquare,
    category: "feedback",
    queriesUsed: 1,
  },
  {
    id: "exam-strategy",
    nameKey: "examStrategy",
    descKey: "examStrategyDesc",
    icon: Sparkles,
    category: "academic",
    queriesUsed: 2,
  },
  {
    id: "research",
    nameKey: "research",
    descKey: "researchDesc",
    icon: Search,
    category: "academic",
    queriesUsed: 0,
  },
  {
    id: "career-coach",
    nameKey: "careerCoach",
    descKey: "careerCoachDesc",
    icon: Briefcase,
    category: "career",
    queriesUsed: 1,
  },
  {
    id: "resume-reviewer",
    nameKey: "resumeReviewer",
    descKey: "resumeReviewerDesc",
    icon: FileSpreadsheet,
    category: "career",
    isPro: true,
    queriesUsed: 0,
  },
];

export default function AIHubPage() {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = AI_TOOLS_DATA.filter((tool) => {
    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;
    const title = t(`ai.${tool.nameKey}`);
    const desc = t(`ai.${tool.descKey}`);
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalUsedToday = AI_TOOLS_DATA.reduce((acc, t) => acc + t.queriesUsed, 0);
  const dailyQuota = 50;

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-indigo-900/20 via-[var(--card)] to-purple-900/20 p-6 sm:p-8">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">
            <Sparkles className="h-3.5 w-3.5" /> 17 Dedicated University AI Models
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
            {t("ai.hubTitle")}
          </h1>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            {t("ai.hubSubtitle")}
          </p>
        </div>

        {/* Usage Progress widget */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]/80 p-4 backdrop-blur-md">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold">{t("ai.dailyUsage")}</span>
              <span className="text-[var(--muted-foreground)]">
                {totalUsedToday} / {dailyQuota} Free Queries
              </span>
            </div>
            <Progress value={(totalUsedToday / dailyQuota) * 100} variant="gradient" />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 p-4">
            <div>
              <div className="text-xs font-bold text-[var(--foreground)]">Unlock Unlimited AI</div>
              <div className="text-[11px] text-[var(--muted-foreground)]">From ৳99/month</div>
            </div>
            <Button variant="gradient" size="sm" className="text-xs">
              <Zap className="h-3.5 w-3.5 mr-1" /> Upgrade
            </Button>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "All Tools" },
            { id: "study", label: "Study & Practice" },
            { id: "academic", label: "Academic Guidance" },
            { id: "feedback", label: "Feedback & Review" },
            { id: "career", label: "Career & Interview" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                selectedCategory === cat.id
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <Input
            placeholder="Search AI tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="group relative flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 card-interactive cursor-pointer hover:border-[var(--color-primary)]/40"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:bg-gradient-to-br group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-accent)] group-hover:text-white transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  {tool.isPro ? (
                    <Badge variant="gradient" className="text-[10px] gap-1">
                      <Lock className="h-3 w-3" /> PRO
                    </Badge>
                  ) : (
                    <span className="text-[10px] text-[var(--muted-foreground)] font-mono">
                      {tool.queriesUsed} used today
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-base mb-1.5 group-hover:text-[var(--color-primary)] transition-colors">
                  {t(`ai.${tool.nameKey}`)}
                </h3>

                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed line-clamp-2">
                  {t(`ai.${tool.descKey}`)}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[var(--color-primary)]">
                <span>Launch Model</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
