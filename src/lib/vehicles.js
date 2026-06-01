export const VEHICLES = [
  { id: "car", label: "Car", icon: "🚗", profile: "driving-car" },
  { id: "plane", label: "Plane", icon: "✈️", profile: "driving-car" },
  { id: "train", label: "Train", icon: "🚆", profile: "driving-car" },
  { id: "bike", label: "Bike", icon: "🚲", profile: "cycling-regular" },
  { id: "ship", label: "Ship", icon: "🚢", profile: "driving-car" },
];

export function getVehicle(id) {
  return VEHICLES.find((v) => v.id === id) || VEHICLES[0];
}
