import { create } from "zustand";

const defaults = {
  start: null,
  destination: null,
  vehicle: "car",
  routeColor: "#6366f1",
  routeThickness: 4,
  animationSpeed: 1,
  vehicleSize: 32,
  coordinates: [],
  isGenerating: false,
  isAnimating: false,
  isExporting: false,
  exportProgress: 0,
  error: null,
};

export const useRouteStore = create((set) => ({
  ...defaults,
  setStart: (start) => set({ start, coordinates: [], error: null }),
  setDestination: (destination) =>
    set({ destination, coordinates: [], error: null }),
  setVehicle: (vehicle) => set({ vehicle }),
  setRouteColor: (routeColor) => set({ routeColor }),
  setRouteThickness: (routeThickness) => set({ routeThickness }),
  setAnimationSpeed: (animationSpeed) => set({ animationSpeed }),
  setVehicleSize: (vehicleSize) => set({ vehicleSize }),
  setCoordinates: (coordinates) => set({ coordinates }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setIsAnimating: (isAnimating) => set({ isAnimating }),
  setIsExporting: (isExporting) => set({ isExporting }),
  setExportProgress: (exportProgress) => set({ exportProgress }),
  setError: (error) => set({ error }),
  reset: () => set({ ...defaults }),
}));
