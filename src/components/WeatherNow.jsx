import React, { useState } from 'react';
import axios from 'axios';

const WeatherNow = () => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Helper for error messages
  const getErrorMessage = (err) => {
    if (!err.response) return 'Network error. Check your connection.';
    return 'An error occurred while fetching weather.';
  };

  // Fetch cities using Open-Meteo geocoding
  const fetchCities = async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    setWeather(null);
    setHourlyForecast([]);
    setSelectedCity(null);

    try {
      const res = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=3&language=en&format=json`
      );

      if (!res.data.results || res.data.results.length === 0) {
        setError('No cities found.');
        setCities([]);
      } else {
        setCities(res.data.results);
        setSelectedCity(res.data.results[0]); // suggest closest match
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setCities([]);
    }

    setLoading(false);
  };

  // Fetch weather using Open-Meteo
  const fetchWeather = async (city) => {
    if (!city) return;
    setLoading(true);
    setError('');
    setWeather(null);
    setHourlyForecast([]);

    try {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,pressure_msl&daily=sunrise,sunset&timezone=auto`
      );

      const cw = res.data.current_weather;
      const sunrise = res.data.daily?.sunrise?.[0];
      const sunset = res.data.daily?.sunset?.[0];

      setWeather({
        name: city.name,
        temp: cw.temperature,
        wind: cw.windspeed,
        weathercode: cw.weathercode,
        sunrise,
        sunset,
      });

      // Build 3-hour forecast (next 12 hours)
      const nowIndex = res.data.hourly.time.findIndex(
        (t) => new Date(t) >= new Date()
      );
      const forecast = res.data.hourly.time
        .slice(nowIndex, nowIndex + 12)
        .map((time, idx) => ({
          time,
          temp: res.data.hourly.temperature_2m[nowIndex + idx],
          humidity: res.data.hourly.relativehumidity_2m[nowIndex + idx],
          pressure: res.data.hourly.pressure_msl[nowIndex + idx],
        }));

      setHourlyForecast(forecast);
    } catch (err) {
      setError('Failed to fetch weather from Open-Meteo.');
      console.error(err);
    }

    setLoading(false);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCities([]);
    fetchWeather(city);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-blue-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Weather Now
        </h1>

        {/* Search */}
        <div className="flex flex-col relative mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city"
            className="border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => e.key === 'Enter' && fetchCities()}
          />
          <button
            onClick={fetchCities}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            Search
          </button>

          {cities.length > 1 && (
            <ul className="absolute top-20 left-0 right-0 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-60 overflow-auto">
              {cities.map((c, idx) => (
                <li
                  key={idx}
                  className="p-3 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleCitySelect(c)}
                >
                  {c.name}, {c.country} ({c.latitude.toFixed(2)},{' '}
                  {c.longitude.toFixed(2)})
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading && (
          <div className="animate-pulse space-y-2 mt-4">
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
            <div className="h-20 bg-gray-300 rounded mx-auto w-full"></div>
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 mt-4" role="alert">
            {error}
          </p>
        )}

        {!loading && !weather && !error && (
          <p className="text-center text-gray-500 mt-4">
            Enter a city to get current weather.
          </p>
        )}

        {weather && !loading && (
          <div className="mt-6 text-center flex flex-col items-center gap-2">
            <h2 className="text-xl font-semibold">{weather.name}</h2>
            <p className="text-4xl font-bold">{Math.round(weather.temp)}°C</p>
            <p className="text-gray-700">Sunrise: {weather.sunrise}</p>
            <p className="text-gray-700">Sunset: {weather.sunset}</p>

            {/* 3-hour forecast */}
            <div className="mt-4 w-full overflow-x-auto">
              <div className="flex gap-4">
                {hourlyForecast.map((f, idx) => (
                  <div
                    key={idx}
                    className="min-w-[80px] bg-blue-100 rounded-xl p-2 text-center"
                  >
                    <p className="text-sm">{new Date(f.time).getHours()}:00</p>
                    <p className="font-bold">{Math.round(f.temp)}°C</p>
                    <p className="text-xs">💧 {f.humidity}%</p>
                    <p className="text-xs">⚡ {f.pressure} hPa</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherNow;
