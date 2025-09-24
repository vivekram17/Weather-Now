# Weather Now – Developer Notes

**Candidate ID: Naukri0925**

---

## 1️⃣ Project Overview

Weather Now is a **React + Tailwind CSS** application that allows users to:

- Search for any city worldwide using **Open-Meteo geocoding**
- View **current weather** (temperature, wind, weather description)
- View **humidity, pressure, sunrise and sunset times**
- See a **3-hour forecast (next 12 hours)** in scrollable cards
- Handle **loading, empty, and error states** gracefully

✅ The project is fully functional in **StackBlitz** without an API key.

---

## 2️⃣ Project Structure

```bash
weather-now/
│
├─ package.json # Node dependencies and scripts
├─ vite.config.js # Vite bundler config
├─ tailwind.config.js # Tailwind CSS setup
├─ index.html # HTML entry point
│
├─ src/
│ ├─ main.jsx # React entry point, renders <App />
│ ├─ App.jsx # Main app wrapper, renders WeatherNow
│ ├─ index.css # Tailwind directives and global styles
│ └─ components/
│ └─ WeatherNow.jsx # Core component handling search, API, and UI

```

**Key points:**
- `WeatherNow.jsx` is the main functional component.
- `App.jsx` is minimal; it renders `<WeatherNow />`.
- Tailwind CSS is configured in `tailwind.config.js` and imported via `index.css`.

---

## 3️⃣ Component Overview

### App.jsx

Simple container component.

Imports and renders <WeatherNow />.

Example:
```bash
import WeatherNow from './components/WeatherNow';

function App() {
  return <WeatherNow />;
}

export default App;
```
### WeatherNow.jsx

**Responsibilities:**

***Search & Geocoding***

User types a city name.

fetchCities calls Open-Meteo geocoding API:

https://geocoding-api.open-meteo.com/v1/search?name={CITY_NAME}&count=3


Dropdown shows multiple city matches.

Selecting a city triggers weather fetch.

Weather Data Fetch

fetchWeather calls Open-Meteo forecast API:

https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,pressure_msl&daily=sunrise,sunset&timezone=auto


Stores:

weather → current weather + sunrise/sunset

hourlyForecast → next 12 hours of temperature, humidity, and pressure

State Management

query → user input text

cities → city search results

selectedCity → user-chosen city

weather → current weather object

hourlyForecast → array of hourly forecast data

loading → toggles loading skeleton

error → error messages

UI Rendering

Search input + button

Dropdown for multi-city selection

Current weather card

3-hour horizontal scroll forecast

Loading skeleton & error messages

    










