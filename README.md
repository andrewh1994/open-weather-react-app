# OpenWeather React App

A TypeScript-based React application that displays weather information for any city using the OpenWeatherMap API.

## Features

- 🌡️ Real-time weather data for any city worldwide
- 🔒 Secure API key handling via backend proxy
- ✅ Input validation and sanitization
- 📱 Responsive Bootstrap UI
- ⚡ TypeScript for type safety
- 🧪 Comprehensive test coverage

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

## Setup Instructions

### 1. Get Your API Key

Sign up and get a free API key at [https://openweathermap.org/](https://openweathermap.org/)

### 2. Create Environment File

Create a `.env` file in the root directory:

```env
REACT_APP_API_KEY=YOUR_API_KEY_HERE
PORT=3001
```

Replace `YOUR_API_KEY_HERE` with your actual OpenWeatherMap API key.

### 3. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 4. Run the Application

```bash
npm run start
```

**This command runs two servers concurrently:**
- **Backend Server** (Express): `http://localhost:3001` - Handles API requests securely
- **Frontend Server** (React): `http://localhost:3000` - Serves the React application

### 5. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. Enter a city name in the text input field (e.g., "London", "New York", "Tokyo")
2. Click the yellow button or press **Enter**
3. The app will display:
   - Current temperature in Celsius
   - 5-day weather forecast
   - City name
   - Error message if city is not found

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run both backend and frontend servers concurrently |
| `npm run start:client` | Run frontend only (React app on port 3000) |
| `npm run start:server:dev` | Run backend only (Express server on port 3001) |
| `npm test` | Run test suite |
| `npm run build` | Build production-ready React app |
| `npm run build:server` | Compile TypeScript backend to JavaScript |

## Project Structure

```
open_weather_react_app/
├── server.ts                   # Express backend server
├── src/
│   ├── components/            # React components
│   │   ├── App.tsx
│   │   ├── Body.tsx
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Header.tsx
│   │   ├── Input.tsx
│   │   └── WeatherResult.tsx
│   ├── hooks/                 # Custom React hooks
│   │   └── useWeatherSearch.ts
│   ├── services/              # API services
│   │   └── weatherService.ts
│   ├── utils/                 # Helper functions
│   │   └── utils.ts
│   ├── constants/             # App constants
│   │   └── constants.ts
│   ├── types/                 # TypeScript type definitions
│   │   └── images.d.ts
│   └── tests/                 # Test files
│       └── button.test.tsx
├── .env                       # Environment variables (not in repo)
├── tsconfig.json              # TypeScript config for React
├── tsconfig.server.json       # TypeScript config for server
└── package.json
```

## Technologies Used

- **Frontend**: React 19, TypeScript, Bootstrap 5
- **Backend**: Node.js, Express, TypeScript
- **Testing**: Jest, React Testing Library
- **API**: OpenWeatherMap API
- **Build Tools**: React Scripts, ts-node, concurrently

## Security Features

- ✅ API key stored on backend (not exposed in browser)
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Error handling for invalid requests

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

```bash
# Windows (PowerShell)
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Kill the process using the port
taskkill /PID <PID> /F
```

### API Key Not Working

- Ensure your API key is active (may take a few hours after registration)
- Check that `.env` file is in the root directory
- Verify the key is correctly formatted: `REACT_APP_API_KEY=your_key_here`
- Restart both servers after adding the `.env` file

### Dependency Conflicts

If you encounter dependency errors during installation:

```bash
npm install --legacy-peer-deps
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions, issues, and feature requests are welcome!

## Author

[Your Name / GitHub Username]