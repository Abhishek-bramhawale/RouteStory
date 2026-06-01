import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "RouteStory — Animated Travel Route Videos",
  description:
    "Create stunning travel route animations in seconds. Perfect for Instagram Reels, YouTube Shorts, and trip sharing.",
  keywords: ["travel", "route animation", "map video", "instagram reels"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
