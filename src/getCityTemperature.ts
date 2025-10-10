require('dotenv').config();
const apiKey = process.env.REACT_APP_API_KEY;

interface WeatherResponse {
  cod: number | string;
  main?: {
    temp: number;
  };
}

interface WeatherResult {
  cityName?: string;
  temperature?: number;
  error: boolean;
}

export const getCityTemperature = async (city: string): Promise<WeatherResult> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response) return { error: true };

    const data: WeatherResponse = await response.json();

    if (data.cod !== 404 && data.main) {
      return {
        cityName: city,
        temperature: data.main.temp,
        error: false,
      };
    } else {
      console.log('Error, city not found');
      return { error: true };
    }
  } catch (err) {
    console.error('Error fetching weather data:', err);
    return { error: true };
  }
};