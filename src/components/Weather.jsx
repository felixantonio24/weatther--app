import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [obj, setObj] = useState({});
  const [isBoolean, setisBoolean] = useState(false);
  const changeDegrees = () => setisBoolean(!isBoolean);

  const lonRef = useRef(null);
  const latRef = useRef(null);

  useEffect(() => {
    const success = (pos) => {
      lonRef.current = pos.coords.longitude;
      latRef.current = pos.coords.latitude;
      setObj({ lon: lonRef.current, lat: latRef.current });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const API_key = '9f181a0dab4b2c0f1f48613312413112';

  useEffect(() => {
    if (obj?.lat && obj?.lon) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&appid=${API_key}&units=metric`
        )
        .then((res) => setWeather(res.data))
        .catch((error) => console.log(error));
    }
  }, [obj]);

  console.log(weather);

  const degreesF = () => {
    if (weather !== `https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${API_key}&units=metric`) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${API_key}&units=imperial`
        )
        .then((res) => setWeather(res.data))
        .catch((error) => console.log(error));
    }
  };

  const degreesC = () => {
    if (weather !== `https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${API_key}&units=imperial`) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${API_key}&units=metric`
        )
        .then((res) => setWeather(res.data))
        .catch((error) => console.log(error));
    }
  };
  return (
    <section className='global-card'>
    <div className='main-card'>
    <div className='main-card_info'>
      <div className='main-card_temp'>
        <p className='main-card_p'>{weather.main?.temp} {isBoolean ? '°F' : '°C'}</p>
        <p><strong>Feels like:</strong> {weather.main?.feels_like} {isBoolean ? '°F' : '°C'}</p>
        <p><strong>Temperature MAX:</strong> {weather.main?.temp_max} {isBoolean ? '°F' : '°C'}</p>
        <p><strong>Temperature MIN:</strong> {weather.main?.temp_min} {isBoolean ? '°F' : '°C'}</p>
        <p><strong>Wind speed:</strong> {weather.wind?.speed} {isBoolean ? 'km/h' : 'm/seg'}</p>
        <p><strong>Clouds:</strong> {weather.clouds?.all} %</p>
        <p><strong>Pressure:</strong> {weather.main?.pressure} hPa</p>
      </div>
      <div className='main-card-img'>
        <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
      </div>
    </div>
    <div className='main-location'>
      <h3>{weather.name} {weather.sys?.country}</h3>
      <p>{weather.weather?.[0].description}</p>
    </div>
  </div>
  <div className='bg-button'>
    <button className='button' onClick={() => { degreesF(); changeDegrees(); }} disabled={isBoolean? true : false} >°F</button>
    <button className='button' onClick={() => { degreesC(); changeDegrees(); }} disabled={isBoolean? false : true}>°C</button>
  </div>
  </section>
  )
}

export default Weather