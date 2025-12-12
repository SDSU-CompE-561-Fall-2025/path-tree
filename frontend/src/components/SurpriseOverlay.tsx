"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface SurpriseOverlayProps {
  trigger: boolean;
  targetTheme: "light" | "dark";
  onFlash?: () => void;
}

export function SurpriseOverlay({ trigger, targetTheme, onFlash }: SurpriseOverlayProps) {
  const [showIcon, setShowIcon] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (trigger) {
      // Step 1: show zap icon
      setShowIcon(true);

      const iconTimer = setTimeout(() => {
        setShowIcon(false);

        // Step 2: trigger theme switch + overlay
        if (onFlash) onFlash();
        setShowOverlay(true);

        const overlayTimer = setTimeout(() => {
          setShowOverlay(false);
        }, 2000); // overlay lasts 2s

        return () => clearTimeout(overlayTimer);
      }, 500); // zap lasts 0.5s

      return () => clearTimeout(iconTimer);
    }
  }, [trigger, onFlash]);

  return (
    <>
      {showIcon && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Zap className="h-16 w-16 text-yellow-400 animate-ping" />
        </div>
      )}
      {showOverlay && (
        <div
          className={`fixed inset-0 ${
            targetTheme === "light" ? "bg-white" : "bg-black"
          } animate-surprise-fade pointer-events-none z-40`}
        />
      )}
    </>
  );
}
