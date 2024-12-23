/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "4102275408846167441dd11b17fcdb30"; // Replace with your OpenWeatherMap API key.

  const fetchWeather = async () => {
    try {
      setError(""); // Clear any previous error messages.
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    }
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return <WiDaySunny size={80} color="#FFD700" />;
      case "Clouds":
        return <WiCloud size={80} color="#B0C4DE" />;
      case "Rain":
        return <WiRain size={80} color="#4682B4" />;
      case "Snow":
        return <WiSnow size={80} color="#ADD8E6" />;
      case "Thunderstorm":
        return <WiThunderstorm size={80} color="#800080" />;
      default:
        return <WiCloud size={80} color="#B0C4DE" />;
    }
  };

  return (
    <div className="app">
      <div className="weather-container">
        <h1>Weather App</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <div className="weather-icon">
              {getWeatherIcon(weatherData.weather[0].main)}
            </div>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Condition: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
