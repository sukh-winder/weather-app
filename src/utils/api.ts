import { alert } from "./Toast";

const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "46a9246bebba16d42b36aac3fc3ba8af";

export async function getWeatherByCity(city: string) {
  try {
    let data = await fetch(
      `${API_URL}q=${city.replace(/\s+/g, "")}&appid=${API_KEY}`
    );

    let weatherData = await data.json();

    if (weatherData?.cod !== 200) {
      alert("error", "Error", weatherData?.message as string);
    }

    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getWeatherByLatAndLong(lat: number, lon: number) {
  try {
    const data = await fetch(
      `${API_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    const weatherData = await data.json();

    if (weatherData.cod !== 200) {
      alert("error", "Error", weatherData?.message as string);
    }

    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
}
