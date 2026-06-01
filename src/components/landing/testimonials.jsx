"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Travel Creator",
    text: "RouteStory turned my Japan trip into a viral Reel. The animations look incredibly professional.",
  },
  {
    name: "Marcus Rivera",
    role: "YouTuber",
    text: "I used to spend hours in After Effects. Now I create route videos in under a minute.",
  },
  {
    name: "Emma Walsh",
    role: "Digital Nomad",
    text: "The plane and train modes are gorgeous. My followers always ask how I make these.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[var(--color-muted)]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Loved by creators</h2>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <p className="text-[var(--color-muted-foreground)]">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-6">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
