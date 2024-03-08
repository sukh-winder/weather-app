import { WeatherData } from "../types/weatherData";
import { create } from "zustand";

export const useWeather = create((set: any) => ({
  weather: {} as WeatherData,
  setWeather: (value: WeatherData) =>
    set((state: { weather: WeatherData }) => ({ weather: value })),
}));
