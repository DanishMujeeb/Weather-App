import React, { useState } from "react";
import Axios from "axios"; // Allows us to use axios

function App() {

  // Below the useState hook has been used to define and update variables
  const [city, setCity] = useState("")
  const [currentCityData, setCurrentCityData] = useState({})
  const [cityData, setCityData] = useState({})
  const [day1, setDay1] = useState(0)
  const [day2, setDay2] = useState(0)

  // url is the url for the curent weather API while url2 is the url for the forecast API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c39949a2364450759bba7e754bff92f0&units=metric`
  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c39949a2364450759bba7e754bff92f0&units=metric`
  
  // This defines variables to store the dates
  if(cityData.list != null)
  {
      var date2 = new Date(cityData.list[4].dt*1000).toDateString() // Multiplying by 1000 and the toDateString puts the date in a readable format
      var date3 = new Date(cityData.list[12].dt*1000).toDateString()
  }

  // Uses axios to get a promise that return a response object and then sets currentCityData to the response object's data
  const getCurrentCityData = () => {
    Axios.get(url).then((response) => {
      setCurrentCityData(response.data)
    }).catch(() => {alert(city+" is not a city")}) // Runs if an error occurs or if the input is not a city
  }

  // Uses axios to get a promise that return a response object and then sets cityData to the response object's data
  const getCityData = () => {
    Axios.get(url2).then((response) => {
      setCityData(response.data)
      let firstDay = false
      // The below code sets day1 and day2 to the element in list that has a substring of 12 in its dt_text property value
      // This is done so the information that is shown for the second and third day is what the information is at noon during that day
      for(let k=0;k<15;k++) 
      {
        if(response.data.list[k].dt_txt.substring(11, 13) === "12" && !firstDay) // Checks if the property value of dt_txt has a substring from index 11-13 equal to 12
        {
          setDay1(k)
          firstDay = true
        }
        else if(response.data.list[k].dt_txt.substring(11, 13) === "12")
        {
          setDay2(k) // Sets day2 to the value of k
          break
        }
      }
    })
  }

  // Capatilizes the first letter in each word in the description
  const capatilize = (description) => {
    let descriptionArr = description.split(" ") 
    descriptionArr[0] = descriptionArr[0].charAt(0).toUpperCase() + descriptionArr[0].substring(1,) // Capatilizes the first letter in the first word and adds it to the rest of the word
    if(descriptionArr.length > 1) // Runs if the length of descriptionArr is greater than 1
    {
      descriptionArr[1] = descriptionArr[1].charAt(0).toUpperCase() + descriptionArr[1].substring(1,)
      return descriptionArr[0] + " " + descriptionArr[1] // Returns the words with the first letter's capatilized
    }
    return descriptionArr[0]
  } 

  // The below code displays all of the features of the app including the title, the input, the button and the weather information for the 3 days
  return (
    <div>
      <h1 style={{color: "white"}}>Weather App</h1> {/*Displays Weather App in white font*/}
      <label className="city">
        <input onChange={(e) => setCity(e.target.value)} type="text" placeholder="Enter City"/> {/*Sets city to whatever the user inputs in the textbox*/}
      </label>
      <button onClick={() => {getCurrentCityData();getCityData()}} className="submit">Get Weather</button> {/*Will call the getCurrentCityData and getCityData functions when clicked*/}
      <h1 className="cityName">{city}</h1> {/*Displays the city name*/}
      <div className="info">
        <div className="day1">
          {/*The below code uses the properties in the currentCityData object to display the current temperature, feels like, wind speed, etc.*/}
          {currentCityData.main ? <h2>Current</h2> : null} 
          {currentCityData.weather ?  <img src={`http://openweathermap.org/img/wn/${currentCityData.weather[0].icon}@2x.png`}/>: null} {/*Gets an image from the API to match the current weather*/}
          {currentCityData.main ? <h2>{Math.round(currentCityData.main.temp)}°C</h2> : null} 
          {currentCityData.weather ? <p>Description: {capatilize(currentCityData.weather[0].description)}</p> : null} 
          {currentCityData.main ? <p>Feels Like: {Math.round(currentCityData.main.feels_like)}°C</p> : null} 
          {currentCityData.wind ? <p>Wind: {Math.round(currentCityData.wind.speed*3.6)}km/h</p> : null} 
          {currentCityData.main ? <p>Humidity: {currentCityData.main.humidity}%</p> : null} 
        </div>
        {/*The below code uses the properties in the cityData object to display the temperature, feels like, wind speed, etc. at 12:00 on that day*/}
        <div className="day1">
          {cityData.list ? <h2>{date2}</h2> : null} {/*Displays the date for the second day*/}
          {cityData.list ?  <img src={`http://openweathermap.org/img/wn/${cityData.list[day1].weather[0].icon.substring(0,2)}d@2x.png`}/>: null}
          {cityData.list ? <h2>{Math.round((cityData.list[day1].main.temp))}°C</h2> : null}
          {cityData.list ? <p>Description: {capatilize(cityData.list[day1].weather[0].description)}</p> : null}
          {cityData.list ? <p>Feels Like: {Math.round(cityData.list[day1].main.feels_like)}°C</p> : null}
          {cityData.list ? <p>Wind: {Math.round(cityData.list[day1].wind.speed*3.6)}km/h</p> : null}
          {cityData.list ? <p>Humidity: {cityData.list[day1].main.humidity}%</p> : null}
        </div>
        <div className="day1">
          {cityData.list ? <h2>{date3}</h2> : null} {/*Displays the date for the third day*/}
          {cityData.list ? <img src={`http://openweathermap.org/img/wn/${cityData.list[day2].weather[0].icon.substring(0, 2)}d@2x.png`}/>: null}
          {cityData.list ? <h2>{Math.round((cityData.list[day2].main.temp))}°C</h2> : null}
          {cityData.list ? <p>Description: {capatilize(cityData.list[day2].weather[0].description)}</p> : null}
          {cityData.list ? <p>Feels Like: {Math.round(cityData.list[day2].main.feels_like)}°C</p> : null}
          {cityData.list ? <p>Wind: {Math.round(cityData.list[day2].wind.speed*3.6)}km/h</p> : null}
          {cityData.list ? <p>Humidity: {cityData.list[day2].main.humidity}%</p> : null}
        </div>
      </div>
    </div>
  );
}

export default App;
