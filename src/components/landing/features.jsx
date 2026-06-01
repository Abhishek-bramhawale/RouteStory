"use client";

import { motion } from "framer-motion";
import {
  Download,
  Map,
  Palette,
  Route,
  Share2,
  Video,
} from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { icon: Route, title: "Animated Travel Routes", desc: "Smooth path drawing with professional easing." },
  { icon: Map, title: "Car, Plane, Train and Bike Modes", desc: "Pick the perfect vehicle for your journey." },
  { icon: Video, title: "HD Video Export", desc: "Export MP4/WebM directly in your browser." },
  { icon: Palette, title: "Beautiful Route Visualization", desc: "Custom colors, thickness, and styling." },
  { icon: Share2, title: "Social Media Ready", desc: "Perfect aspect ratios for Reels and Shorts." },
  { icon: Download, title: "One Click Sharing", desc: "Download and share your story instantly." },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Everything you need</h2>
          <p className="mt-4 text-[var(--color-muted-foreground)]">
            Professional route animations without complex video editing
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-lg hover:shadow-[var(--color-primary)]/10">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                    <f.icon className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.desc}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
