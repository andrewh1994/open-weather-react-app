//jshint esversion:6
import React from 'react';
import ReactDOM from 'react-dom';
import logo from './OpenWeather-Logo.jpg';
require('dotenv').config();

const apiKey = process.env.REACT_APP_API_KEY;       //takes REACT_APP_API_KEY from .env file

//JSX is used to convert HTML into React elements
const myweatherLogo = <div className="App">
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo"  width="200"/>
    </header>
</div> ;
ReactDOM.render(myweatherLogo, document.getElementById('imageRoot'));


var button = document.querySelector('#weatherButton');
var textInput = document.querySelector('#textInput');

button.addEventListener('click', start);

textInput.addEventListener('keypress' ,function(event){
   // enter has keyCode = 13
   if (event.keyCode === 13) {
     start();
   }
 });

async function start(){
    var textInputValue = textInput.value;

    const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q='+textInputValue+'&appid='+apiKey+'&units=metric'
    );
    const data = await response.json();

    var selectedCityName = data.name;
    var selectedCityTemp = data.main.temp;
    var selectedCityFeelsLike = data.main.feels_like;
    var selectedCityDescription = data.weather[0].description
    var iconCode = data.weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/w/"+iconCode+".png";

    const selectedCityWeatherImage = <img src={iconUrl} className="App-logo" alt="logo" width="30" height="30" />;
    ReactDOM.render(selectedCityWeatherImage, document.getElementById('selectedCityWeatherImageRoot'));

    var selectedCityInfo = 'Here is the temperature in ' +selectedCityName +': ' +selectedCityTemp +'°C  (feels like ' + selectedCityFeelsLike + '°C )' ;
    ReactDOM.render(selectedCityInfo, document.getElementById('selectedCity'));

    var selectedCityWeatherInfo = 'There is ' +selectedCityDescription +' in ' +selectedCityName +' currently.';
    ReactDOM.render(selectedCityWeatherInfo, document.getElementById('selectedCityWeatherDescription'));

    get_user_city_data();
}


function get_user_city_data(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(set_user_coordinates);
    } else {
        console.error( "Error, geolocation is not supported by this browser.");
    }
}

function set_user_coordinates(position){
    var userLatitude = position.coords.latitude;
    var userLongitude = position.coords.longitude;

    set_user_location(userLatitude, userLongitude);
}

async function set_user_location(userLatitude, userLongitude){

    const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?lat='+userLatitude+'&lon='+userLongitude+'&appid='+apiKey+'&units=metric'
    );
    const data = await response.json();

    var userCityName = data.name;
    var userCityTemp = data.main.temp;
    var userCityInfo = 'Here is the temperature in your location (' +userCityName + '): ' +userCityTemp +'°C';
    ReactDOM.render(userCityInfo, document.getElementById('userCity'));

    compare_selected_and_user_city_temp(userCityTemp, userCityName);
}

async function compare_selected_and_user_city_temp(userCityTemp, userCityName){
    var textInputValue = textInput.value;

    const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q='+textInputValue+'&appid='+apiKey+'&units=metric'
    );
    const data = await response.json();

    var selectedCityName = data.name;
    var selectedCityTemp = data.main.temp;
    var temperatureDifference = (userCityTemp - selectedCityTemp).toFixed(2);
    var differenceDescriptor = ' colder than ';
    if(temperatureDifference >= 0){
      differenceDescriptor = ' warmer than ';
    }

    var comparisonMessage = userCityName+ ' is '+Math.abs(temperatureDifference)+ '°C' + differenceDescriptor +selectedCityName;
    ReactDOM.render(comparisonMessage, document.getElementById('comparison'));
}
