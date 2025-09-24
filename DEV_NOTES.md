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
**Search & Geocoding**
- User types a city name.
- fetchCities calls Open-Meteo geocoding API:
```bash
https://geocoding-api.open-meteo.com/v1/search?name={CITY_NAME}&count=3
```
- Dropdown shows multiple city matches.
- Selecting a city triggers weather fetch.
**Weather Data Fetch**
- fetchWeather calls Open-Meteo forecast API:
```bash
https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,pressure_msl&daily=sunrise,sunset&timezone=auto
```
- Stores:
  - weather → current weather + sunrise/sunset
  - hourlyForecast → next 12 hours of temperature, humidity, and pressure

- State Management
  - query → user input text
  - cities → city search results
  - selectedCity → user-chosen city
  - weather → current weather object
  - hourlyForecast → array of hourly forecast data
  -loading → toggles loading skeleton
  - error → error messages

- UI Rendering
  - Search input + button
  - Dropdown for multi-city selection
  - Current weather card
  - 3-hour horizontal scroll forecast
  - Loading skeleton & error messages

### 4️⃣ State & API Flow
  - User types city → query updates
  - On Enter or Search button → fetchCities called
  - Cities returned → stored in cities state → displayed in dropdown
  - User selects city → fetchWeather called with city lat/lon
  - Weather response stored in weather and hourlyForecast
  - UI automatically updates based on state
  - Loading skeleton shows when loading = true
  - Errors captured and displayed in error state
    

### 5️⃣ Tailwind CSS Setup

- Installation: included in package.json

- Config: tailwind.config.js
```bash
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}
```
- Usage:
  - Utility-first classes directly in JSX
  - Responsive layouts (sm:, md:, lg:)
  - Flex and overflow-x-auto for horizontal scrolling
  - Rounded cards, shadows, gradients, and hover states

### 6️⃣ Running the Project (StackBlitz)
- Open StackBlitz project
- Dependencies install automatically
- Preview shows live app
- Manual API testing: type a city, select from dropdown, observe results
- Optional local run (after export):
```arduino
npm install
npm run dev
```

### 7️⃣ Testing

#### Basic Manual QA Checklist
* **Page Load:** Confirm that the application loads successfully without any errors.
* **Search Input:** Test typing in various city names, including valid, invalid, and partial entries.
* **Multi-city Dropdown:** Verify that a dropdown appears with city suggestions when the search query matches multiple locations.
* **City Selection:** Check that selecting a city from the dropdown fetches and displays the correct weather data.
* **Current Weather Display:** Ensure that the temperature, wind, and weather description are shown accurately for the selected city.
* **3-Hour Forecast Scroll:** Confirm that the forecast cards for the next 12 hours are visible and can be scrolled horizontally.
* **Loading Skeleton:** Check that a loading state (e.g., a skeleton UI) appears while data is being fetched from the API.
* **Error Handling:** Test scenarios that should trigger an error, such as entering an invalid city name, disconnecting the network, or simulating an API failure.
* **Mobile Responsiveness:** Resize the browser window to confirm that the layout adjusts correctly for smaller screen sizes.
* **Fallback Behavior:** If the API fails, ensure the app displays a user-friendly error message instead of crashing.

---

#### Automated Tests
* **Jest + React Testing Library:** If the project is exported locally, automated tests can be written using these tools.
* **Coverage:** Focus on testing the core component logic, including rendering different UI states (e.g., loading, error, and successful data display) to ensure robust behavior.

### 8️⃣ Error Handling Notes
The application includes built-in error handling to provide a better user experience. Specific messages are displayed for different types of failures:

* **No Results:** If a user searches for a city that doesn't exist, the app shows the message “No cities found.”
* **Network Error:** For issues with the user's internet connection, the message “Network error. Check your connection.” is displayed.
* **API Failure:** If the Open-Meteo API is unavailable or returns an error, the app shows “Failed to fetch weather from Open-Meteo.”

**Possible Enhancements:**
* Implement a **"Retry" button** to allow the user to attempt the API call again without re-entering the search query.
* **Cache** the last successful weather results to display data even if a subsequent API request fails.
* Display **weather icons** based on the `weathercode` value returned by the API for a more intuitive and visually appealing UI.

---

### 9️⃣ Key Improvements / Future Enhancements
Several improvements can be made to enhance the application's functionality and user experience:

* **Add Unit Tests:** Implement comprehensive unit tests for all components using tools like Jest and React Testing Library to ensure code reliability and prevent regressions.
* **Add Forecast Icons:** Enhance the hourly forecast by adding icons that correspond to the weather conditions (e.g., sun, clouds, rain).
* **Allow Temperature Unit Toggle:** Provide an option for users to switch between Celsius and Fahrenheit (°C/°F).
* **Add Geolocation Support:** Automatically detect and display the weather for the user's current location upon app load using the browser's geolocation API.
* **Add Dark Mode / Theme Toggle:** Introduce a dark mode option to improve readability and reduce eye strain in low-light environments.

### ✅ Summary

The **Weather Now** application is built around the core `WeatherNow.jsx` component, which contains all the logic and UI. The state management follows a clear flow: a user's **query** updates the list of **cities**, and selecting a **selectedCity** triggers the fetch for **weather** and **hourlyForecast** data.

All styling and responsive design are managed efficiently with **Tailwind CSS**. The project is fully functional in StackBlitz out-of-the-box and does not require an API key. Essential features like **error handling** and **loading states** are built-in, making the application robust.

For future improvements, the app can be easily extended with new features such as **weather icons**, a **temperature unit toggle**, and **geolocation support**.

### 🔄 State & API Flow Diagram

```bash
[User Input: City Name]
      │
      ▼
┌─────────────────┐
│   query state   │
└─────────────────┘
      │
      ▼
[fetchCities → Open-Meteo Geocoding]
      │
      ├── Success → store in
      ▼
┌─────────────────┐
│   cities state  │
└─────────────────┘
      │
      ▼
[User selects city]
      │
      ▼
┌───────────────────────────┐
│    selectedCity state     │
└───────────────────────────┘
      │
      ▼
[fetchWeather → Open-Meteo Forecast]
      │
      ├── Success → extract:
      │   - Current weather → weather state
      │   - Hourly forecast → hourlyForecast state
      │
      └── Failure → set error state
      │
      ▼
┌───────────────────────────┐
│   UI Updates Automatically│
│   - Weather card          │
│   - 3-hour forecast scroll│
│   - Sunrise/Sunset info   │
│   - Error messages        │
└───────────────────────────┘

```









