"use client";

// ================================================================
// StudentOS — Courses Management Page
// Browse all courses, filter by department/semester, view enrolled courses,
// track syllabus progress, credits, and prerequisites
// ================================================================

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  Filter,
  Plus,
  Star,
  CheckCircle2,
  Clock,
  Layers,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

// Mock courses dataset (AIUB CSE Curriculum based)
const INITIAL_COURSES = [
  {
    id: "csc4101",
    code: "CSC 4101",
    title: "Analysis & Design of Algorithms",
    credits: 3,
    department: "CSE",
    semester: 6,
    isEnrolled: true,
    progress: 65,
    rating: 4.8,
    reviews: 42,
    materials: 18,
    type: "core",
    prerequisites: ["CSC 2202"],
    description: "Algorithmic paradigms, divide-and-conquer, greedy techniques, dynamic programming, graph algorithms, and NP-completeness.",
  },
  {
    id: "eee2201",
    code: "EEE 2201",
    title: "Digital Logic Design & Circuits",
    credits: 3,
    department: "EEE",
    semester: 4,
    isEnrolled: true,
    progress: 40,
    rating: 4.5,
    reviews: 29,
    materials: 12,
    type: "core",
    prerequisites: ["PHY 1101"],
    description: "Boolean algebra, Karnaugh maps, combinational logic, flip-flops, sequential circuits, counters, and finite state machines.",
  },
  {
    id: "mat3101",
    code: "MAT 3101",
    title: "Linear Algebra & Fourier Analysis",
    credits: 3,
    department: "MAT",
    semester: 5,
    isEnrolled: true,
    progress: 80,
    rating: 4.2,
    reviews: 19,
    materials: 9,
    type: "core",
    prerequisites: ["MAT 1201"],
    description: "Matrices, determinants, eigenvalues, eigenvectors, vector spaces, Fourier series and transform applications.",
  },
  {
    id: "csc3203",
    code: "CSC 3203",
    title: "Operating Systems & Concurrency",
    credits: 3,
    department: "CSE",
    semester: 5,
    isEnrolled: false,
    progress: 0,
    rating: 4.9,
    reviews: 56,
    materials: 24,
    type: "core",
    prerequisites: ["CSC 2101"],
    description: "Processes, threads, CPU scheduling, synchronization, deadlocks, memory management, virtual memory, and file systems.",
  },
  {
    id: "csc4205",
    code: "CSC 4205",
    title: "Machine Learning & Neural Networks",
    credits: 3,
    department: "CSE",
    semester: 7,
    isEnrolled: false,
    progress: 0,
    rating: 4.9,
    reviews: 38,
    materials: 31,
    type: "elective",
    prerequisites: ["MAT 3101", "CSC 4101"],
    description: "Supervised and unsupervised learning, regression, classification, deep neural networks, backpropagation, and CNNs.",
  },
  {
    id: "csc4108",
    code: "CSC 4108",
    title: "Database Management Systems",
    credits: 3,
    department: "CSE",
    semester: 4,
    isEnrolled: false,
    progress: 0,
    rating: 4.7,
    reviews: 64,
    materials: 22,
    type: "core",
    prerequisites: ["CSC 1202"],
    description: "Relational data model, SQL, normalization, transactions, ACID properties, indexing, and NoSQL fundamentals.",
  },
];

export default function CoursesPage() {
  const t = useTranslations();

  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<(typeof INITIAL_COURSES)[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filterCourses = (list: typeof INITIAL_COURSES) => {
    return list.filter((c) => {
      const matchesSearch =
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSemester =
        selectedSemester === "all" || c.semester.toString() === selectedSemester;
      const matchesType = selectedType === "all" || c.type === selectedType;
      return matchesSearch && matchesSemester && matchesType;
    });
  };

  const enrolledCourses = filterCourses(courses.filter((c) => c.isEnrolled));
  const allCourses = filterCourses(courses);

  const toggleEnrollment = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId ? { ...c, isEnrolled: !c.isEnrolled } : c
      )
    );
    if (selectedCourse?.id === courseId) {
      setSelectedCourse((prev) => (prev ? { ...prev, isEnrolled: !prev.isEnrolled } : null));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("courses.title")}
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1 text-sm">
            Manage your registered courses, view prerequisite maps, and track academic progress.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Layers className="h-4 w-4" />
            {t("courses.prerequisiteTree")}
          </Button>
          <Button variant="gradient" size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            {t("courses.addCourse")}
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6">
          <Input
            placeholder="Search by course code or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="sm:col-span-3">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="flex h-11 w-full appearance-none rounded-lg border border-[var(--input)] bg-[var(--card)] px-3.5 py-2 text-sm text-[var(--foreground)] cursor-pointer"
          >
            <option value="all">All Semesters</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={`${i + 1}`}>
                Semester {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex h-11 w-full appearance-none rounded-lg border border-[var(--input)] bg-[var(--card)] px-3.5 py-2 text-sm text-[var(--foreground)] cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="core">Core Courses</option>
            <option value="elective">Electives</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="enrolled">
        <TabsList className="mb-4">
          <TabsTrigger value="enrolled">
            {t("courses.myCourses")} ({enrolledCourses.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            {t("courses.allCourses")} ({allCourses.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Enrolled */}
        <TabsContent value="enrolled">
          {enrolledCourses.length === 0 ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
              <BookOpen className="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-3 opacity-40" />
              <h3 className="text-base font-semibold">No registered courses found</h3>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                Explore the course catalog to add your active semester courses.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => {
                    setSelectedCourse(course);
                    setIsDialogOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Tab 2: All Courses */}
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => {
                  setSelectedCourse(course);
                  setIsDialogOpen(true);
                }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Course Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedCourse && (
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={selectedCourse.type === "core" ? "default" : "secondary"}>
                  {selectedCourse.type.toUpperCase()}
                </Badge>
                <Badge variant="outline">{selectedCourse.credits} Credits</Badge>
                <Badge variant="outline">Semester {selectedCourse.semester}</Badge>
              </div>
              <DialogTitle className="text-xl">{selectedCourse.code}: {selectedCourse.title}</DialogTitle>
              <DialogDescription>{selectedCourse.department} Department</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-2">
              <p className="text-sm text-[var(--foreground)] leading-relaxed">
                {selectedCourse.description}
              </p>

              {selectedCourse.isEnrolled && (
                <div className="space-y-1.5 rounded-xl bg-[var(--secondary)]/60 p-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Syllabus Completion</span>
                    <span>{selectedCourse.progress}%</span>
                  </div>
                  <Progress value={selectedCourse.progress} variant="gradient" />
                </div>
              )}

              {selectedCourse.prerequisites.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-1.5">
                    Prerequisites
                  </h4>
                  <div className="flex gap-2">
                    {selectedCourse.prerequisites.map((p) => (
                      <Badge key={p} variant="secondary">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant={selectedCourse.isEnrolled ? "destructive" : "gradient"}
                onClick={() => toggleEnrollment(selectedCourse.id)}
              >
                {selectedCourse.isEnrolled ? "Drop Course" : "Enroll in Course"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

function CourseCard({
  course,
  onClick,
}: {
  course: (typeof INITIAL_COURSES)[0];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 card-interactive cursor-pointer hover:border-[var(--color-primary)]/40"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-md">
            {course.code}
          </span>
          <div className="flex items-center gap-1 text-xs text-yellow-500 font-semibold">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{course.rating}</span>
          </div>
        </div>

        <h3 className="font-semibold text-base leading-snug group-hover:text-[var(--color-primary)] transition-colors mb-2 line-clamp-1">
          {course.title}
        </h3>

        <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed mb-4">
          {course.description}
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-[var(--border)]">
        {course.isEnrolled ? (
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-medium text-[var(--muted-foreground)]">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} variant="gradient" />
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>{course.credits} Credits</span>
            <span>{course.materials} Materials</span>
          </div>
        )}
      </div>
    </div>
  );
}
