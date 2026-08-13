"use client";

// ================================================================
// StudentOS — CGPA Calculator & Planner
// Semester-wise GPA tracking, Cumulative CGPA, Target Planner,
// and AIUB Grading System Integration
// ================================================================

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Calculator,
  Plus,
  Trash2,
  TrendingUp,
  Target,
  Award,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AIUB_GRADING_SCALE, AIUB_MIN_CGPA } from "@/lib/constants";
import { calculateGPA, calculateTargetGPA } from "@/lib/utils";

interface CourseGrade {
  id: string;
  code: string;
  credits: number;
  gradePoint: number;
}

interface SemesterData {
  id: string;
  name: string;
  courses: CourseGrade[];
}

const INITIAL_SEMESTERS: SemesterData[] = [
  {
    id: "sem-1",
    name: "Spring 2024 (Semester 1)",
    courses: [
      { id: "c1", code: "CSC 1101 (Intro to Programming)", credits: 3, gradePoint: 4.0 },
      { id: "c2", code: "MAT 1101 (Differential Calculus)", credits: 3, gradePoint: 3.75 },
      { id: "c3", code: "ENG 1101 (English Reading & Writing)", credits: 3, gradePoint: 3.5 },
      { id: "c4", code: "PHY 1101 (Physics 1)", credits: 3, gradePoint: 3.75 },
    ],
  },
  {
    id: "sem-2",
    name: "Summer 2024 (Semester 2)",
    courses: [
      { id: "c5", code: "CSC 1202 (Data Structures)", credits: 3, gradePoint: 3.75 },
      { id: "c6", code: "MAT 1202 (Integral Calculus)", credits: 3, gradePoint: 3.5 },
      { id: "c7", code: "EEE 1201 (Electrical Circuits 1)", credits: 3, gradePoint: 3.25 },
      { id: "c8", code: "CHEM 1101 (Chemistry)", credits: 3, gradePoint: 3.75 },
    ],
  },
  {
    id: "sem-3",
    name: "Fall 2024 (Semester 3)",
    courses: [
      { id: "c9", code: "CSC 2101 (OOP with Java)", credits: 3, gradePoint: 4.0 },
      { id: "c10", code: "MAT 2101 (Discrete Math)", credits: 3, gradePoint: 4.0 },
      { id: "c11", code: "EEE 2101 (Electronic Devices)", credits: 3, gradePoint: 3.5 },
      { id: "c12", code: "ECO 1101 (Economics)", credits: 2, gradePoint: 3.75 },
    ],
  },
];

export default function CGPAPage() {
  const t = useTranslations();

  const [semesters, setSemesters] = useState<SemesterData[]>(INITIAL_SEMESTERS);
  const [targetCGPA, setTargetCGPA] = useState<string>("3.80");
  const [remainingCredits, setRemainingCredits] = useState<string>("60");

  // Calculate Cumulative CGPA
  const allCourses = semesters.flatMap((s) => s.courses);
  const completedCredits = allCourses.reduce((sum, c) => sum + c.credits, 0);
  const cumulativeCGPA = calculateGPA(allCourses);

  // Target GPA calculation
  const targetFloat = parseFloat(targetCGPA) || 0;
  const remainingFloat = parseFloat(remainingCredits) || 0;
  const neededGPA = calculateTargetGPA(
    cumulativeCGPA,
    completedCredits,
    targetFloat,
    remainingFloat
  );

  const addSemester = () => {
    const nextNum = semesters.length + 1;
    const newSem: SemesterData = {
      id: `sem-${Date.now()}`,
      name: `Semester ${nextNum}`,
      courses: [
        { id: `c-${Date.now()}-1`, code: "Course 1", credits: 3, gradePoint: 3.75 },
        { id: `c-${Date.now()}-2`, code: "Course 2", credits: 3, gradePoint: 3.75 },
      ],
    };
    setSemesters([...semesters, newSem]);
  };

  const removeSemester = (semId: string) => {
    setSemesters(semesters.filter((s) => s.id !== semId));
  };

  const addCourse = (semId: string) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semId
          ? {
              ...s,
              courses: [
                ...s.courses,
                { id: `c-${Date.now()}`, code: "New Course", credits: 3, gradePoint: 3.75 },
              ],
            }
          : s
      )
    );
  };

  const removeCourse = (semId: string, courseId: string) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semId
          ? { ...s, courses: s.courses.filter((c) => c.id !== courseId) }
          : s
      )
    );
  };

  const updateCourse = (
    semId: string,
    courseId: string,
    field: keyof CourseGrade,
    value: string | number
  ) => {
    setSemesters(
      semesters.map((s) =>
        s.id === semId
          ? {
              ...s,
              courses: s.courses.map((c) =>
                c.id === courseId ? { ...c, [field]: value } : c
              ),
            }
          : s
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("cgpa.title")}
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1 text-sm">
            Interactive AIUB CGPA calculator, target predictor, and semester breakdowns.
          </p>
        </div>
        <Button variant="gradient" onClick={addSemester} className="gap-1.5 self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          {t("cgpa.addSemester")}
        </Button>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 border-[var(--border)] bg-gradient-to-br from-indigo-500/10 via-[var(--card)] to-[var(--card)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              {t("cgpa.cumulativeCGPA")}
            </span>
            <TrendingUp className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold gradient-text">{cumulativeCGPA.toFixed(2)}</div>
          <div className="text-xs text-[var(--muted-foreground)] mt-1">
            Out of 4.00 · {completedCredits} Total Credits
          </div>
        </Card>

        <Card className="p-5 border-[var(--border)] bg-gradient-to-br from-blue-500/10 via-[var(--card)] to-[var(--card)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Graduation Requirement
            </span>
            <Award className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold">{AIUB_MIN_CGPA.toFixed(2)}</div>
          <div className="text-xs text-green-500 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> Standing is Safe & Good
          </div>
        </Card>

        <Card className="p-5 border-[var(--border)] bg-gradient-to-br from-violet-500/10 via-[var(--card)] to-[var(--card)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Total Semesters
            </span>
            <Calculator className="h-5 w-5 text-violet-500" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold">{semesters.length}</div>
          <div className="text-xs text-[var(--muted-foreground)] mt-1">
            {allCourses.length} Completed / Registered Courses
          </div>
        </Card>
      </div>

      {/* Target Planner Section */}
      <Card className="border-[var(--color-primary)]/20 bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-accent)]/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-lg">Target CGPA Goal Planner</CardTitle>
              <CardDescription className="text-xs">
                Calculate the GPA you need across remaining credits to hit your dream graduation CGPA.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <Input
              label="Desired Target CGPA"
              type="number"
              step="0.01"
              min="0"
              max="4.0"
              value={targetCGPA}
              onChange={(e) => setTargetCGPA(e.target.value)}
            />
            <Input
              label="Remaining Credits to Complete"
              type="number"
              min="1"
              max="150"
              value={remainingCredits}
              onChange={(e) => setRemainingCredits(e.target.value)}
            />
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-center">
              <span className="text-xs text-[var(--muted-foreground)] block">Required Average GPA</span>
              <span className="text-2xl font-bold gradient-text">
                {neededGPA !== null ? neededGPA.toFixed(2) : "N/A"}
              </span>
            </div>
          </div>

          <div className="mt-4 text-xs text-[var(--muted-foreground)]">
            {neededGPA !== null ? (
              neededGPA > 4.0 ? (
                <span className="text-[var(--color-destructive)] font-medium">
                  ⚠️ Target is mathematically unachievable with remaining credits. Try adjusting your goal.
                </span>
              ) : (
                <span className="text-[var(--color-success)] font-medium">
                  🎯 You need an average GPA of {neededGPA.toFixed(2)} in your remaining {remainingCredits} credits to achieve a {targetCGPA} CGPA.
                </span>
              )
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Semesters List */}
      <div className="space-y-4">
        {semesters.map((semester) => {
          const semGPA = calculateGPA(semester.courses);
          const semCredits = semester.courses.reduce((sum, c) => sum + c.credits, 0);

          return (
            <Card key={semester.id} className="border-[var(--border)]">
              <CardHeader className="pb-3 border-b border-[var(--border)] flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">{semester.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {semCredits} Credits · Semester GPA: <strong className="text-[var(--foreground)]">{semGPA.toFixed(2)}</strong>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addCourse(semester.id)}
                    className="text-xs gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Course
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSemester(semester.id)}
                    className="text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-4 space-y-3">
                {semester.courses.map((course) => (
                  <div
                    key={course.id}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center p-2 rounded-lg bg-[var(--secondary)]/40 hover:bg-[var(--secondary)]/70 transition-colors"
                  >
                    <div className="sm:col-span-6">
                      <input
                        type="text"
                        value={course.code}
                        onChange={(e) =>
                          updateCourse(semester.id, course.id, "code", e.target.value)
                        }
                        className="w-full bg-transparent text-sm font-medium focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <select
                        value={course.credits}
                        onChange={(e) =>
                          updateCourse(
                            semester.id,
                            course.id,
                            "credits",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-md px-2 py-1 text-xs"
                      >
                        <option value="1">1 Credit</option>
                        <option value="2">2 Credits</option>
                        <option value="3">3 Credits</option>
                        <option value="4">4 Credits</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <select
                        value={course.gradePoint}
                        onChange={(e) =>
                          updateCourse(
                            semester.id,
                            course.id,
                            "gradePoint",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full bg-[var(--card)] border border-[var(--border)] rounded-md px-2 py-1 text-xs"
                      >
                        {AIUB_GRADING_SCALE.map((g) => (
                          <option key={g.grade} value={g.gradePoint}>
                            {g.grade} ({g.gradePoint.toFixed(2)})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-1 flex justify-end">
                      <button
                        onClick={() => removeCourse(semester.id, course.id)}
                        className="text-[var(--muted-foreground)] hover:text-red-500 p-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AIUB Grading Scale Legend */}
      <Card className="border-[var(--border)]">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Info className="h-4 w-4 text-[var(--color-primary)]" />
            AIUB Official Grading Standard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
            {AIUB_GRADING_SCALE.map((scale) => (
              <div
                key={scale.grade}
                className="text-center rounded-lg border border-[var(--border)] bg-[var(--secondary)]/30 p-2.5"
              >
                <div className="font-bold text-sm text-[var(--color-primary)]">{scale.grade}</div>
                <div className="text-xs font-semibold">{scale.gradePoint.toFixed(2)}</div>
                <div className="text-[10px] text-[var(--muted-foreground)]">
                  {scale.minPercentage}% - {scale.maxPercentage}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
