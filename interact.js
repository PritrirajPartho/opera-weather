// my local api key is below
const apiKey = "350c92110068b8850f7e74c297509483"; 
const city = "london";

// more html dom elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('searchInput');
const currentLocationButton = document.getElementById('current-location-button');
const cityTitle = document.getElementById('city');
const weatherContainer = document.querySelector('.weather');
const rightPanel = document.querySelector('.right-panel');


function getWeatherDetails(name, country, sunrise, sunset, id, icon, description, temp, humidity, pressure, feels_like, temp_min, temp_max, speed, deg, gust, all){  
    let forcast_api_url = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${apiKey}`;    

}


function getWeather(){
    let cityName = searchInput.value.trim().toLowerCase();
    searchInput.value = "";
    if(!cityName) return;
    let geocoding_api_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    
    fetch(geocoding_api_url)
    .then(response => response.json())
    .then(data =>{
        let{name} = data;
        let{temp, humidity, pressure, feels_like, temp_min, temp_max} = data.main;
        let{country, sunrise, sunset, id} = data.sys;
        let{speed, deg, gust} = data.wind;
        let{main, description, icon} = data.weather[0];
        let{all} = data.clouds;
        getWeatherDetails(name, country, sunrise, sunset, id, icon, description, temp, humidity, pressure, feels_like, temp_min, temp_max, speed, deg, gust, all);
        // let{visibility} = data.visibility;
        // console.log(visibility);
    })
    .catch(err => alert(`Something went wrong: ${err}`));
}

searchButton.addEventListener('click', getWeather);
