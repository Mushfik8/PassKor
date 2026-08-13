"use client";

// ================================================================
// StudentOS — Login Page
// Email/Password, Google OAuth button, error states, and responsive styling
// ================================================================

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
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
          <CardTitle className="text-2xl font-bold">{t("auth.login")}</CardTitle>
          <CardDescription className="text-sm">
            Welcome back! Enter your university credentials to continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-lg bg-[var(--color-destructive)]/10 border border-[var(--color-destructive)]/20 p-3 text-xs text-[var(--color-destructive)]">
              {error}
            </div>
          )}

          {/* Google Sign-in */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2.5 h-11 text-sm font-medium"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            {t("auth.continueWithGoogle")}
          </Button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[var(--border)] w-full" />
            <span className="bg-[var(--card)] px-3 text-[11px] uppercase tracking-wider text-[var(--muted-foreground)]">
              {t("auth.orContinueWith")}
            </span>
          </div>

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

            <div className="space-y-1">
              <Input
                label={t("auth.password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-4 w-4" />}
                iconRight={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 hover:text-[var(--foreground)] transition-colors cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                required
              />
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[var(--color-primary)] hover:underline"
                >
                  {t("auth.forgotPassword")}
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              className="w-full h-11 text-base font-semibold"
              isLoading={isLoading}
            >
              {t("auth.signIn")} <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-[var(--border)] pt-4">
          <p className="text-sm text-[var(--muted-foreground)]">
            {t("auth.noAccount")}{" "}
            <Link
              href="/register"
              className="font-semibold text-[var(--color-primary)] hover:underline"
            >
              {t("auth.signUp")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
