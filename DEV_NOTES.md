Weather Now – Developer Notes

Candidate ID: Naukri0925

---

1️⃣ Project Overview

- Weather Now is a React + Tailwind CSS application that allows users to:

- Search for any city worldwide using Open-Meteo geocoding

- View current weather (temperature, wind, weather description)

- View humidity, pressure, sunrise and sunset times

- See a 3-hour forecast (next 12 hours) in scrollable cards

- Handle loading, empty, and error states gracefully

- The project is fully functional in StackBlitz without an API key.

---

2️⃣ Project Structure

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

Key points:

- WeatherNow.jsx is the main functional component.

- App.jsx is minimal; it renders WeatherNow.

- Tailwind CSS is configured in tailwind.config.js and imported via index.css.

---

3️⃣ Component Overview

- App.jsx

- Simple container component.

- Imports and renders <WeatherNow />.

Example:

```bash
import WeatherNow from './components/WeatherNow';

function App() {
  return <WeatherNow />;
}

export default App;
```

WeatherNow.jsx

Responsibilities:

1. Search & Geocoding

   - User types a city name.

   - fetchCities calls Open-Meteo geocoding API:

   - https://geocoding-api.open-meteo.com/v1/search?name={CITY_NAME}&count=3

   - Dropdown shows multiple city matches.

   - Selecting a city triggers weather fetch.

2. Weather Data Fetch

   - fetchWeather calls Open-Meteo forecast API:

     https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,pressure_msl&daily=sunrise,sunset&timezone=auto

   - Stores:

     - weather → current weather + sunrise/sunset

     - hourlyForecast → next 12 hours of temperature, humidity, and pressure

3. State Management

- query → user input text

- cities → city search results

- selectedCity → user-chosen city

- weather → current weather object

- hourlyForecast → array of hourly forecast data

- loading → toggles loading skeleton

- error → error messages

4. UI Rendering

- Search input + button

- Dropdown for multi-city selection

- Current weather card

- 3-hour horizontal scroll forecast

- Loading skeleton & error messages

4️⃣ State & API Flow

1. User types city → query updates

2. On Enter or Search button → fetchCities called

3. Cities returned → stored in cities state → displayed in dropdown

4. User selects city → fetchWeather called with city lat/lon

5. Weather response stored in weather and hourlyForecast

6. UI automatically updates based on state

7. Loading skeleton shows when loading = true

8. Errors captured and displayed in error state

5️⃣ Tailwind CSS Setup

- Installation: included in package.json

- Config: tailwind.config.js:

```bash
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- Usage:

  - Utility-first classes directly in JSX

  - Responsive layouts (sm:, md:, lg:)

  - Flex and overflow-x-auto for horizontal scrolling

  - Rounded cards, shadows, gradients, and hover states

6️⃣ Running the Project (StackBlitz)

1. Open StackBlitz project

2. Dependencies install automatically

3. Preview shows live app

4. Manual API testing: type a city, select from dropdown, observe results

5. Optional local run (after export):

---

npm install
npm run dev

---

7️⃣ Testing

- Basic manual QA checklist:

  1. Page load

  2. Search input

  3. Multi-city dropdown

  4. City selection

  5. Current weather display

  6. 3-hour forecast scroll

  7. Loading skeleton

  8. Error handling (invalid city, network)

  9. Mobile responsiveness

  10. Fallback behavior if API fails

- Automated tests (optional if exported locally):

  - Jest + React Testing Library

  - Render, loading, and error state coverage

8️⃣ Error Handling Notes

- No results: shows “No cities found.”

- Network error: shows “Network error. Check your connection.”

- Open-Meteo failure: shows “Failed to fetch weather from Open-Meteo.”

- Enhancements possible:

  - Retry button on failure

  - Cache last successful results

  - Add weather icons based on weathercode

9️⃣ Key Improvements / Future Enhancements

- Add unit tests for all components

- Add forecast icons for better UX

- Allow temperature unit toggle (C/F)

- Add geolocation support to detect user location automatically

- Add dark mode / theme toggle

✅ Summary

- WeatherNow.jsx → main logic and UI

- State flows: query → cities → selectedCity → weather/hourlyForecast

- Tailwind handles all styling and responsive layout

- Fully functional in StackBlitz with no API key

- Error handling and loading states are built-in

- Can be extended with icons, unit toggle, and geolocation

- This document should let any developer quickly u

Weather Now – State & API Flow Diagram
[User Input: City Name]
│
▼
┌─────────────────┐
│ query state │
└─────────────────┘
│
▼
[fetchCities API Call → Open-Meteo Geocoding]
│
│ Success → results stored in
▼
┌─────────────────┐
│ cities state │
└─────────────────┘
│
▼
[User selects city from dropdown]
│
▼
┌───────────────────────────┐
│ selectedCity state │
└───────────────────────────┘
│
▼
[fetchWeather API Call → Open-Meteo Forecast]
│
├── Success → extract:
│ • Current weather → weather state
│ • Hourly forecast → hourlyForecast state
│
└── Failure → set error state

          │
          ▼

┌───────────────────────────┐
│ UI Updates Automatically │
│ - Weather card │
│ - 3-hour forecast scroll │
│ - Sunrise/Sunset info │
│ - Error messages │
└───────────────────────────┘
