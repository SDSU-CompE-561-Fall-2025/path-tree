"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface SurpriseOverlayProps {
  trigger: boolean;
  onFlash?: () => void;
}

export function SurpriseOverlay({ trigger, onFlash }: SurpriseOverlayProps) {
  const [showIcon, setShowIcon] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (trigger) {
      // Step 2: show icon
      setShowIcon(true);

      const iconTimer = setTimeout(() => {
        setShowIcon(false);

        // Step 3: switch theme + show overlay
        if (onFlash) onFlash();
        setShowOverlay(true);

        const overlayTimer = setTimeout(() => {
          setShowOverlay(false);
        }, 3000);

        return () => clearTimeout(overlayTimer);
      }, 500);

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
        <div className="fixed inset-0 bg-white animate-surprise-fade pointer-events-none z-40" />
      )}
    </>
  );
}
