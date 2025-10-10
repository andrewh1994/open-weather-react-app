import React from 'react';
import { formatTemperature } from '../utils/utils';
import { ERROR_MESSAGE, TEMPERATURE_PLACEHOLDER } from '../constants/constants';

interface WeatherResultProps {
  cityName: string;
  cityTemperature: number | null;
  cityNotFound: boolean;
  isLoading: boolean;
}

export const WeatherResult: React.FC<WeatherResultProps> = ({ 
  cityName, 
  cityTemperature, 
  cityNotFound, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="row justify-content-center">
        <p>Fetching weather data...</p>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <p>
        Here is the temperature in {cityName || TEMPERATURE_PLACEHOLDER}:{' '}
        {formatTemperature(cityTemperature)}
      </p>
      {cityNotFound && (
        <p className="text-danger">
          {ERROR_MESSAGE}
        </p>
      )}
    </div>
  );
};