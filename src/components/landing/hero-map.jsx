"use client";

import { useEffect, useRef } from "react";
import { easeInOutCubic } from "@/lib/utils";

const DEMO_ROUTES = [
  { from: [40.7, -74], to: [51.5, -0.1], color: "#6366f1" },
  { from: [48.8, 2.3], to: [35.6, 139.7], color: "#22d3ee" },
  { from: [-33.8, 151.2], to: [1.3, 103.8], color: "#a78bfa" },
];

export function HeroMap() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let raf;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const project = (lat, lng, w, h) => {
      const x = ((lng + 180) / 360) * w;
      const y = ((90 - lat) / 180) * h;
      return [x, y];
    };

    const draw = () => {
      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "rgba(99, 102, 241, 0.03)";
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.arc((i * 47) % w, (i * 31) % h, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      DEMO_ROUTES.forEach((route, ri) => {
        const t = ((frame * 0.003 + ri * 0.3) % 1);
        const eased = easeInOutCubic(t);
        const [x1, y1] = project(route.from[0], route.from[1], w, h);
        const [x2, y2] = project(route.to[0], route.to[1], w, h);
        const mx = (x1 + x2) / 2;
        const my = Math.min(y1, y2) - 40;

        ctx.strokeStyle = route.color + "40";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(mx, my, x2, y2);
        ctx.stroke();

        const px = (1 - eased) ** 2 * x1 + 2 * (1 - eased) * eased * mx + eased ** 2 * x2;
        const py = (1 - eased) ** 2 * y1 + 2 * (1 - eased) * eased * my + eased ** 2 * y2;

        ctx.fillStyle = route.color;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "16px sans-serif";
        ctx.fillText(ri === 0 ? "✈️" : ri === 1 ? "🚗" : "🚆", px - 8, py - 10);
      });

      frame++;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="glass h-full w-full overflow-hidden rounded-2xl shadow-2xl">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
