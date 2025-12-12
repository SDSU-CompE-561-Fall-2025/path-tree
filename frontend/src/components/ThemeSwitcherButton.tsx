"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SurpriseOverlay } from "./SurpriseOverlay"; // import overlay

export function ThemeSwitcherButton() {
  const { setTheme, theme } = useTheme();
  const [flashOverlay, setFlashOverlay] = useState<"light" | "dark" | null>(null);
  const [triggerOverlay, setTriggerOverlay] = useState(false);

  const handleSetTheme = (newTheme: "light" | "dark" | "system") => {
    if (newTheme !== theme) {
      // Step 1: set target theme for overlay
      if (newTheme === "light" || newTheme === "dark") {
        setFlashOverlay(newTheme);
        setTriggerOverlay(true);
      }

      // Step 2: theme switch happens inside SurpriseOverlay via onFlash callback
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleSetTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSetTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSetTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Surprise overlay handles zap + flash */}
      {flashOverlay && (
        <SurpriseOverlay
          trigger={triggerOverlay}
          targetTheme={flashOverlay}
          onFlash={() => {
            setTheme(flashOverlay);
            setTriggerOverlay(false); // reset trigger
          }}
        />
      )}
    </>
  );
}
