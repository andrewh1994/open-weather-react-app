export const validateCityInput = (input: string): boolean => {
  const cityNameRegex = /^[a-zA-Z\s\-']+$/;
  return typeof input === 'string' && input.trim().length > 0 && cityNameRegex.test(input);
};

export const sanitizeCityInput = (input: string): string => {
  return input.replace(/[^a-zA-Z\s\-']/g, '').trim();
};

export const formatTemperature = (temp: number | null | undefined): string => {
  return temp !== null && temp !== undefined ? `${temp}°C` : '_______';
};