import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });

  const toDate = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    return `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  };

  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather({ ...weather, loading: true });
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

      await axios.get(url)
        .then((res) => setWeather({ data: res.data, loading: false, error: false }))
        .catch(() => setWeather({ ...weather, data: {}, error: true }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const url = `https://api.shecodes.io/weather/v1/current?query=Lahore&key=${apiKey}`;
      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch {
        setWeather({ data: {}, loading: false, error: true });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App text-center mx-auto w-11/12 max-w-lg bg-white bg-opacity-50 rounded-lg shadow-lg p-4">
      <SearchEngine query={query} setQuery={setQuery} search={search} />
      {weather.loading && <h4 className="mt-4 text-gray-600">Searching...</h4>}
      {weather.error && (
        <p className="error-message text-center text-red-500 font-bold text-xl mt-6">
          Sorry, city not found. Please try again.
        </p>
      )}
      {weather?.data?.condition && <Forecast weather={weather} toDate={toDate} />}
    </div>
  );
}

export default App;
