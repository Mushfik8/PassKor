"use client";

// ================================================================
// StudentOS — Forgot Password Page
// Reset request form with animated success state
// ================================================================

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Card className="border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold">{t("auth.resetPassword")}</CardTitle>
          <CardDescription className="text-sm">
            {isSubmitted
              ? "Instructions sent! Check your inbox."
              : "Enter your registered email address to receive password reset instructions."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-4 space-y-3"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-success)]/10 text-[var(--color-success)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                We sent a password reset link to <strong className="text-[var(--foreground)]">{email}</strong>.
              </p>
              <Button
                variant="outline"
                className="mt-2 text-xs"
                onClick={() => setIsSubmitted(false)}
              >
                Send to a different email
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t("auth.email")}
                type="email"
                placeholder="e.g. 21-45678-1@student.aiub.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-4 w-4" />}
                required
              />

              <Button
                type="submit"
                variant="gradient"
                className="w-full h-11 text-base font-semibold"
                isLoading={isLoading}
              >
                {t("auth.resetPassword")} <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex justify-center border-t border-[var(--border)] pt-4">
          <Link
            href="/login"
            className="inline-flex items-center text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Login
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
