"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouteStore } from "@/store/route-store";

const MapContent = dynamic(
  () => import("@/components/app/map-content").then((m) => m.MapContent),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-[var(--color-muted-foreground)]">
        Loading map...
      </div>
    ),
  }
);

export function RouteMap({ progress = 0, isAnimating }) {
  const { coordinates, start, destination, routeColor, routeThickness, vehicle, vehicleSize } =
    useRouteStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import("leaflet/dist/leaflet.css").then(() => setReady(true));
  }, []);

  const center = start ? [start.lat, start.lng] : coordinates[0] || [20, 0];

  return (
    <div id="route-map-container" className="relative h-full w-full">
      {ready ? (
        <MapContent
          center={center}
          coordinates={coordinates}
          progress={progress}
          isAnimating={isAnimating}
          start={start}
          destination={destination}
          routeColor={routeColor}
          routeThickness={routeThickness}
          vehicle={vehicle}
          vehicleSize={vehicleSize}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-[var(--color-muted-foreground)]">
          Loading map...
        </div>
      )}

      {!coordinates.length && !start && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="glass rounded-xl p-6 text-center">
            <p className="font-medium">Select locations to begin</p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
              Choose start and destination, then generate your route
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
