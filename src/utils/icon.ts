export function weatherIcon(weatherDesc: string = "weather-sunny") {
  // if(weatherDesc.includes("haze")) return haze;
  if (weatherDesc == "clear") return "weather-sunny";

  if (weatherDesc == "haze") return "weather-hazy";
  if (weatherDesc === "rain") return "weather-pouring";
  if (weatherDesc === "snow") return "weather-snowy-heavy";
  return "weather-cloudy";
}
