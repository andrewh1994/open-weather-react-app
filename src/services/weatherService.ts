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
    const response = await fetch(`http://localhost:3001/api/weather/${city}`);
    
    const data: WeatherResponse = await response.json();

    // Check if city was not found
    if (data.cod === 404 || data.cod === '404' || !response.ok) {
      console.log('Error, city not found');
      return { error: true };
    }

    if (data.main) {
      return {
        cityName: city,
        temperature: data.main.temp,
        error: false,
      };
    } else {
      return { error: true };
    }
  } catch (err) {
    console.error('Error fetching weather data:', err);
    return { error: true };
  }
};