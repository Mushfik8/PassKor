// ================================================================
// StudentOS — TypeScript Types
// All entity interfaces for the platform
// ================================================================

import { Timestamp } from "firebase/firestore";

// === UNIVERSITY ===
export interface University {
  id: string;
  name: string;
  nameBn: string;
  shortName: string;
  logo: string;
  website: string;
  semesterSystem: "trimester" | "semester";
  semesterNames: string[];
  minCGPA: number;
  totalCreditsRequired: number;
  attendanceMinimum: number;
  gradingScale: GradeScale[];
  academicCalendar: AcademicSemester[];
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface GradeScale {
  grade: string;
  minPercentage: number;
  maxPercentage: number;
  gradePoint: number;
}

export interface AcademicSemester {
  semester: string;
  startDate: Timestamp;
  endDate: Timestamp;
  events: AcademicEvent[];
}

export interface AcademicEvent {
  name: string;
  nameBn: string;
  date: Timestamp;
  type: "holiday" | "exam" | "registration" | "deadline" | "event";
}

// === DEPARTMENT ===
export interface Department {
  id: string;
  universityId: string;
  facultyId: string;
  facultyName: string;
  facultyNameBn: string;
  name: string;
  nameBn: string;
  shortName: string;
  totalCredits: number;
  totalCourses: number;
  headOfDepartment: string;
  isActive: boolean;
  createdAt: Timestamp;
}

// === COURSE ===
export interface Course {
  id: string;
  universityId: string;
  departmentId: string;
  code: string;
  title: string;
  titleBn: string;
  description: string;
  credits: number;
  type: CourseType;
  semester: number;
  prerequisites: string[];
  corequisites: string[];
  isCore: boolean;
  departmentName: string;
  departmentShortName: string;
  enrollmentCount: number;
  averageRating: number;
  reviewCount: number;
  materialCount: number;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CourseType = "theory" | "lab" | "project" | "thesis" | "internship";

// === USER ===
export interface User {
  uid: string;
  email: string;
  displayName: string;
  studentId: string;
  phone: string;
  universityId: string;
  departmentId: string;
  universityShortName: string;
  departmentShortName: string;
  program: string;
  admissionSemester: string;
  currentSemester: number;
  totalCredits: number;
  completedCredits: number;
  inProgressCredits: number;
  cgpa: number;
  photoURL: string;
  bio: string;
  role: UserRole;
  theme: ThemePreference;
  language: Locale;
  subscription: SubscriptionTier;
  notificationPreferences: NotificationPreferences;
  emailVerified: boolean;
  lastLoginAt: Timestamp;
  onboardingComplete: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type UserRole = "student" | "admin" | "superadmin";
export type ThemePreference = "light" | "dark" | "system";
export type Locale = "en" | "bn";
export type SubscriptionTier = "free" | "pro" | "university";

export interface NotificationPreferences {
  push: boolean;
  email: boolean;
  newMaterials: boolean;
  examReminders: boolean;
  communityReplies: boolean;
  announcements: boolean;
}

// === ENROLLMENT ===
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  credits: number;
  semester: string;
  status: "in-progress" | "completed" | "dropped";
  grade: string | null;
  gradePoint: number | null;
  progress: number;
  createdAt: Timestamp;
}

// === MATERIAL ===
export interface Material {
  id: string;
  universityId: string;
  departmentId: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  titleBn: string;
  description: string;
  type: MaterialType;
  fileURL: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  thumbnailURL: string;
  youtubePlaylistId: string;
  youtubeVideoCount: number;
  semester: string;
  year: number;
  searchTokens: string[];
  viewCount: number;
  downloadCount: number;
  bookmarkCount: number;
  uploadedBy: string;
  uploadedByName: string;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type MaterialType =
  | "pdf"
  | "slide"
  | "book"
  | "lab-manual"
  | "video"
  | "youtube-playlist"
  | "previous-question"
  | "assignment"
  | "link";

// === COMMUNITY ===
export interface Post {
  id: string;
  universityId: string;
  type: PostType;
  title: string;
  content: string;
  contentPlain: string;
  authorId: string;
  authorName: string;
  authorPhotoURL: string;
  authorDepartment: string;
  tags: string[];
  courseId: string | null;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  status: PostStatus;
  moderationReason: string;
  searchTokens: string[];
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type PostType = "discussion" | "question" | "announcement" | "project-partner";
export type PostStatus = "published" | "flagged" | "removed" | "pending";

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorPhotoURL: string;
  content: string;
  parentCommentId: string | null;
  likeCount: number;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// === EXAM ROUTINE ===
export interface ExamRoutine {
  id: string;
  universityId: string;
  departmentId: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  examDate: Timestamp;
  startTime: string;
  endTime: string;
  room: string;
  building: string;
  examType: "midterm" | "final" | "quiz" | "lab";
  semester: string;
  year: number;
  isActive: boolean;
  createdAt: Timestamp;
}

// === CAREER ===
export interface Job {
  id: string;
  universityId: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: "full-time" | "part-time" | "remote" | "hybrid";
  salary: string;
  description: string;
  requirements: string[];
  applyLink: string;
  deadline: Timestamp;
  isActive: boolean;
  createdAt: Timestamp;
}

export interface Internship {
  id: string;
  universityId: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  applyLink: string;
  deadline: Timestamp;
  isActive: boolean;
  createdAt: Timestamp;
}

// === NOTIFICATIONS ===
export interface UserNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  titleBn: string;
  message: string;
  messageBn: string;
  link: string;
  read: boolean;
  createdAt: Timestamp;
}

export type NotificationType =
  | "material"
  | "exam"
  | "assignment"
  | "announcement"
  | "community"
  | "achievement"
  | "system";

// === STUDY ANALYTICS ===
export interface StudyLog {
  id: string;
  userId: string;
  date: string;
  totalMinutes: number;
  courses: { courseId: string; minutes: number }[];
  aiToolsUsed: string[];
  materialsViewed: string[];
  createdAt: Timestamp;
}

// === ACHIEVEMENTS ===
export interface Achievement {
  id: string;
  type: string;
  name: string;
  nameBn: string;
  description: string;
  descriptionBn: string;
  icon: string;
  unlockedAt: Timestamp;
}

// === AI ===
export type AITool =
  | "study-planner"
  | "quiz"
  | "flashcards"
  | "tutor"
  | "pdf-summary"
  | "schedule"
  | "gpa-prediction"
  | "mentor"
  | "teacher"
  | "voice-tutor"
  | "interview-coach"
  | "code-reviewer"
  | "assignment-feedback"
  | "exam-strategy"
  | "research"
  | "career-coach"
  | "resume-reviewer";

export interface AIUsage {
  date: string;
  counts: Partial<Record<AITool, number>>;
  totalTokensUsed: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface StudyPlanDay {
  date: string;
  dayOfWeek: string;
  blocks: StudyBlock[];
  totalHours: number;
}

export interface StudyBlock {
  courseCode: string;
  courseTitle: string;
  topic: string;
  startTime: string;
  endTime: string;
  duration: number;
  priority: "high" | "medium" | "low";
  type: "study" | "review" | "practice" | "break";
}

// === ADMIN ===
export interface AdminLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  target: string;
  targetId: string;
  details: string;
  createdAt: Timestamp;
}

export interface ModerationItem {
  id: string;
  contentType: "post" | "comment";
  contentId: string;
  content: string;
  authorId: string;
  authorName: string;
  reason: string;
  aiScore: number;
  status: "pending" | "approved" | "removed";
  reviewedBy: string | null;
  reviewedAt: Timestamp | null;
  createdAt: Timestamp;
}

// === SESSION / SECURITY ===
export interface UserSession {
  id: string;
  userId: string;
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string;
  os: string;
  ipHash: string;
  location: string;
  lastActive: Timestamp;
  createdAt: Timestamp;
  isActive: boolean;
}

// === ANNOUNCEMENTS ===
export interface Announcement {
  id: string;
  universityId: string;
  title: string;
  titleBn: string;
  content: string;
  contentBn: string;
  priority: "low" | "medium" | "high" | "urgent";
  targetDepartments: string[];
  targetSemesters: number[];
  isActive: boolean;
  expiresAt: Timestamp | null;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// === BOOKMARK ===
export interface Bookmark {
  id: string;
  userId: string;
  targetType: "course" | "material" | "post";
  targetId: string;
  title: string;
  createdAt: Timestamp;
}

// === QUICK NOTES ===
export interface QuickNote {
  id: string;
  userId: string;
  title: string;
  content: string;
  courseId: string | null;
  color: string;
  isPinned: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// === STUDY GROUP ===
export interface StudyGroup {
  id: string;
  universityId: string;
  name: string;
  description: string;
  courseId: string | null;
  createdBy: string;
  memberCount: number;
  maxMembers: number;
  isActive: boolean;
  createdAt: Timestamp;
}
