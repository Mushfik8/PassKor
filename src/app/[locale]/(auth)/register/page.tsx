"use client";

// ================================================================
// StudentOS — Multi-Step Registration Page
// Step 1: Account -> Step 2: University -> Step 3: Profile
// ================================================================

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  GraduationCap,
  Building,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function RegisterPage() {
  const t = useTranslations();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    universityId: "aiub",
    department: "cse",
    studentId: "",
    displayName: "",
    phone: "",
    semester: "6",
  });
  const [error, setError] = useState("");

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all account fields.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.studentId) {
        setError("Please enter your Student ID.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.displayName) {
        setError("Please enter your full name.");
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        router.push("/dashboard");
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Card className="border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-3">
          <CardTitle className="text-2xl font-bold">{t("auth.register")}</CardTitle>
          <CardDescription className="text-sm">
            {t("auth.step", { current: step, total: 3 })}:{" "}
            {step === 1 ? "Account Credentials" : step === 2 ? "University Details" : "Personal Profile"}
          </CardDescription>
          <div className="pt-2">
            <Progress value={(step / 3) * 100} variant="gradient" />
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="rounded-lg bg-[var(--color-destructive)]/10 border border-[var(--color-destructive)]/20 p-3 text-xs text-[var(--color-destructive)] mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleNext} className="space-y-4">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3.5"
                >
                  <Input
                    label={t("auth.email")}
                    type="email"
                    placeholder="e.g. 21-45678-1@student.aiub.edu"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    icon={<Mail className="h-4 w-4" />}
                    required
                  />

                  <Input
                    label={t("auth.password")}
                    type="password"
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    icon={<Lock className="h-4 w-4" />}
                    required
                  />

                  <Input
                    label={t("auth.confirmPassword")}
                    type="password"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    icon={<Lock className="h-4 w-4" />}
                    required
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3.5"
                >
                  <Select
                    label={t("auth.selectUniversity")}
                    value={formData.universityId}
                    onChange={(e) => updateField("universityId", e.target.value)}
                    icon={<GraduationCap className="h-4 w-4" />}
                  >
                    <option value="aiub">American International University-Bangladesh (AIUB)</option>
                    <option value="nsu" disabled>North South University (NSU) - Coming Soon</option>
                    <option value="brac" disabled>BRAC University (BRACU) - Coming Soon</option>
                  </Select>

                  <Select
                    label={t("auth.selectDepartment")}
                    value={formData.department}
                    onChange={(e) => updateField("department", e.target.value)}
                    icon={<Building className="h-4 w-4" />}
                  >
                    <option value="cse">Computer Science & Engineering (CSE)</option>
                    <option value="cs">Computer Science (CS)</option>
                    <option value="se">Software Engineering (SE)</option>
                    <option value="eee">Electrical & Electronic Engineering (EEE)</option>
                    <option value="bba">Bachelor of Business Administration (BBA)</option>
                    <option value="eng">English Literature & Linguistics</option>
                  </Select>

                  <Input
                    label={t("auth.studentId")}
                    placeholder="e.g. 21-45678-1"
                    value={formData.studentId}
                    onChange={(e) => updateField("studentId", e.target.value)}
                    icon={<User className="h-4 w-4" />}
                    required
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3.5"
                >
                  <Input
                    label="Full Name"
                    placeholder="e.g. Mushfikur Rahman"
                    value={formData.displayName}
                    onChange={(e) => updateField("displayName", e.target.value)}
                    icon={<User className="h-4 w-4" />}
                    required
                  />

                  <Input
                    label={t("auth.phone")}
                    placeholder="e.g. +880 1712 345678"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    icon={<Phone className="h-4 w-4" />}
                  />

                  <Select
                    label={t("auth.selectSemester")}
                    value={formData.semester}
                    onChange={(e) => updateField("semester", e.target.value)}
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={`${i + 1}`}>
                        Semester {i + 1}
                      </option>
                    ))}
                  </Select>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 pt-2">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(step - 1)}
                  disabled={isLoading}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </Button>
              )}
              <Button
                type="submit"
                variant="gradient"
                className="flex-1 h-11 text-sm font-semibold"
                isLoading={isLoading}
              >
                {step === 3 ? (
                  <>
                    Complete Signup <CheckCircle2 className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    Continue <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-[var(--border)] pt-4">
          <p className="text-sm text-[var(--muted-foreground)]">
            {t("auth.hasAccount")}{" "}
            <Link
              href="/login"
              className="font-semibold text-[var(--color-primary)] hover:underline"
            >
              {t("auth.signIn")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
