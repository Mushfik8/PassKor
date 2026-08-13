"use client";

// ================================================================
// StudentOS — Premium Landing Page
// Hero, Features, Why, Stats, Pricing, FAQ, CTA
// ================================================================

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Brain,
  BookOpen,
  Calculator,
  MessageCircle,
  Users,
  Briefcase,
  Play,
  Check,
  X,
  ChevronDown,
  Star,
  Sparkles,
  Zap,
  Shield,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingFooter } from "@/components/landing/landing-footer";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
};

const staggerChild = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

export function LandingPage() {
  const t = useTranslations();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <LandingNav />

      {/* === HERO === */}
      <HeroSection t={t} />

      {/* === FEATURES === */}
      <FeaturesSection t={t} />

      {/* === WHY STUDENTOS === */}
      <WhySection t={t} />

      {/* === STATS === */}
      <StatsSection t={t} />

      {/* === PRICING === */}
      <PricingSection t={t} />

      {/* === FAQ === */}
      <FAQSection t={t} />

      {/* === FINAL CTA === */}
      <CTASection t={t} />

      <LandingFooter />
    </div>
  );
}

// ────────────────────────────────────────────────
// HERO SECTION
// ────────────────────────────────────────────────
function HeroSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[var(--color-primary)] opacity-[0.04] blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-4 py-1.5 text-sm font-medium text-[var(--color-primary)] mb-6"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI-Powered Student Platform</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          {t("landing.heroTitle").split(",")[0]},{" "}
          <span className="gradient-text">
            {t("landing.heroTitle").split(",")[1] || "Powered by AI"}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg sm:text-xl text-[var(--muted-foreground)] leading-relaxed mb-8"
        >
          {t("landing.heroSubtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link href="/register">
            <Button variant="gradient" size="xl" className="min-w-[200px] text-base">
              {t("common.getStarted")} <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="xl" className="min-w-[200px] text-base gap-2">
            <Play className="h-4 w-4 fill-current" />
            {t("landing.watchDemo")}
          </Button>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--secondary)] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 rounded-lg bg-[var(--background)] px-4 py-1.5 text-xs text-[var(--muted-foreground)]">
                  <Shield className="h-3 w-3 text-green-500" />
                  studentos.app/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard mockup content */}
            <div className="p-6 sm:p-8 min-h-[300px] sm:min-h-[400px]">
              {/* Greeting */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">Good Evening, Mushfik 👋</h2>
                <p className="text-sm text-[var(--muted-foreground)]">Your CGPA is on track! Keep going 🎯</p>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "CGPA", value: "3.72", icon: "📊", color: "from-indigo-500/10 to-purple-500/10" },
                  { label: "Credits", value: "98/156", icon: "📚", color: "from-blue-500/10 to-cyan-500/10" },
                  { label: "Streak", value: "7 days", icon: "🔥", color: "from-orange-500/10 to-red-500/10" },
                  { label: "AI Used", value: "8/10", icon: "🧠", color: "from-violet-500/10 to-fuchsia-500/10" },
                ].map((stat) => (
                  <div key={stat.label} className={cn("rounded-xl bg-gradient-to-br p-4 border border-[var(--border)]", stat.color)}>
                    <div className="text-lg mb-1">{stat.icon}</div>
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Chart placeholder */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[var(--border)] p-4">
                  <h3 className="text-sm font-semibold mb-3">Weekly Progress</h3>
                  <div className="flex items-end gap-1 h-20">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)]" style={{ height: `${h}%`, opacity: 0.3 + (h / 100) * 0.7 }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-[var(--muted-foreground)]">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>
                <div className="rounded-xl border border-[var(--border)] p-4">
                  <h3 className="text-sm font-semibold mb-3">Today&apos;s Classes</h3>
                  <div className="space-y-2.5">
                    {[
                      { time: "09:00", course: "CSC 4101", name: "Algorithms" },
                      { time: "11:00", course: "EEE 2201", name: "Circuits" },
                      { time: "02:00", course: "MAT 3101", name: "Linear Algebra" },
                    ].map((cls) => (
                      <div key={cls.time} className="flex items-center gap-3 text-sm">
                        <span className="text-xs font-mono text-[var(--muted-foreground)] w-12">{cls.time}</span>
                        <div className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                        <span className="font-medium">{cls.course}</span>
                        <span className="text-[var(--muted-foreground)] text-xs hidden sm:inline">— {cls.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient glow behind mockup */}
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-[var(--color-primary)]/10 via-[var(--color-accent)]/10 to-[var(--color-primary)]/10 blur-2xl" />
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-[var(--muted-foreground)]"
        >
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-[var(--background)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]" style={{ opacity: 0.6 + i * 0.1 }} />
            ))}
          </div>
          <span>{t("landing.trustedBy", { count: "1,000" })}</span>
          <div className="flex items-center gap-0.5 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
            <span className="ml-1 text-[var(--foreground)] font-semibold">4.9</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// FEATURES SECTION
// ────────────────────────────────────────────────
function FeaturesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  const features = [
    { icon: Brain, titleKey: "feature1Title", descKey: "feature1Desc", color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { icon: BookOpen, titleKey: "feature2Title", descKey: "feature2Desc", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Calculator, titleKey: "feature3Title", descKey: "feature3Desc", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: MessageCircle, titleKey: "feature4Title", descKey: "feature4Desc", color: "text-violet-500", bg: "bg-violet-500/10" },
    { icon: Users, titleKey: "feature5Title", descKey: "feature5Desc", color: "text-orange-500", bg: "bg-orange-500/10" },
    { icon: Briefcase, titleKey: "feature6Title", descKey: "feature6Desc", color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {t("landing.featuresTitle")}
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
            From AI-powered study planning to career coaching — everything in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 card-interactive"
            >
              {/* Icon */}
              <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl mb-5", feature.bg)}>
                <feature.icon className={cn("h-6 w-6", feature.color)} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">
                {t(`landing.${feature.titleKey}`)}
              </h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {t(`landing.${feature.descKey}`)}
              </p>

              {/* Hover gradient border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-br from-[var(--color-primary)]/30 to-[var(--color-accent)]/30 mask-border" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// WHY STUDENTOS SECTION
// ────────────────────────────────────────────────
function WhySection({ t }: { t: ReturnType<typeof useTranslations> }) {
  const comparisons = [
    { beforeKey: "why1Before", afterKey: "why1After" },
    { beforeKey: "why2Before", afterKey: "why2After" },
    { beforeKey: "why3Before", afterKey: "why3After" },
    { beforeKey: "why4Before", afterKey: "why4After" },
    { beforeKey: "why5Before", afterKey: "why5After" },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[var(--secondary)]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {t("landing.whyTitle")}
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center text-sm font-semibold text-[var(--color-destructive)]">
              {t("landing.whyBefore")} ❌
            </div>
            <div className="text-center text-sm font-semibold text-[var(--color-success)]">
              {t("landing.whyAfter")} ✅
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-3">
            {comparisons.map((row, i) => (
              <motion.div
                key={row.beforeKey}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center gap-3 rounded-xl border border-red-500/10 bg-red-500/5 p-4 text-sm">
                  <X className="h-4 w-4 text-red-500 shrink-0" />
                  <span className="text-[var(--muted-foreground)]">
                    {t(`landing.${row.beforeKey}`)}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-green-500/10 bg-green-500/5 p-4 text-sm">
                  <Check className="h-4 w-4 text-green-500 shrink-0" />
                  <span>
                    {t(`landing.${row.afterKey}`)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// STATS SECTION
// ────────────────────────────────────────────────
function StatsSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  const stats = [
    { value: 1000, suffix: "+", label: t("landing.statsStudents"), icon: "👥" },
    { value: 500, suffix: "+", label: t("landing.statsMaterials"), icon: "📚" },
    { value: 50000, suffix: "+", label: t("landing.statsAiQueries"), icon: "🤖" },
    { value: 4.9, suffix: "", label: t("landing.statsRating"), icon: "⭐", decimals: 1 },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center p-6 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)]"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </div>
              <div className="text-sm text-[var(--muted-foreground)]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// PRICING SECTION
// ────────────────────────────────────────────────
function PricingSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  const plans = [
    {
      name: t("landing.pricingFree"),
      price: t("landing.pricingFreePrice"),
      period: t("landing.pricingMonth"),
      popular: false,
      cta: t("common.getStarted"),
      features: [
        "Course management",
        "Study materials",
        "CGPA calculator",
        "Community access",
        "5 AI queries/day",
        "Basic analytics",
      ],
      notIncluded: [
        "Unlimited AI",
        "CV Builder (PDF)",
        "Priority support",
        "Offline PDFs",
      ],
    },
    {
      name: t("landing.pricingPro"),
      price: t("landing.pricingProPrice"),
      period: t("landing.pricingMonth"),
      popular: true,
      cta: t("common.getStarted"),
      features: [
        "Everything in Free",
        "Unlimited AI access",
        "AI Tutor & Mentor",
        "CV Builder (PDF export)",
        "Full study analytics",
        "Unlimited offline PDFs",
        "Priority support",
        "No ads",
      ],
      notIncluded: [],
    },
    {
      name: t("landing.pricingUniversity"),
      price: t("landing.pricingUniversityPrice"),
      period: "",
      popular: false,
      cta: t("landing.pricingContact"),
      features: [
        "Everything in Pro",
        "Admin panel",
        "Custom branding",
        "Class analytics",
        "Dedicated support",
        "API access",
        "Bulk onboarding",
        "SLA guarantee",
      ],
      notIncluded: [],
    },
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[var(--secondary)]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {t("landing.pricingTitle")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6 sm:p-8",
                plan.popular
                  ? "gradient-border bg-[var(--card)] shadow-xl scale-[1.02] lg:scale-105 z-10"
                  : "border-[var(--border)] bg-[var(--card)]"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] px-4 py-1 text-xs font-semibold text-white">
                    <Zap className="h-3 w-3" />
                    {t("landing.pricingPopular")}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-[var(--muted-foreground)]">{plan.period}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-[var(--color-success)] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--muted-foreground)]">
                    <X className="h-4 w-4 shrink-0 mt-0.5 opacity-40" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/register">
                <Button
                  variant={plan.popular ? "gradient" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// FAQ SECTION
// ────────────────────────────────────────────────
function FAQSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t("landing.faq1Q"), a: t("landing.faq1A") },
    { q: t("landing.faq2Q"), a: t("landing.faq2A") },
    { q: t("landing.faq3Q"), a: t("landing.faq3A") },
    { q: t("landing.faq4Q"), a: t("landing.faq4A") },
    { q: t("landing.faq5Q"), a: t("landing.faq5A") },
    { q: t("landing.faq6Q"), a: t("landing.faq6A") },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {t("landing.faqTitle")}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-left transition-colors hover:bg-[var(--secondary)]/50"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium pr-4">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-[var(--muted-foreground)] shrink-0 transition-transform duration-200",
                    openIndex === i && "rotate-180"
                  )}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-2 text-sm text-[var(--muted-foreground)] leading-relaxed">
                  {faq.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────
// CTA SECTION
// ────────────────────────────────────────────────
function CTASection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* Floating shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl animate-float" />
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...fadeInUp}>
          <Rocket className="h-12 w-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t("landing.ctaTitle")}
          </h2>
          <p className="text-white/70 text-lg mb-8">
            {t("landing.ctaSubtitle")}
          </p>
          <Link href="/register">
            <Button
              size="xl"
              className="bg-white text-[var(--color-primary)] hover:bg-white/90 shadow-2xl min-w-[220px] text-base font-semibold"
            >
              {t("common.getStarted")} <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
