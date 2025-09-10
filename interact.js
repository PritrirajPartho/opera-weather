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

async function getWeather(city) {
  try {
      const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!weatherResponse.ok || !forecastResponse.ok) {
          throw new Error('City not found. Please try again.');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();
      console.log(forecastData);
      console.log(weatherData);

      updateWeather(weatherData, forecastData);
  } catch (error) {
      showError(error.message);
  }
}
// fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   });
