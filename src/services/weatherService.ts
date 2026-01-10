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

interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface ForecastResponse {
  cod: string;
  list: ForecastItem[];
}

interface ForecastResult {
  forecast: Array<{
    date: string;
    temp: number;
    tempMin: number;
    tempMax: number;
    description: string;
    icon: string;
  }>;
  error: boolean;
}

export const getCityTemperature = async (city: string): Promise<WeatherResult> => {
  try {
    const response = await fetch(`http://localhost:3001/api/weather/${city}`);
    
    const data: WeatherResponse = await response.json();

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

export const getCityForecast = async (city: string): Promise<ForecastResult> => {
  try {
    const response = await fetch(`http://localhost:3001/api/forecast/${city}`);
    
    const data: ForecastResponse = await response.json();

    if (data.cod === '404' || !response.ok) {
      console.log('Error, city not found');
      return { error: true, forecast: [] };
    }

    const dailyForecasts = data.list
      .filter(item => item.dt_txt.includes('12:00:00'))
      .slice(0, 5)
      .map(item => ({
        date: new Date(item.dt * 1000).toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        temp: Math.round(item.main.temp),
        tempMin: Math.round(item.main.temp_min),
        tempMax: Math.round(item.main.temp_max),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }));

    return {
      forecast: dailyForecasts,
      error: false,
    };
  } catch (err) {
    console.error('Error fetching forecast data:', err);
    return { error: true, forecast: [] };
  }
};