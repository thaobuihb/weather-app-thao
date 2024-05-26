import React, { useState, useEffect } from "react";

const api = {
  key: "148c4a9722ac89f59b5774d67e4746e8",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [erroMessage, setErroMessage] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(
            `${data.name}, ${data.sys.country}, ${data.weather[0].description}, ${data.main.temp}`
          )
          setErroMessage("");
        } else {
          setErroMessage(data.message);
        }
      } catch (error) {
        setErroMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        ></input>
        <button>Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {erroMessage ? (
            <div style={{ color: "red" }}>{erroMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
