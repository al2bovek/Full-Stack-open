import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;

            try {
                const response = await axios.get(url);
                setWeather(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchWeather();
    }, [capital]);



    return (
        <div>
            <h2>Weather in {capital}</h2>
            {weather ? (
                <div>
                    <p>Temperature: {weather.main.temp} °C</p>
                    <p>Wind: {weather.wind.speed} m/s</p>
                    <p>Condition: {weather.weather[0].description}</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="Weather icon"
                    />
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default Weather;
