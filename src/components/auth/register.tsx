"use client";

import { useState } from "react";
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
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const registerUser = () => {
    authAPI.register(
      username,
      email,
      password,
      birthDate || new Date()
    ).then(() => {
      authAPI.login(email, password).then(() => {
        router.push('/katalog');
      });
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Deine E-Mail Adresse" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Dein Nutzername" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input type="password" placeholder="Dein Passwort" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input type="password" placeholder="Wiederhole dein Passwort" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {birthDate ? birthDate.toLocaleDateString() : "Dein Geburtsdatum"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={birthDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              setBirthDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-accent has-[[aria-checked=true]]:bg-accent-muted">
        <Checkbox
          id="terms"
          className="data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white"
          checked={termsAccepted}
          onCheckedChange={() => setTermsAccepted(!termsAccepted)}
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
      <Button onClick={registerUser}>Registrieren</Button>
    </div>
  );
}
