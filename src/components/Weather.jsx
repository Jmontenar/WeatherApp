import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Weather = ({lat, lon}) =>{

const [weatherApp, setWeatherApp] = useState()
const [temperature, setTemperature] = useState()
const [tempretature_max, setempretature_max] = useState()
const [tempretature_min, setempretature_min] = useState()
const [feels_likes, setFeels_likes] = useState()
const [isCelsius, setisCelsius] = useState(true)
const [isLoading, setisLoading] = useState(true)

useEffect (() => {
  if (lat){
    const APIKey = '70d20fb01fdf41de76a308f555d535e0'
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

    axios.get(URL)
      .then(res => {
        setWeatherApp(res.data)
        const temp = {
        celsius: `${Math.round(res.data.main.temp -273.15)} °C`,
        fahrenheit: `${Math.round((res.data.main.temp-273.15) * 9/5 +32)} °F`,
      }
      const temp_max = {
        celsius: `${Math.round(res.data.main.temp_max -273.15)} °C`,
        fahrenheit: `${Math.round((res.data.main.temp_max -273.15) * 9/5 +32)} °F`,
      }
      const temp_min = {
        celsius: `${Math.round(res.data.main.temp_min -273.15)} °C`,
        fahrenheit: `${Math.round((res.data.main.temp_min -273.15) * 9/5 +32)} °F`,
      }
      const feels_likes = {
        celsius: `${Math.round(res.data.main.feels_like -273.15)} °C`,
        fahrenheit: `${Math.round((res.data.main.feels_like -273.15) * 9/5 +32)} °F`,
      }
      setTemperature(temp)
      setempretature_max(temp_max)
      setempretature_min(temp_min)
      setFeels_likes(feels_likes)
      setisLoading(false)
      })
      .catch(err => console.log(err))
  }
}, [lat,lon])
console.log(weatherApp)
const handleClick = () => setisCelsius(!isCelsius)

return (
  <article className="Principal_card">
    <section className="title tracking-in-contract"><h1>Weather App</h1></section>
    <div className='big_container'>
    <div className="container_">
    <div className="location text-focus-in">
      <h1 className='focus-in-contract'>Ubicación</h1>
      <div className='text-focus-in'>
      <h2>{`${weatherApp?.name},${weatherApp?.sys.country}`}</h2>
        <img src={weatherApp && `http://openweathermap.org/img/wn/${weatherApp?.weather[0].icon}@2x.png`} alt="" />
        <h3>&#34;{weatherApp?.weather[0].description}&#34;</h3>
      </div>
      </div>
      <div className="clouds text-focus-in">
        <h1 className='focus-in-contract'>Nubosidad</h1>
      <ul className='text-focus-in'>
        <li><span>Velocidad del viento:</span> {weatherApp?.wind.speed} m/s</li>
        <li><span>Nubes:</span> {weatherApp?.clouds.all} %</li>
        <li><span>Presión:</span> {weatherApp?.main.pressure} hPa</li>
      </ul>
      </div>
    </div>
    <div className="temperature_container text-focus-in">
    <div className="temperature text-focus-in">
      <ul className='temperature_information'>
        <li><span>Temperature</span> {isCelsius ? temperature?.celsius : temperature?.fahrenheit}</li>
        <li><span>Maximun Temperature</span> {isCelsius ? tempretature_max?.celsius : tempretature_max?.fahrenheit}</li>
        <li><span>Minimun Temperature</span> {isCelsius ? tempretature_min?.celsius : tempretature_min?.fahrenheit}</li>
        <li><span>Feels like</span> {isCelsius ? feels_likes?.celsius : feels_likes?.fahrenheit}</li>
        <li><span>Humidity</span> {weatherApp?.main.humidity} %</li>
      </ul>
      <div className="button_container">
      <button className='btn' onClick={handleClick}>{isCelsius ? "Change to °F":"Change to °C"}</button>
      </div>
      </div>
    </div>
    </div>  
    <footer className='footer'>
      <p>Desarrolllado por Jorge Monterrosa</p>
      <p>Todos los derechos reservados ©</p>
    </footer>
  </article>
)
}
export default Weather