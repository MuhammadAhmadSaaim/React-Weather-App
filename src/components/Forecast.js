import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const { data } = weather;
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const fetchForecastData = async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/forecast?query=${data.city}&key=${apiKey}&units=metric`;
      try {
        const response = await axios.get(url);
        setForecastData(response.data.daily);
      } catch {
        console.error("Error fetching forecast data.");
      }
    };
    fetchForecastData();
  }, [data.city]);

  const formatDay = (dateString) => new Date(dateString * 1000).toLocaleDateString("en-US", { weekday: "short" });

  const toggleTemperatureUnit = () => setIsCelsius(!isCelsius);

  const renderTemperature = (temperature) => isCelsius ? Math.round(temperature) : Math.round((temperature * 9) / 5 + 32);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700">{data.city}, <span>{data.country}</span></h2>
      <span className="text-lg font-medium italic">{new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
      <div className="temp text-5xl font-bold text-gray-800 my-4">
        <img src={data.condition.icon_url} alt={data.condition.description} className="temp-icon w-1/5 inline" />
        {renderTemperature(data.temperature.current)}<sup className="cursor-pointer text-lg text-[#374151]" onClick={toggleTemperatureUnit}>{isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}</sup>
      </div>
      <p className=" text-pink-500 font-medium text-lg mb-4">{data.condition.description}</p>
      <div className=" flex justify-evenly items-center text-gray-700">
        <div className="col flex items-center">
          <ReactAnimatedWeather icon="WIND" size={40} color={"#374151"} />
          <div className="ml-2">
            <p>{data.wind.speed}m/s</p>
            <p>Wind Speed</p>
          </div>
        </div>
        <div className="col flex items-center">
          <ReactAnimatedWeather icon="RAIN" size={40} color={"#374151"} />
          <div className="ml-2">
            <p>{data.temperature.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-[#374151] mt-8">4-Day Forecast</h3>
      <div className="forecast-container flex justify-between mt-4">
        {forecastData.slice(0, 4).map((day) => (
          <div key={day.time} className="flex flex-col items-center bg-[#374151] rounded-lg shadow-sm p-4 mx-2">
            <p className="font-medium text-white">{formatDay(day.time)}</p>
            <img src={day.condition.icon_url} alt={day.condition.description} className="day-icon w-12 h-12" />
            <p className="text-white">{Math.round(day.temperature.minimum)}° / <span>{Math.round(day.temperature.maximum)}°</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
