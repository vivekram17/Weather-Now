# Weather Now 🌤️

**Candidate ID:** Naukri0925

## Project Description

Weather Now is a responsive and interactive React app that allows users to get **current weather**, **humidity, pressure, sunrise/sunset times**, and a **3-hour forecast** for any city worldwide. It supports **multi-city selection**, robust **error handling**, and a polished user interface.

---

## Features

- Search for cities and select from multiple matches (city, country, lat/lon)
- Display current temperature, weather description, humidity, pressure, wind speed
- Show sunrise and sunset times
- 3-hour forecast with temperature, humidity, and pressure
- Loading skeleton and empty/error states
- Fallback to Open-Meteo API if OpenWeatherMap fails

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **API:** OpenWeatherMap Geocoding + Open-Meteo
- **HTTP Requests:** Axios
- **Testing:** Jest, React Testing Library
- **Bundler:** Vite

---

## StackBlitz Setup & Run Instructions

1. Open the project in StackBlitz using the project link.
2. StackBlitz automatically installs dependencies and starts the development server.
3. The app is live in the **right-hand preview window**.

### Configure API Key

- Edit `src/components/WeatherNow.jsx` and replace:

```javascript
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
```
