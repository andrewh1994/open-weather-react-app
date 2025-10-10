import { useState } from 'react';
import { getCityTemperature as fetchCityTemperature } from '../getCityTemperature';

interface WeatherData {
  cityName: string;
  temperature: number | null;
  notFound: boolean;
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
      const result = await fetchCityTemperature(textInput);

      if (!result.error && result.temperature !== undefined) {
        setWeatherData({
          cityName: result.cityName || '',
          temperature: result.temperature,
          notFound: false,
        });
      } else {
        setWeatherData({
          cityName: '',
          temperature: null,
          notFound: true,
        });
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData({
        cityName: '',
        temperature: null,
        notFound: true,
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