import { SetStateAction } from "react";
import { WeatherData } from "src/types/weatherData";
import { alert } from "./Toast";
import { getWeatherByLatAndLong } from "./api";

export async function getLocation(
  Location: typeof import("expo-location"),
  setWeatherDetails: React.Dispatch<React.SetStateAction<WeatherData>>,
  setWeather: (value: WeatherData) => any
) {
  const permission = (await Location.requestForegroundPermissionsAsync())
    .granted;

  if (permission) {
    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      console.log("cords", latitude);
      if (latitude && longitude) {
        const data = await getWeatherByLatAndLong(
          parseFloat(latitude.toFixed(2)),
          parseFloat(longitude.toFixed(2))
        );

        // const cityByLatAndLong = data.json();
        console.log("data", data);
        setWeatherDetails(data);
        setWeather(data);
      }
    } catch (e) {
      alert("error", "Error", "something went to wrong try after some time");
    }
  }
}
