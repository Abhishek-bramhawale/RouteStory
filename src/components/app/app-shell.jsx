"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { ControlPanel } from "@/components/app/control-panel";
import { OnboardingModal } from "@/components/app/onboarding-modal";
import { RouteMap } from "@/components/app/route-map";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouteStore } from "@/store/route-store";

export function AppShell() {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const { animationSpeed, setIsAnimating: setStoreAnimating, coordinates } = useRouteStore();

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsAnimating(false);
    setStoreAnimating(false);
    setProgress(0);
  }, [setStoreAnimating]);

  const play = useCallback(() => {
    if (!coordinates.length) return;
    stop();
    setIsAnimating(true);
    setStoreAnimating(true);
    startRef.current = performance.now();
    const duration = 8000 / animationSpeed;

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setIsAnimating(false);
        setStoreAnimating(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [animationSpeed, coordinates.length, stop, setStoreAnimating]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space" && e.target.tagName !== "INPUT") {
        e.preventDefault();
        isAnimating ? stop() : play();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isAnimating, play, stop]);

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--color-border)] px-4 glass">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
          RouteStory
        </Link>
        <ThemeToggle />
      </header>

      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <div className="w-full shrink-0 md:w-80 lg:w-96 md:h-full md:overflow-hidden">
          <ControlPanel onPlay={play} onStop={stop} />
        </div>
        <main className="relative min-h-[50vh] flex-1 p-2 md:min-h-0 md:p-4">
          <RouteMap progress={progress} isAnimating={isAnimating} />
        </main>
      </div>

      <OnboardingModal />
    </div>
  );
}
