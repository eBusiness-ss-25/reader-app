"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="E-Mail" />
      <Input type="password" placeholder="Passwort" />
      <Button>Anmelden</Button>
    </div>
  );
}
