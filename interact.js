// my local api key is below
const apiKey = "350c92110068b8850f7e74c297509483"; 
const city = "london";

// more html dom elements
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('searchInput');
const currentLocationButton = document.getElementById('current-location-button');
const cityTitle = document.getElementById('city');
const temperatureTitle = document.getElementById('temperature');
const weatherContainer = document.querySelector('.weather');
const rightPanel = document.querySelector('.right-panel');

async function getWeater(){
    let city = searchInput.value.trim().toLowerCase();
    console.log(city);
    searchInput.value = "";
}

searchButton.addEventListener('click', getWeater);
