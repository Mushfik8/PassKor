"use client";

// ================================================================
// StudentOS — Community & Study Network
// Peer discussions, Q&A, study groups, project partner finder,
// likes, comments, and topic categorization
// ================================================================

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  Search,
  Filter,
  Flame,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface PostItem {
  id: string;
  authorName: string;
  authorDepartment: string;
  timeAgo: string;
  title: string;
  content: string;
  type: "discussion" | "question" | "partner";
  tags: string[];
  likes: number;
  comments: number;
  isLiked?: boolean;
}

const INITIAL_POSTS: PostItem[] = [
  {
    id: "p1",
    authorName: "Tanvir Ahmed",
    authorDepartment: "CSE · 7th Sem",
    timeAgo: "2h ago",
    title: "Looking for 2 members for Capstone Project (AI / HealthTech)",
    content: "We're building an AI diagnostic assistant for local clinic routine data. Need members experienced in Next.js/FastAPI or PyTorch. Drop your contact or DM!",
    type: "partner",
    tags: ["Capstone", "AI", "FastAPI", "React"],
    likes: 18,
    comments: 7,
  },
  {
    id: "p2",
    authorName: "Nafisa Kamal",
    authorDepartment: "CSE · 5th Sem",
    timeAgo: "4h ago",
    title: "How to properly prepare for Dr. XYZ's Algorithms Midterm?",
    content: "Is focusing on CLRS dynamic programming examples sufficient, or should we practice LeetCode medium DP problems as well? Any past tips from seniors appreciated!",
    type: "question",
    tags: ["Algorithms", "CSC4101", "ExamPrep"],
    likes: 24,
    comments: 12,
  },
  {
    id: "p3",
    authorName: "Mushfik Rahman",
    authorDepartment: "CSE · 6th Sem",
    timeAgo: "1d ago",
    title: "Compiled Lecture Slides & Solved Past Papers for EEE 2201",
    content: "Organized all 12 lecture summaries, K-map shortcuts, and previous 3 semesters' midterm questions in one folder on StudentOS Materials. Check it out!",
    type: "discussion",
    tags: ["EEE2201", "Notes", "SolvedPapers"],
    likes: 56,
    comments: 19,
  },
  {
    id: "p4",
    authorName: "Sabbir Hossain",
    authorDepartment: "SE · 4th Sem",
    timeAgo: "2d ago",
    title: "Study Group for Operating Systems (Spring 2026)",
    content: "Setting up a weekend Google Meet revision session for CPU Scheduling and Deadlock Banker's Algorithm. Anyone welcome to join!",
    type: "partner",
    tags: ["OS", "StudyGroup", "CSC3203"],
    likes: 15,
    comments: 8,
  },
];

export default function CommunityPage() {
  const t = useTranslations();
  const [posts, setPosts] = useState<PostItem[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  // New post form state
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newType, setNewType] = useState<"discussion" | "question" | "partner">("discussion");
  const [newTags, setNewTags] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const created: PostItem = {
      id: `p-${Date.now()}`,
      authorName: "Mushfik Rahman",
      authorDepartment: "CSE · 6th Sem",
      timeAgo: "Just now",
      title: newTitle,
      content: newContent,
      type: newType,
      tags: newTags ? newTags.split(",").map((t) => t.trim()) : ["General"],
      likes: 0,
      comments: 0,
    };

    setPosts([created, ...posts]);
    setNewTitle("");
    setNewContent("");
    setNewTags("");
    setIsNewPostOpen(false);
  };

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "all" || p.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("community.title")}
          </h1>
          <p className="text-[var(--muted-foreground)] mt-1 text-sm">
            Discuss coursework, form study groups, and find project partners with fellow university students.
          </p>
        </div>
        <Button
          variant="gradient"
          onClick={() => setIsNewPostOpen(true)}
          className="gap-1.5 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          {t("community.newPost")}
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search discussions & questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {["all", "Capstone", "Algorithms", "EEE2201", "OS"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedTag === tag
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {tag === "all" ? "All Topics" : `#${tag}`}
            </button>
          ))}
        </div>
      </div>

      {/* Feed & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="border-[var(--border)] p-5 space-y-4">
              {/* Post Author Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={post.authorName} size="md" />
                  <div>
                    <h4 className="text-sm font-semibold">{post.authorName}</h4>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {post.authorDepartment} · {post.timeAgo}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={
                    post.type === "partner"
                      ? "gradient"
                      : post.type === "question"
                      ? "warning"
                      : "secondary"
                  }
                >
                  {post.type.toUpperCase()}
                </Badge>
              </div>

              {/* Title & Content */}
              <div>
                <h3 className="text-base font-bold text-[var(--foreground)] mb-1.5">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-0.5 rounded-full"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)]">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                    post.isLiked ? "text-[var(--color-primary)] font-semibold" : "hover:text-[var(--foreground)]"
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likes} Likes</span>
                </button>

                <button className="flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors cursor-pointer">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments} Replies</span>
                </button>

                <button className="flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors cursor-pointer">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Right Sidebar Widget (1/3) */}
        <div className="space-y-4">
          <Card className="border-[var(--border)] p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
              <Flame className="h-4 w-4 text-orange-500" />
              Trending Discussions
            </h3>
            <div className="space-y-3 text-xs">
              <div className="cursor-pointer hover:text-[var(--color-primary)] transition-colors">
                <p className="font-medium text-[var(--foreground)]">Capstone Project Guidelines 2026</p>
                <span className="text-[var(--muted-foreground)]">34 replies · 120 views</span>
              </div>
              <div className="cursor-pointer hover:text-[var(--color-primary)] transition-colors">
                <p className="font-medium text-[var(--foreground)]">AIUB Midterm Exam Routine Released</p>
                <span className="text-[var(--muted-foreground)]">88 replies · 450 views</span>
              </div>
              <div className="cursor-pointer hover:text-[var(--color-primary)] transition-colors">
                <p className="font-medium text-[var(--foreground)]">Best electives for Software Engineering track?</p>
                <span className="text-[var(--muted-foreground)]">21 replies · 95 views</span>
              </div>
            </div>
          </Card>

          <Card className="border-[var(--color-primary)]/20 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 p-5">
            <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
              Community Code of Conduct
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Help each other grow. Be respectful, refrain from sharing unapproved exam answers during active tests, and tag your courses accurately.
            </p>
          </Card>
        </div>
      </div>

      {/* New Post Dialog */}
      <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Community Post</DialogTitle>
            <DialogDescription>
              Share notes, ask academic questions, or invite project collaborators.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreatePost} className="space-y-4 my-2">
            <Input
              label="Post Title"
              placeholder="e.g. Tips for solving dynamic programming recurrence relations..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Post Category</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="flex h-11 w-full appearance-none rounded-lg border border-[var(--input)] bg-[var(--card)] px-3.5 py-2 text-sm text-[var(--foreground)] cursor-pointer"
              >
                <option value="discussion">General Discussion</option>
                <option value="question">Academic Question (Q&A)</option>
                <option value="partner">Project Partner / Study Group</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Content Details</label>
              <textarea
                rows={4}
                placeholder="Explain in detail..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full rounded-lg border border-[var(--input)] bg-transparent p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                required
              />
            </div>

            <Input
              label="Tags (comma separated)"
              placeholder="e.g. CSC4101, Algorithms, Midterm"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsNewPostOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="gradient">
                Publish Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
