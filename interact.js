// my local api key is below
const apiKey = "350c92110068b8850f7e74c297509483"; 
// more html dom elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search-button');
const currentLocationButton = document.getElementById('current-location-button');
const weatherContainer = document.querySelector('.weather');
const weatherCard = document.querySelector('.left-panel');
const forecastCard = document.querySelector('.right-panel');


function getWeatherDetails( lat, lon){  
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
        let{name, dt, timezone} = data;
        let{temp, humidity, pressure, feels_like, temp_min, temp_max} = data.main;
        let{country, sunrise, sunset, id} = data.sys;
        let{speed, deg, gust} = data.wind;
        let{main, description, icon} = data.weather[0];  
        // date and time conversion
        let date = new Date((dt + timezone) * 1000);
        let options = {
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "long"
        };
        // Format the date
        let formattedDate = date.toLocaleDateString("en-GB", options);

        console.log(dt,data, timezone);   
        weatherCard.innerHTML = `  
                <div class="left-panel">
                    <h1 id="city">${name}, ${country}</h1>
                    <h2>${formattedDate}</h2>
                    <div class="temperature-data">
                        <h1 id="temperature">${(temp-273.15).toFixed(2)}&deg;C</h1>
                    </div>
                    <p class="weather-description">
                      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Icon" srcset="">
                      ${getWeatherDescription(main, description)}
                    </p>
                    <div class="temparature-card-container">
                        <div class="temparature-card">
                            <p><i class="fa-solid fa-temperature-three-quarters"></i> Real Feels</p>
                            <h1>30&deg;C</h1>
                            <p>Humidity make it feels warmer</p>
                        </div>
                        <div class="temparature-card">
                            <p><i class="fa-solid fa-droplet"></i> Humidity</p>
                            <h1>82%</h1>
                            <p></p>
                        </div>
                        <div class="temparature-card">
                            <p><i class="fa-solid fa-fan"></i>
                                Air Quality</p>
                            <h1>36</h1>
                            <p>Air Quality is good.A perfect day for walk!</p>
                        </div>
                        <div class="temparature-card">
                            <p><i class="fa-solid fa-eye"></i> visibility</p>
                            <h1>6 mig/m3</h1>
                            <p></p>
                        </div>
                        <div class="temparature-card">
                            <p><i class="fa-solid fa-cloud"></i>
                                chance of rain</p>
                            <h1>86%</h1>
                            <p>could be a rainy day</p>
                        </div>
                    </div>
                </div>
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
        // console.log(fiveDaysForecast);
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
        getWeatherDetails( lat, lon);
    })
    .catch(err => alert(`Something went wrong: ${err}`));
}

searchButton.addEventListener('click', getWeather);

// get weather message to here
function getWeatherDescription(main, description){
  if (main === "Clear") {
    return "It's a clear and sunny day!";
  } else if (main === "Clouds") {
    return `The sky is ${description}.`;
  } else if (main === "Rain") {
    return `Expect ${description} today, don't forget an umbrella!`;
  } else if (main === "Snow") {
    return `It's snowing: ${description}. Stay warm!`;
  } else if (main === "Thunderstorm") {
    return "Thunderstorms are expected — stay safe indoors.";
  } else {
    return `The weather today is ${description} (${main}).`;
  }
}
