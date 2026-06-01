import { easeInOutCubic } from "./utils";

export function getPointAtProgress(coordinates, progress) {
  if (!coordinates?.length) return null;
  if (coordinates.length === 1) return coordinates[0];

  const eased = easeInOutCubic(Math.min(1, Math.max(0, progress)));
  const total = coordinates.length - 1;
  const index = eased * total;
  const i = Math.floor(index);
  const frac = index - i;

  if (i >= total) return coordinates[total];
  const [lat1, lng1] = coordinates[i];
  const [lat2, lng2] = coordinates[i + 1];
  return [lat1 + (lat2 - lat1) * frac, lng1 + (lng2 - lng1) * frac];
}

export function getVisibleCoordinates(coordinates, progress) {
  if (!coordinates?.length) return [];
  const eased = easeInOutCubic(Math.min(1, Math.max(0, progress)));
  const count = Math.max(2, Math.ceil(eased * coordinates.length));
  return coordinates.slice(0, count);
}
