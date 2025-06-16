"use client";
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '@/components/ui/label';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center px-12 py-8 gap-4">
      <div>
        <Image src="/reader-logo.jpeg" width={150} height={150} alt='Logo' />
      </div>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className='w-full justify-center'>
          <TabsTrigger value="login">Anmelden</TabsTrigger>
          <TabsTrigger value="register">Registrieren</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <div className="flex flex-col gap-4">
            <Input placeholder="E-Mail" />
            <Input type="password" placeholder="Passwort" />
            <Button>Anmelden</Button>
          </div>
        </TabsContent>
        <TabsContent value="register">
          <div className="flex flex-col gap-4">
            <Input placeholder="Deine E-Mail Adresse" />
            <Input placeholder="Dein Nutzername" />
            <Input type="password" placeholder="Dein Passwort" />
            <Input type="password" placeholder="Wiederhole dein Passwort" />
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
              <Checkbox
                id="terms"
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
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

            <Button>Registrieren</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
