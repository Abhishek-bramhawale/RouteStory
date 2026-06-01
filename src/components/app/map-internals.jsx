"use client";

import { useEffect, useState } from "react";
import { Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import { getPointAtProgress, getVisibleCoordinates } from "@/lib/animation";
import { getVehicle } from "@/lib/vehicles";

export function MapTiles() {
  return (
    <TileLayer
      attribution='&copy; OpenStreetMap'
      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
    />
  );
}

export function MapFollower({ progress, coordinates }) {
  const map = useMap();
  useEffect(() => {
    if (!coordinates?.length) return;
    const point = getPointAtProgress(coordinates, progress);
    if (point) map.setView(point, map.getZoom(), { animate: true });
  }, [map, progress, coordinates]);
  return null;
}

export function RouteLine({ coordinates, progress, isAnimating, color, thickness }) {
  const visible = getVisibleCoordinates(
    coordinates,
    isAnimating ? progress : 1
  );
  if (!visible.length) return null;
  return (
    <Polyline
      positions={visible}
      pathOptions={{ color, weight: thickness, opacity: 0.9 }}
    />
  );
}

export function VehicleMarker({ progress, coordinates, vehicleId, size }) {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      const v = getVehicle(vehicleId);
      setIcon(
        L.divIcon({
          html: `<div style="font-size:${size}px">${v.icon}</div>`,
          className: "",
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        })
      );
    });
  }, [vehicleId, size]);

  const point = getPointAtProgress(coordinates, progress);
  if (!point || !icon) return null;
  return <Marker position={point} icon={icon} />;
}

export function PinMarker({ position, color }) {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      setIcon(
        L.divIcon({
          html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        })
      );
    });
  }, [color]);

  if (!icon) return null;
  return <Marker position={position} icon={icon} />;
}
