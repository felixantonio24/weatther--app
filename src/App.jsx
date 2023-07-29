import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Seeker from './components/Seeker';

function App() {
  const [weather, setWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  
  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4661c0188c2b72814e6c339f4d21739a`)
        .then((res) => setWeather(res.data));
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const handleSearch = (query) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=4661c0188c2b72814e6c339f4d21739a`)
      .then((res) => setWeather(res.data))
      .catch((error) => {
        console.log('Error fetching weather data:', error);
        setWeather({});
      });
  };

  return (
    <> 
    <div className='conteiner-principal'/>
      <Seeker onSearch={handleSearch} />
        <div className="card">
        <div className='title'>
          <p>{weather.name}, {weather.sys?.country}</p>
        </div>
        
      <div className='text-container'>
        <div className='img_cont'>
          <img src="/2.svg" alt="description"/>
          <p>
          {isCelsius ?  Math.floor((((weather.main?.temp - 273.15)* 9/5 + 32)- 32) * 5/9): Math.floor((weather.main?.temp - 273.15)* 9/5 + 32)}
          {' '}
          {isCelsius ? "ºC" : "ºF" }
          </p>
        </div>
        <ul className='description'>
          <li> Viento:{weather.wind?.speed} m/s</li>
          <li> Nubes: {weather.clouds?.all} %</li>
          <li> Presion: {weather.main?.pressure} mb</li>
        </ul>
      </div>
      </div>
      <button onClick={() => setIsCelsius(!isCelsius)} className='button-color-C°-f°'> Cambiar ºF/ºC </button>
    
    </>
  )
}

export default App