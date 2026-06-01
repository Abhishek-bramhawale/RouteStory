"use client";

import { useTransition } from "react";
import {
  Download,
  Loader2,
  Play,
  RotateCcw,
  Square,
} from "lucide-react";
import { toast } from "sonner";
import { fetchRoute } from "@/actions/route";
import { LocationSearch } from "@/components/app/location-search";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { getVehicle, VEHICLES } from "@/lib/vehicles";
import { downloadBlob, exportMapVideo } from "@/lib/video-export";
import { useRouteStore } from "@/store/route-store";

export function ControlPanel({ onPlay, onStop, animationRef }) {
  const [isPending, startTransition] = useTransition();
  const store = useRouteStore();

  const generateRoute = () => {
    if (!store.start || !store.destination) {
      toast.error("Select start and destination");
      return;
    }
    store.setIsGenerating(true);
    store.setError(null);
    const vehicle = getVehicle(store.vehicle);

    startTransition(async () => {
      const res = await fetchRoute(store.start, store.destination, vehicle.profile);
      store.setIsGenerating(false);
      if (res.error) {
        store.setError(res.error);
        toast.error(res.error);
        return;
      }
      store.setCoordinates(res.coordinates);
      if (res.fallback) toast.info("Using fallback route — add ORS_API_KEY for real routes");
      else toast.success("Route generated!");
    });
  };

  const handleExport = async () => {
    const el = document.getElementById("route-map-container");
    if (!el) return;
    store.setIsExporting(true);
    toast.info("Select this browser tab when prompted to record");
    try {
      const blob = await exportMapVideo(el, store.setExportProgress);
      downloadBlob(blob);
      toast.success("Video downloaded!");
    } catch (e) {
      toast.error(e.message || "Export cancelled");
    } finally {
      store.setIsExporting(false);
      store.setExportProgress(0);
    }
  };

  return (
    <aside className="flex h-full flex-col gap-4 overflow-y-auto p-4 glass border-r border-[var(--color-border)]">
      <div>
        <h2 className="text-lg font-semibold">Route Builder</h2>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Build your animated travel story
        </p>
      </div>

      <LocationSearch
        label="Start Location"
        value={store.start}
        placeholder="e.g. Paris, France"
        onSelect={store.setStart}
      />
      <LocationSearch
        label="Destination"
        value={store.destination}
        placeholder="e.g. Berlin, Germany"
        onSelect={store.setDestination}
      />

      <div className="space-y-2">
        <Label>Vehicle</Label>
        <div className="grid grid-cols-3 gap-2">
          {VEHICLES.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => store.setVehicle(v.id)}
              className={`rounded-lg border p-2 text-center text-sm transition-all ${
                store.vehicle === v.id
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
                  : "border-[var(--color-border)] hover:bg-[var(--color-muted)]"
              }`}
            >
              <span className="text-xl">{v.icon}</span>
              <p className="mt-1 text-xs">{v.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t border-[var(--color-border)] pt-4">
        <div className="space-y-2">
          <Label>Route Color</Label>
          <input
            type="color"
            value={store.routeColor}
            onChange={(e) => store.setRouteColor(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-md border border-[var(--color-border)]"
          />
        </div>
        <div className="space-y-2">
          <Label>Route Thickness: {store.routeThickness}px</Label>
          <Slider
            value={[store.routeThickness]}
            min={2}
            max={12}
            step={1}
            onValueChange={([v]) => store.setRouteThickness(v)}
          />
        </div>
        <div className="space-y-2">
          <Label>Animation Speed: {store.animationSpeed}x</Label>
          <Slider
            value={[store.animationSpeed]}
            min={0.5}
            max={3}
            step={0.1}
            onValueChange={([v]) => store.setAnimationSpeed(v)}
          />
        </div>
        <div className="space-y-2">
          <Label>Vehicle Size: {store.vehicleSize}px</Label>
          <Slider
            value={[store.vehicleSize]}
            min={20}
            max={56}
            step={2}
            onValueChange={([v]) => store.setVehicleSize(v)}
          />
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <Button onClick={generateRoute} disabled={isPending || store.isGenerating}>
          {(isPending || store.isGenerating) && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          Generate Route
        </Button>
        <Button
          variant="secondary"
          onClick={onPlay}
          disabled={!store.coordinates.length || store.isAnimating}
        >
          <Play className="h-4 w-4" />
          Play Animation
        </Button>
        <Button variant="outline" onClick={onStop} disabled={!store.isAnimating}>
          <Square className="h-4 w-4" />
          Stop
        </Button>
        <Button
          variant="outline"
          onClick={handleExport}
          disabled={store.isExporting}
        >
          {store.isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Export Video
          {store.isExporting && ` (${store.exportProgress}%)`}
        </Button>
        <Button variant="ghost" onClick={() => store.reset()}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {store.error && (
        <p className="text-sm text-red-500">{store.error}</p>
      )}
    </aside>
  );
}
