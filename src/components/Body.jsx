import React, { useState } from 'react'

require('dotenv').config()
const apiKey = process.env.REACT_APP_API_KEY    //takes REACT_APP_API_KEY from .env file

export const Body = () => {

    const [cityName, setCityName] = useState('_______')
    const [cityTemperature, setCityTemperature] = useState('_______')

    const handleClick = () => {
        getCityName()
    }
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            getCityName()
        }
    }

    const getCityName = () => {
        const textInput = document.querySelector('#textInput')
        const textInputValue = textInput.value

        getCityTemperature(textInputValue)
    }

    const getCityTemperature = async (textInputValue) => {
        const response = await fetch(
            'https://api.openweathermap.org/data/2.5/weather?q='+textInputValue+'&appid='+apiKey+'&units=metric'
        )
        const data = await response.json()

        const selectedCityName = data.name
        setCityName(selectedCityName)

        const selectedCityTemp = data.main.temp
        setCityTemperature(selectedCityTemp)
    }

    return (
    <div>
        <div className="row justify-content-center mb-4">
            <input type="text" id="textInput" onKeyDown={handleKeyDown}></input>
        </div>
        <div className="row justify-content-center mb-4">
            <button className="btn btn-warning rounded" onClick={handleClick}>Display weather in chosen city</button>
        </div>
        <div className="row justify-content-center">
            <p>Here is the temperature in {cityName}: {cityTemperature}°C</p>
        </div>
    </div>
    )

}
