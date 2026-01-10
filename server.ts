import express, { Request, Response } from 'express';
import axios from 'axios';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.REACT_APP_API_KEY;

app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

interface WeatherApiResponse {
  cod: number | string;
  main?: {
    temp: number;
  };
  name?: string;
}

app.get('/api/weather/:city', async (req: Request, res: Response) => {
  const { city } = req.params;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await axios.get<WeatherApiResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error: any) {
    console.error('Failed to fetch weather data:', error.message);
    
    // Check if it's an axios error with a response
    if (error.response) {
      // Return proper error status
      if (error.response.status === 404) {
        return res.status(404).json({ 
          cod: 404,
          error: 'City not found' 
        });
      }
      
      return res.status(error.response.status).json({
        cod: error.response.status,
        error: 'Failed to fetch weather data'
      });
    }
    
    // Generic error
    res.status(500).json({
      cod: 500,
      error: 'Failed to fetch weather data'
    });
  }
});

app.get('/api/forecast/:city', async (req: Request, res: Response) => {
  const { city } = req.params;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error: any) {
    console.error('Failed to fetch forecast data:', error.message);
    
    if (error.response) {
      if (error.response.status === 404) {
        return res.status(404).json({ 
          cod: '404',
          error: 'City not found' 
        });
      }
      
      return res.status(error.response.status).json({
        cod: error.response.status.toString(),
        error: 'Failed to fetch forecast data'
      });
    }
    
    res.status(500).json({
      cod: '500',
      error: 'Failed to fetch forecast data'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});