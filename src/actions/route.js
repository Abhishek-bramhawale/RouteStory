"use server";

const ORS_BASE = "https://api.openrouteservice.org";

export async function geocodeLocation(query) {
  if (!query?.trim()) return { error: "Enter a location" };

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
      { headers: { "User-Agent": "RouteStory/1.0" }, next: { revalidate: 3600 } }
    );
    const data = await res.json();
    if (!data?.length) return { error: "Location not found" };
    return {
      results: data.map((item) => ({
        name: item.display_name,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      })),
    };
  } catch {
    return { error: "Geocoding failed" };
  }
}

export async function fetchRoute(start, destination, profile = "driving-car") {
  if (!start || !destination) {
    return { error: "Start and destination required" };
  }

  const apiKey = process.env.ORS_API_KEY;

  if (!apiKey) {
    return generateFallbackRoute(start, destination);
  }

  try {
    const res = await fetch(`${ORS_BASE}/v2/directions/${profile}/geojson`, {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [
          [start.lng, start.lat],
          [destination.lng, destination.lat],
        ],
      }),
    });

    if (!res.ok) {
      return generateFallbackRoute(start, destination);
    }

    const data = await res.json();
    const coords = data.features?.[0]?.geometry?.coordinates;
    if (!coords?.length) return { error: "No route found" };

    return {
      coordinates: coords.map(([lng, lat]) => [lat, lng]),
      distance: data.features[0].properties?.summary?.distance,
      duration: data.features[0].properties?.summary?.duration,
    };
  } catch {
    return generateFallbackRoute(start, destination);
  }
}

function generateFallbackRoute(start, destination) {
  const steps = 60;
  const coordinates = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lat = start.lat + (destination.lat - start.lat) * t;
    const lng = start.lng + (destination.lng - start.lng) * t;
    const curve = Math.sin(t * Math.PI) * 0.15;
    coordinates.push([lat + curve, lng - curve * 0.5]);
  }
  return { coordinates, fallback: true };
}
