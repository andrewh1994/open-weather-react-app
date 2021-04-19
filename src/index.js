import React from 'react';
import ReactDOM from 'react-dom';

import logo from './OpenWeather-Logo.jpg';


//JSX is used to convert HTML into React elements
const myweather_logo = 
<div className="App">
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo"  width="200"/>
    </header>
</div> ;

ReactDOM.render(myweather_logo, document.getElementById('image_root'));


var button = document.querySelector('.weather_button');

button.addEventListener('click',  async function(){

    var inputValue = document.querySelector('.inputValue').value;
    //console.log("Here is the inputValue "+ inputValue);

    
    const response = await fetch(
        'http://api.openweathermap.org/data/2.5/weather?q='+inputValue+'&appid=32a2b57882deec5c590427c5e65b76ae'
    );
    const data = await response.json();
    //console.log(data);
    
    var selected_city_name_value = data.name;
    //console.log("Here is the selected_city_name_value: " + selected_city_name_value);
    
    var selected_city_temp_value_kelvin = data.main.temp;
    var selected_city_temp_value_celsius = (selected_city_temp_value_kelvin - 273.15 ).toFixed(2);
    //console.log("Here is the selected city temp: " + selected_city_temp_value_celsius);

    var selected_city_feels_like_value_kelvin = data.main.feels_like;
    var selected_city_feels_like_value_celsius = (selected_city_feels_like_value_kelvin - 273.15 ).toFixed(2);
    //console.log("Here is what the selected city temp feels like: " + selected_city_feels_like_value_celsius);

    var selected_city_description = data.weather[0].description
    //console.log("Here is the selected_city_description: " + selected_city_description);

    var icon_code = data.weather[0].icon;
    var icon_url = "http://openweathermap.org/img/w/" + icon_code + ".png";
    //console.log("Here is the iconcode: " + icon_url);

    const selected_city_weather_image = 
    <img src={icon_url} className="App-logo" alt="logo" width="30" height="30" />;

    ReactDOM.render(selected_city_weather_image, document.getElementById('selected_city_weather_image_root'));

    var selected_city_info = 'Here is the temperature in ' +selected_city_name_value +': ' +selected_city_temp_value_celsius +'°C  (feels like ' + selected_city_feels_like_value_celsius + '°C )' ;
    ReactDOM.render(selected_city_info, document.getElementById('selected_city'));
    
    var selected_weather_description_info = 'There is ' +selected_city_description +' in ' +selected_city_name_value +' currently.';
    ReactDOM.render(selected_weather_description_info, document.getElementById('selected_city_weather_description'));
    
    get_user_city_data();

})


function get_user_city_data() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.error( "Error, geolocation is not supported by this browser.");
    }
}


function showPosition(position) {
    
    var user_latitude = position.coords.latitude;
    var user_longitude = position.coords.longitude;
    //console.log( "latitude is: " + user_latitude );
    //console.log( "longitude is: " + user_longitude );

    setLocation(user_latitude, user_longitude);
}


async function setLocation(user_latitude, user_longitude){

    const response = await fetch(
        'http://api.openweathermap.org/data/2.5/weather?lat='+user_latitude+'&lon='+user_longitude+'&appid=32a2b57882deec5c590427c5e65b76ae'
    ); 
    const data = await response.json();
    //console.log(data);

    var user_city_name_value = data.name;
    //console.log("Here is the user_city_name_value: " + user_city_name_value);

    var user_city_temp_value_kelvin = data.main.temp;
    var user_city_temp_value_celsius = (user_city_temp_value_kelvin - 273.15 ).toFixed(2);
    //console.log("Here is the users city temp: " + user_city_temp_value_celsius);
    
    var user_city_info = 'Here is the temperature in your location (' +user_city_name_value + '): ' +user_city_temp_value_celsius +'°C';
    
    ReactDOM.render(user_city_info, document.getElementById('user_city'));

    compare_selected_and_user_city_temp(user_city_temp_value_celsius, user_city_name_value);
}  


async function compare_selected_and_user_city_temp(user_city_temp_value_celsius, user_city_name_value){

    var inputValue = document.querySelector('.inputValue').value;
    //console.log("Here is the inputValue "+ inputValue);

    const response = await fetch(
        'http://api.openweathermap.org/data/2.5/weather?q='+inputValue+'&appid=32a2b57882deec5c590427c5e65b76ae'
    );
    const data = await response.json();  
    //console.log(data);

    var selected_city_name_value = data.name;
    //console.log("Here is the selected_city_name_value: " + selected_city_name_value);
    
    var selected_city_temp_value_kelvin = data.main.temp;
    var selected_city_temp_value_celsius = (selected_city_temp_value_kelvin - 273.15 ).toFixed(2);
    //console.log("Here is the selected city temp for comparison: " + selected_city_temp_value_celsius);
    //console.log("Here is the user city temp  for comparison: " + user_city_temp_value_celsius);
    
    var temperature_difference = (user_city_temp_value_celsius - selected_city_temp_value_celsius).toFixed(2);
    //console.log("Here is the temp difference: " + temperature_difference);
    

    var comparison_message = 'The difference in temperature between ' +user_city_name_value+ ' and '+selected_city_name_value 
    + ' is: ' +temperature_difference +' °C';
    
    ReactDOM.render(comparison_message, document.getElementById('comparison'));
    
}

