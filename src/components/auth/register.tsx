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

export default function Register() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Deine E-Mail Adresse" />
      <Input placeholder="Dein Nutzername" />
      <Input type="password" placeholder="Dein Passwort" />
      <Input type="password" placeholder="Wiederhole dein Passwort" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Dein Geburtsdatum"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-accent has-[[aria-checked=true]]:bg-accent-muted">
        <Checkbox
          id="terms"
          className="data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white"
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
  );
}
