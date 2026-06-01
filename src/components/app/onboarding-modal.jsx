"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OnboardingModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("routestory-onboarded");
    if (!seen) setOpen(true);
  }, []);

  const close = () => {
    localStorage.setItem("routestory-onboarded", "1");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass max-w-md rounded-2xl p-8 shadow-2xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10">
              <Sparkles className="h-6 w-6 text-[var(--color-primary)]" />
            </div>
            <h2 className="text-xl font-bold">Welcome to RouteStory</h2>
            <p className="mt-2 text-[var(--color-muted-foreground)]">
              Create beautiful animated travel routes in four easy steps.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                Search start and destination locations
              </li>
              <li className="flex gap-3">
                <Keyboard className="h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                Press <kbd className="rounded bg-[var(--color-muted)] px-1.5">Space</kbd> to play animation
              </li>
            </ul>
            <Button className="mt-8 w-full" onClick={close}>
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
