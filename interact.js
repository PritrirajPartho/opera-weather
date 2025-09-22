// my openweather api key is below
const apiKey = "350c92110068b8850f7e74c297509483"; 

// more html dom elements are below
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search-button');
const currentLocationButton = document.getElementById('current-location-button');
const weatherContainer = document.querySelector('.weather');
const weatherCard = document.querySelector('.left-panel');
const forecastCard = document.querySelector('.right-panel');
const fiveDaysForecastContainer = document.querySelector('.day-based-forecast-container');
const hourlyForecastContainer = document.querySelector('.hourly-forecast-container');




function getWeatherDetails(lat, lon, name, country, state){  

    let weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`; 

    let forcast_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`; 
    
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

    // weather api call
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
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        };
        // Formatted the date
        let formattedDate = date.toLocaleDateString("en-GB", options);
        console.log("weather api call",data);
        weatherCard.innerHTML = `  
                    <div class="temperature-data">
                        <h2 id="city">${name}, ${country}</h2>
                        <h2 class="date">${formattedDate}</h2>
                        <h1 id="temperature">${Math.round(temp - 273.15)} <span class="unit">&deg;C</span></h1>
                        <p class="weather-description">
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Icon" srcset="">
                           <span> ${getWeatherDescription(main, description)} </span>
                        </p>
                    </div>
                    <div class="temparature-card-container">
                        <div class="row">
                            <h3>Humidity</h3>
                            <h3>${humidity}<span class="unit">%</span></h3>
                        </div>
                        <div class="row">
                            <h3>Real feel</h3>
                            <h3>${Math.round(feels_like - 273.15)}<span class="unit">°</span></h3>
                        </div>
                        <div class="row">
                            <h3>temerature</h3>
                            <h3>${Math.round(temp_min - 273.15)} / ${Math.round(temp_max - 273.15)}<span class="unit">°</span}</h3>
                        </div>
                        <div class="row">
                            <h3>Pressure</h3>
                            <h3>${pressure}<span class="unit">mbar</span></h3>
                        </div>
                        <div class="row">
                            <h3>visibility</h3>
                            <h3>${(data.visibility / 1000)}<span class="unit">km/h</span></h3>
                        </div>
                    </div>
        `
    })
    .catch(err => alert(`weather error: ${err}`));


    // fetch forcast api
    fetch(forcast_api_url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        let fiveDaysForecast = [];
        let uniqueDays = [];

        data.list.forEach(item => {
        let day = new Date(item.dt_txt).getDate();

        if (!uniqueDays.includes(day)) {
            uniqueDays.push(day);
            fiveDaysForecast.push(item);
           }
        });

        // hourly forecast
        console.log(data);
        hourlyForecastContainer.innerHTML = "";
        for (let i = 0; i < 6; i++) {
            let date = new Date(data.list[i].dt_txt);
            let hours = date.getHours();
            let ampm = hours >= 12 ? "PM" : "AM";
            let formattedTime = `${hours}:00 ${ampm}`;

            hourlyForecastContainer.innerHTML += `
                <div class="hourly-forecast-card">
                    <p>${formattedTime}</p>
                    <div class="hourly-forecast-data">
                        <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="Icon">
                        <p>${data.list[i].pop * 100}%</p>
                    </div>
                    <p>${data.list[i].wind.speed} km/h</p>
                    <h2>${(data.list[i].main.temp - 273.15).toFixed(2)}&deg;C</h2>
                </div>
            `;
        }
 
        // five days forecast
        fiveDaysForecastContainer.innerHTML = "";
        for(let i = 1; i < fiveDaysForecast.length; i++){
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastContainer.innerHTML += `
                <div class="day-forecast-card">
                    <p>${date.getDate()} ${months[date.getMonth()]},${days[date.getDay()]}</p>
                    <div class="day-forecast-data">
                        <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}@2x.png" alt="Icon" srcset="">
                        <h1>${(fiveDaysForecast[i].main.temp-273.15).toFixed(2)}&deg;C</h1>
                    </div>
                </div>
            `;
        }

    })
    .catch(err => alert(`forecast error: ${err.message}`));

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


function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        const reverse_geocoding_api_url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
        fetch(reverse_geocoding_api_url)
        .then(response => response.json())
        .then(data => {
          let{lat, lon, name, country, state} = data[0];
          getWeatherDetails(lat, lon, name, country, state);
        })
        .catch(err => alert(`Something went wrong: ${err}`));
    })
}



// all button events or callback
searchButton.addEventListener('click', getWeather);
currentLocationButton.addEventListener('click', getCurrentLocation);
window.addEventListener('load', getCurrentLocation);
searchInput.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
})

// get dynamic weather message to here adjust with data
function getWeatherDescription(main, description){
    if (main === "Clear") {
        return "It's a clear and sunny day!";
    } else if (main === "Clouds") {
        return `Today the sky is cloudy`;
    } else if (main === "Rain") {
        return `Expect ${description} today, don't forget an umbrella!`;
    } else if (main === "Snow") {
        return `It's snowing: ${description}. Stay warm!`;
    } else if (main === "Thunderstorm") {
        return "Thunderstorms are expected today, stay safe indoors.";
    } else {
        return `The weather today is ${description} (${main}).`;
    }
}
