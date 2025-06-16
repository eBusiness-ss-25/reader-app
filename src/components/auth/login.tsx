"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AuthAPI from '@/lib/api/auth/auth';
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const authAPI = new AuthAPI();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    authAPI.login(
      email,
      password,
    ).then(() => {
      router.push('/catalog');
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={loginUser}>Anmelden</Button>
    </div>
  );
}
