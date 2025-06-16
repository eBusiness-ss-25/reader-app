"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button>Anmelden</Button>
    </div>
  );
}
