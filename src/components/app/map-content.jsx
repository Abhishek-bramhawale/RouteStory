"use client";

import { MapContainer } from "react-leaflet";
import {
  MapFollower,
  MapTiles,
  PinMarker,
  RouteLine,
  VehicleMarker,
} from "@/components/app/map-internals";

export function MapContent({
  center,
  coordinates,
  progress,
  isAnimating,
  start,
  destination,
  routeColor,
  routeThickness,
  vehicle,
  vehicleSize,
}) {
  return (
    <MapContainer center={center} zoom={5} className="h-full w-full" scrollWheelZoom>
      <MapTiles />
      {coordinates.length > 0 && (
        <>
          <RouteLine
            coordinates={coordinates}
            progress={progress}
            isAnimating={isAnimating}
            color={routeColor}
            thickness={routeThickness}
          />
          {isAnimating && (
            <>
              <VehicleMarker
                progress={progress}
                coordinates={coordinates}
                vehicleId={vehicle}
                size={vehicleSize}
              />
              <MapFollower progress={progress} coordinates={coordinates} />
            </>
          )}
        </>
      )}
      {start && <PinMarker position={[start.lat, start.lng]} color="#22c55e" />}
      {destination && (
        <PinMarker position={[destination.lat, destination.lng]} color="#ef4444" />
      )}
    </MapContainer>
  );
}
