import { useState } from 'react';
import { getCityTemperature as fetchCityTemperature, getCityForecast } from '../services/weatherService';

interface WeatherData {
  cityName: string;
  temperature: number | null;
  notFound: boolean;
  forecast: Array<{
    date: string;
    temp: number;
    tempMin: number;
    tempMax: number;
    description: string;
  }>;
}

interface UseWeatherSearchReturn {
  textInput: string;
  weatherData: WeatherData;
  isLoading: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => Promise<void>;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const useWeatherSearch = (): UseWeatherSearchReturn => {
  const [textInput, setTextInput] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData>({
    cityName: '',
    temperature: null,
    notFound: false,
    forecast: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTextInput(event.target.value);
    if (weatherData.notFound) {
      setWeatherData((prev) => ({ ...prev, notFound: false }));
    }
  };

  const handleSearch = async (): Promise<void> => {
    if (!textInput.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const [currentResult, forecastResult] = await Promise.all([
        fetchCityTemperature(textInput),
        getCityForecast(textInput),
      ]);

      if (!currentResult.error && currentResult.temperature !== undefined) {
        setWeatherData({
          cityName: currentResult.cityName || '',
          temperature: currentResult.temperature,
          notFound: false,
          forecast: forecastResult.error ? [] : forecastResult.forecast,
        });
      } else {
        setWeatherData({
          cityName: '',
          temperature: null,
          notFound: true,
          forecast: [],
        });
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData({
        cityName: '',
        temperature: null,
        notFound: true,
        forecast: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return {
    textInput,
    weatherData,
    isLoading,
    handleChange,
    handleSearch,
    handleKeyDown,
  };
};