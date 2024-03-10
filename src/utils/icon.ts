import cloudy from "../../assets/cloudy.json";
import rain from "../../assets/rain.json";
import haze from "../../assets/haze.json";
import snow from "../../assets/snow.json";
import sunny from "../../assets/sunny.json";
import moon from "../../assets/moon.json";
import { WeatherData } from "src/types/weatherData";
import { getCurrentUnixTimestamp } from "./timeAnddate";

export function weatherIcon(weatherDesc: string = "weather-sunny") {
  // if(weatherDesc.includes("haze")) return haze;
  if (weatherDesc == "Clear") return "weather-sunny";

  if (weatherDesc == "Haze") return "weather-hazy";
  if (weatherDesc == "Rain") return "weather-pouring";
  if (weatherDesc == "Snow") return "weather-snowy-heavy";
  return "weather-cloudy";
}

export function getBackgroundAnimation(weather: WeatherData) {
  if (
    weather?.weather[0].main == "Clear" &&
    weather?.sys?.sunrise <= getCurrentUnixTimestamp() &&
    getCurrentUnixTimestamp() < weather?.sys?.sunset
  ) {
    return sunny;
  }
  if (
    weather?.weather[0].main == "Clear" &&
    weather?.sys?.sunrise <= getCurrentUnixTimestamp() &&
    getCurrentUnixTimestamp() > weather?.sys?.sunset
  ) {
    return moon;
  }

  if (weather?.weather[0].main == "Haze") return haze;
  if (weather?.weather[0].main == "Rain") return rain;
  if (weather?.weather[0].main == "Snow") return snow;
  if (weather?.weather[0].main == "Clouds") return cloudy;
  return sunny;
}
