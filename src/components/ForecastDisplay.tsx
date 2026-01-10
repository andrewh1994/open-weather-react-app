import React from 'react';

interface ForecastDay {
  date: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
}

interface FiveDayForecastDisplayProps {
  forecast: ForecastDay[];
}

export const FiveDayForecastDisplay: React.FC<FiveDayForecastDisplayProps> = ({ forecast }) => {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  const getWeatherIcon = (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-12 col-lg-10">
        <h4 className="text-center mb-3">5-Day Forecast</h4>
        <div className="row">
          {forecast.map((day, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h6 className="card-title">{day.date}</h6>
                  <img 
                    src={getWeatherIcon(day.icon)} 
                    alt={day.description}
                    style={{ width: '80px', height: '80px' }}
                  />
                  <p className="card-text mb-1">
                    <strong>{day.temp}°C</strong>
                  </p>
                  <p className="card-text text-muted mb-1" style={{ fontSize: '0.9rem' }}>
                    H: {day.tempMax}° L: {day.tempMin}°
                  </p>
                  <p className="card-text text-capitalize" style={{ fontSize: '0.85rem' }}>
                    {day.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
