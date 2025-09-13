// my local api key is below
const apiKey = "350c92110068b8850f7e74c297509483"; 
// more html dom elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search-button');
const currentLocationButton = document.getElementById('current-location-button');
const weatherContainer = document.querySelector('.weather');
const weatherCard = document.querySelector('.left-panel');
const forecastCard = document.querySelector('.right-panel');


function getWeatherDetails(name, country, lat, lon, sunrise, sunset, id, icon, description, temp, humidity, pressure, feels_like, temp_min, temp_max, speed, deg, gust, all){  
    let forcast_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;    
    weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;  
    
    days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]

    months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    fetch(weather_api_url)
    .then(response => response.json())
    .then(data => {
        let date = new Date();
        weatherCard.innerHTML = `
        
        `
    })
    .catch(err => alert(`weather error: ${err}`));

    // fetch forcast
    fetch(forcast_api_url)
    .then(response => response.json())
    .then(data => {
         let uniqueForecastDays = [];
         let fiveDaysForecast = data.list.filter(forecast => {
             let forecastDate = new Date(forecast.dt_txt).getDate();
             if(!uniqueForecastDays.includes(forecastDate)){
                 return uniqueForecastDays.push(forecastDate);
             }
         })
        console.log(fiveDaysForecast);
    })
    .catch(err => alert(`forecast error: ${err}`));

}


function getWeather(){
    let cityName = searchInput.value.trim().toLowerCase();
    searchInput.value = "";
    if(!cityName) return;
    let geocoding_api_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    
    fetch(geocoding_api_url)
    .then(response => response.json())
    .then(data =>{
        let{lat, lon} = data.coord;
        let{name,} = data;
        let{temp, humidity, pressure, feels_like, temp_min, temp_max} = data.main;
        let{country, sunrise, sunset, id} = data.sys;
        let{speed, deg, gust} = data.wind;
        let{main, description, icon} = data.weather[0];
        let{all} = data.clouds;
        getWeatherDetails(name, country, lat, lon, sunrise, sunset, id, icon, description, temp, humidity, pressure, feels_like, temp_min, temp_max, speed, deg, gust, all);
        // let{visibility} = data.visibility;
        // console.log(data);
    })
    .catch(err => alert(`Something went wrong: ${err}`));
}

searchButton.addEventListener('click', getWeather);
