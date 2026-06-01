"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do I need a backend server?",
    a: "No. RouteStory runs entirely in your browser with Next.js Server Actions for routing. Deploy directly on Vercel.",
  },
  {
    q: "How does route generation work?",
    a: "We use OpenRouteService for real road routes. Without an API key, a smooth curved fallback route is generated.",
  },
  {
    q: "What video formats are supported?",
    a: "Export WebM natively. Most browsers also support MP4 via MediaRecorder.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. Free includes basic animations with a watermark. Pro removes the watermark and unlocks HD exports.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">FAQ</h2>
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
