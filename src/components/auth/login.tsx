"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Bitte gib eine gültige E-Mail Adresse ein" }),
  password: z.string().min(1, { message: "Bitte gib dein Passwort ein" }),
});
import AuthAPI from '@/lib/api/auth/auth';
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const authAPI = new AuthAPI();

  const [values, setValues] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof values, string>>>(
    {}
  );

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

  const loginUser = () => {
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      return;
    }
    authAPI.login(result.data.email, result.data.password).then(() => {
      router.push('/catalog');
    });
  };

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
      <Button onClick={loginUser}>Anmelden</Button>
    </div>
  );
}
