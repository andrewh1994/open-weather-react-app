import React, { useState } from 'react'

require('dotenv').config()
const apiKey = process.env.REACT_APP_API_KEY    //takes REACT_APP_API_KEY from .env file

export const Body = () => {

    const [textInput, setTextInput] = useState('')
    const [cityName, setCityName] = useState('')
    const [cityTemperature, setCityTemperature] = useState('_______')
    const [cityNotFound, setCityNotFound] = useState(false)

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            getCityTemperature()
        }
    }
    const handleChange = (event) => {
        setTextInput(event.target.value)
    }    

    const getCityTemperature = async () => {
        const response = await fetch(
            'https://api.openweathermap.org/data/2.5/weather?q='+textInput+'&appid='+apiKey+'&units=metric'
        ).catch(err => {
            console.log(err.response.data);
        });
        const data = await response.json()

        if(data.cod !== 404){       //if a code other than 404 is returned
            setCityName(textInput)  //update city name and other states etc.

            const selectedCityTemp = data.main.temp
            setCityTemperature(selectedCityTemp)
            setCityNotFound(false)
        } else if(data.cod === 404){
            console.log("Error, city not found")
            setCityNotFound(true)    //otherwise
        }
        
    }

    return (
    <div>
        <div className="row justify-content-center mb-4">
            <input
                type="text"
                placeholder="Enter city name"
                value={textInput}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                autoFocus 
            />
        </div>
        <div className="row justify-content-center mb-4">
            <button className="btn btn-warning rounded" onClick={getCityTemperature}>Display weather in chosen city</button>
        </div>
        <div className="row justify-content-center">
            <p>Here is the temperature in {cityName}: {cityTemperature}°C</p>
        </div>
        <div className="row justify-content-center">
            <p>{cityNotFound ? 'City name not found, please try again' : ''}</p>
        </div>
    </div>
    )
}
