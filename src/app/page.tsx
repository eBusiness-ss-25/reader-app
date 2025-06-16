"use client";
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-12 py-8 gap-4">
      <div>
        <Image src="/reader-logo.png" width={150} height={150} alt='Logo' />
      </div>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className='w-full justify-center'>
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
    </div>
  );
}
