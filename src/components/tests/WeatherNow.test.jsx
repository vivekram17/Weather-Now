import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherNow from '../WeatherNow';

// Mock fetch
global.fetch = jest.fn();

describe('WeatherNow Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input and search button', () => {
    render(<WeatherNow />);
    expect(screen.getByPlaceholderText(/enter city/i)).toBeInTheDocument();
    expect(screen.getByText(/check/i)).toBeInTheDocument();
  });

  test('shows loading state when fetching', async () => {
    // Mock geocoding API
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            { name: 'Test City', latitude: 0, longitude: 0, country: 'TC' },
          ],
        }),
      })
      // Mock weather API
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          current_weather: { temperature: 20, windspeed: 5, winddirection: 90 },
        }),
      });

    render(<WeatherNow />);
    const input = screen.getByPlaceholderText(/enter city/i);
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(screen.getByText(/check/i));

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(/current weather in test city/i)
      ).toBeInTheDocument();
    });
  });

  test('shows error state if fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    render(<WeatherNow />);
    const input = screen.getByPlaceholderText(/enter city/i);
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(screen.getByText(/check/i));

    await waitFor(() => {
      expect(
        screen.getByText(/weather service is currently unavailable/i)
      ).toBeInTheDocument();
    });
  });

  test('shows error for empty input', () => {
    render(<WeatherNow />);
    fireEvent.click(screen.getByText(/check/i));
    expect(screen.getByText(/please enter a city name/i)).toBeInTheDocument();
  });
});
