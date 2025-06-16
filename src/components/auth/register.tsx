"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Bitte gib eine gültige E-Mail Adresse ein" }),
    username: z.string().min(3, { message: "Dein Nutzername muss mindestens 3 Zeichen lang sein" }),
    password: z.string().min(6, { message: "Dein Passwort muss mindestens 6 Zeichen lang sein" }),
    confirmPassword: z.string().min(6, { message: "Dein Passwort muss mindestens 6 Zeichen lang sein" }),
    birthDate: z.date({ required_error: "Bitte wähle dein Geburtsdatum" }),
    termsAccepted: z.literal(true, { errorMap: () => ({ message: "Du musst den Nutzungsbedingungen zustimmen" }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Die Passwörter stimmen nicht überein",
    path: ["confirmPassword"],
  });
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import AuthAPI from '@/lib/api/auth/auth';
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter()
  const authAPI = new AuthAPI();

  const [open, setOpen] = useState(false);


  const [values, setValues] = useState<{
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    birthDate: Date | undefined;
    termsAccepted: boolean;
  }>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    birthDate: undefined,
    termsAccepted: false,
  });
  const [touched, setTouched] = useState({
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
    birthDate: false,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof values, string>>
  >({});
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const result = registerSchema.safeParse(values);
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

  const registerUser = async () => {
    const result = registerSchema.safeParse(values);
    if (!result.success) {
      return;
    }
    try {
      setServerError(null);
      await authAPI.register(
        result.data.username,
        result.data.email,
        result.data.password,
        result.data.birthDate
      );
      await authAPI.login(result.data.email, result.data.password);
      router.push("/catalog");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
          setServerError("Ung\u00fcltige Zugangsdaten.");
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
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Deine E-Mail Adresse"
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
        placeholder="Dein Nutzername"
        value={values.username}
        aria-invalid={!!errors.username}
        onChange={(e) => {
          setTouched((prev) => ({ ...prev, username: true }));
          setValues((prev) => ({ ...prev, username: e.target.value }));
        }}
      />
      {errors.username && (
        <p className="text-destructive text-sm">{errors.username}</p>
      )}
      <Input
        type="password"
        placeholder="Dein Passwort"
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
      <Input
        type="password"
        placeholder="Wiederhole dein Passwort"
        value={values.confirmPassword}
        aria-invalid={!!errors.confirmPassword}
        onChange={(e) => {
          setTouched((prev) => ({ ...prev, confirmPassword: true }));
          setValues((prev) => ({ ...prev, confirmPassword: e.target.value }));
        }}
      />
      {errors.confirmPassword && (
        <p className="text-destructive text-sm">{errors.confirmPassword}</p>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {values.birthDate
              ? values.birthDate.toLocaleDateString()
              : "Dein Geburtsdatum"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={values.birthDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              setTouched((prev) => ({ ...prev, birthDate: true }));
              setValues((prev) => ({ ...prev, birthDate: date || undefined }));
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {errors.birthDate && (
        <p className="text-destructive text-sm">{errors.birthDate}</p>
      )}
      <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-accent has-[[aria-checked=true]]:bg-accent-muted">
        <Checkbox
          id="terms"
          className="data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white"
          checked={values.termsAccepted}
          aria-invalid={!!errors.termsAccepted}
          onCheckedChange={() => {
            setTouched((prev) => ({ ...prev, termsAccepted: true }));
            setValues((prev) => ({ ...prev, termsAccepted: !prev.termsAccepted }));
          }}
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium">
            Ich stimme den Nutzungsbedingungen und der Datenschutzerklärung zu.
          </p>
          <p className="text-muted-foreground text-sm">
            Sprich bitte mit deinen Eltern, bevor du dich registrierst. Deine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
          </p>
        </div>
      </Label>
      {errors.termsAccepted && (
        <p className="text-destructive text-sm">{errors.termsAccepted}</p>
      )}
      {serverError && (
        <p className="text-destructive text-sm">{serverError}</p>
      )}
      <Button onClick={registerUser}>Registrieren</Button>
    </div>
  );
}
