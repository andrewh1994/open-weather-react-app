export const validateCityInput = (input: string): boolean => {
  return typeof input === 'string' && input.trim().length > 0;
};

export const formatTemperature = (temp: number | null | undefined): string => {
  return temp !== null && temp !== undefined ? `${temp}°C` : '_______';
};