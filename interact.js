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

async function getWeater(){
    let cityName = searchInput.value.trim().toLowerCase();
    searchInput.value = "";
    if(!cityName) return;
    let geocoding_api_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    
    fetch(geocoding_api_url)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
    })
}

searchButton.addEventListener('click', getWeater);
