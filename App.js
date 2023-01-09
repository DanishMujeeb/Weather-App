import React, { useState } from "react";
import Axios from "axios";

function App() {

  const [city, setCity] = useState("")
  const [currentCityData, setCurrentCityData] = useState({})
  const [cityData, setCityData] = useState({})
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c39949a2364450759bba7e754bff92f0&units=metric`
  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c39949a2364450759bba7e754bff92f0&units=metric`

  if(cityData.list != null)
  {
      var date2 = new Date(cityData.list[4].dt*1000).toDateString()
      var date3 = new Date(cityData.list[12].dt*1000).toDateString()
  }

  const getCurrentCityData = () => {
    Axios.get(url).then((response) => {
      setCurrentCityData(response.data)
    }).catch(() => {alert(city+" is not a city")})
  }

  const getCityData = () => {
    Axios.get(url2).then((response) => {
      setCityData(response.data)
    })
  }

  const capatilize = (description) => {
    let descriptionArr = description.split(" ") 
    descriptionArr[0] = descriptionArr[0].charAt(0).toUpperCase() + descriptionArr[0].substring(1,)
    if(descriptionArr.length > 1)
    {
      descriptionArr[1] = descriptionArr[1].charAt(0).toUpperCase() + descriptionArr[1].substring(1,)
      return descriptionArr[0] + " " + descriptionArr[1]
    }
    return descriptionArr[0]
  } 

  return (
    <div>
      <h1 style={{color: "white"}}>Weather App</h1>
      <label className="city">
        <input onChange={(e) => setCity(e.target.value)} type="text" placeholder="Enter City"/>
      </label>
      <button onClick={() => {getCurrentCityData();getCityData()}} className="submit">Get Weather</button>
      <h1 className="cityName">{city}</h1>
      <div className="info">
        <div className="day1">
          {currentCityData.main ? <h2>Current</h2> : null}
          {currentCityData.weather ?  <img src={`http://openweathermap.org/img/wn/${currentCityData.weather[0].icon}@2x.png`}/>: null}
          {currentCityData.main ? <h2>{Math.round(currentCityData.main.temp)}°C</h2> : null}
          {currentCityData.weather ? <p>Description: {capatilize(currentCityData.weather[0].description)}</p> : null}
          {currentCityData.main ? <p>Feels Like: {Math.round(currentCityData.main.feels_like)}°C</p> : null}
          {currentCityData.wind ? <p>Wind: {Math.round(currentCityData.wind.speed*3.6)}km/h</p> : null}
          {currentCityData.main ? <p>Humidity: {currentCityData.main.humidity}%</p> : null}
        </div>
        <div className="day1">
          {cityData.list ? <h2>{date2}</h2> : null}
          {cityData.list ?  <img src={`http://openweathermap.org/img/wn/${cityData.list[4].weather[0].icon.substring(0,2)}d@2x.png`}/>: null}
          {cityData.list ? <h2>{Math.round((cityData.list[4].main.temp))}°C</h2> : null}
          {cityData.list ? <p>Description: {capatilize(cityData.list[4].weather[0].description)}</p> : null}
          {cityData.list ? <p>Feels Like: {Math.round(cityData.list[4].main.feels_like)}°C</p> : null}
          {cityData.list ? <p>Wind: {Math.round(cityData.list[4].wind.speed*3.6)}km/h</p> : null}
          {cityData.list ? <p>Humidity: {cityData.list[4].main.humidity}%</p> : null}
        </div>
        <div className="day1">
          {cityData.list ? <h2>{date3}</h2> : null}
          {cityData.list ? <img src={`http://openweathermap.org/img/wn/${cityData.list[12].weather[0].icon.substring(0, 2)}d@2x.png`}/>: null}
          {cityData.list ? <h2>{Math.round((cityData.list[12].main.temp))}°C</h2> : null}
          {cityData.list ? <p>Description: {capatilize(cityData.list[12].weather[0].description)}</p> : null}
          {cityData.list ? <p>Feels Like: {Math.round(cityData.list[12].main.feels_like)}°C</p> : null}
          {cityData.list ? <p>Wind: {Math.round(cityData.list[12].wind.speed*3.6)}km/h</p> : null}
          {cityData.list ? <p>Humidity: {cityData.list[12].main.humidity}%</p> : null}
        </div>
      </div>
    </div>
  );
}


export default App;
