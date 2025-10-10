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
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Fetching weather data...</p>
      </div>
    );
  }

  if (cityNotFound) {
    return (
      <div className="row justify-content-center">
        <div className="alert alert-danger" role="alert" style={{ maxWidth: '400px' }}>
          <strong>Error!</strong> {ERROR_MESSAGE}
        </div>
      </div>
    );
  }

  if (!cityName && !cityTemperature) {
    return null;
  }

  return (
    <div className="row justify-content-center">
      <div className="alert alert-success" role="alert" style={{ maxWidth: '400px' }}>
        <p className="mb-0">
          <strong>Temperature in {cityName}:</strong> {formatTemperature(cityTemperature)}
        </p>
      </div>
    </div>
  );
};