"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import AuthAPI from "@/lib/api/auth/auth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const authAPI = new AuthAPI();
  const isAuthenticated = authAPI.isAuthenticated();

  // perform redirect inside useEffect to avoid state updates during render
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/catalog");
    }
  }, [isAuthenticated, router]);

  // don't render the auth form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-12 py-8 gap-4">
      <div>
        <Image src="/reader-logo.png" width={150} height={150} alt="Logo" />
      </div>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="w-full justify-center mb-4">
          <TabsTrigger value="login">Anmelden</TabsTrigger>
          <TabsTrigger value="register">Registrieren</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="register">
          <Register />
        </TabsContent>
      </Tabs>
      <div className="mt-auto">
        <Image src="/Reeda_Logo_v2.png" width={300} height={300} alt="Logo" />
      </div>
    </div>
  );
}
