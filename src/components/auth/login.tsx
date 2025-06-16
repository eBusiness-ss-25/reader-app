"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Bitte gib eine gültige E-Mail Adresse ein" }),
  password: z.string().min(1, { message: "Bitte gib dein Passwort ein" }),
});
import AuthAPI from '@/lib/api/auth/auth';
import { useRouter } from 'next/navigation'
import Loading from '../common/Loading';

export default function Login() {
  const router = useRouter();
  const authAPI = new AuthAPI();

  const [values, setValues] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  // Local state to track loading status
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof typeof values, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof typeof values;
        if (touched[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  }, [values, touched]);

  const loginUser = async () => {
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      return;
    }
    // Reset server error and show loader
    setServerError(null);
    setIsLoading(true);
    try {
      await authAPI.login(result.data.email, result.data.password);
      router.push("/catalog");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
          setServerError("Ung\u00fcltige E-Mail oder Passwort.");
        } else if (status && status >= 400 && status < 500) {
          setServerError("Deine Eingaben sind nicht korrekt.");
        } else if (status && status >= 500) {
          setServerError(
            "Interner Serverfehler. Bitte versuche es sp\u00e4ter erneut."
          );
        } else {
          setServerError(
            "Unbekannter Fehler. Bitte versuche es sp\u00e4ter erneut."
          );
        }
      } else {
        setServerError(
          "Unbekannter Fehler. Bitte versuche es sp\u00e4ter erneut."
        );
      }
    } finally {
      // Hide loader once API call finishes
      setIsLoading(false);
    }
  };

  // If loading, render the full-screen loader overlay
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="E-Mail"
        value={values.email}
        aria-invalid={!!errors.email}
        onChange={(e) => {
          setTouched((prev) => ({ ...prev, email: true }));
          setValues((prev) => ({ ...prev, email: e.target.value }));
        }}
      />
      {errors.email && (
        <p className="text-destructive text-sm">{errors.email}</p>
      )}
      <Input
        type="password"
        placeholder="Passwort"
        value={values.password}
        aria-invalid={!!errors.password}
        onChange={(e) => {
          setTouched((prev) => ({ ...prev, password: true }));
          setValues((prev) => ({ ...prev, password: e.target.value }));
        }}
      />
      {errors.password && (
        <p className="text-destructive text-sm">{errors.password}</p>
      )}
      {serverError && (
        <p className="text-destructive text-sm">{serverError}</p>
      )}
      <Button onClick={loginUser}>Anmelden</Button>
    </div>
  );
}
