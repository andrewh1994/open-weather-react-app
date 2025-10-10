import React from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { WeatherResult } from './WeatherResult';
import { useWeatherSearch } from '../hooks/useWeatherSearch';
import { 
  PLACEHOLDER_TEXT, 
  BUTTON_TEXT, 
  LOADING_TEXT 
} from '../constants/constants';

export const Body: React.FC = () => {
  const {
    textInput,
    weatherData,
    isLoading,
    handleChange,
    handleSearch,
    handleKeyDown,
  } = useWeatherSearch();

  return (
    <div className="container">
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-6 col-lg-4">
          <Input
            type="text"
            placeholder={PLACEHOLDER_TEXT}
            value={textInput}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            autoFocus
            disabled={isLoading}
            aria-label="City name input"
          />
        </div>
      </div>
      <div className="row justify-content-center mb-4">
        <Button 
          onClick={handleSearch}
          disabled={isLoading || !textInput.trim()}
        >
          {isLoading ? LOADING_TEXT : BUTTON_TEXT}
        </Button>
      </div>
      <WeatherResult
        cityName={weatherData.cityName}
        cityTemperature={weatherData.temperature}
        cityNotFound={weatherData.notFound}
        isLoading={isLoading}
      />
    </div>
  );
};