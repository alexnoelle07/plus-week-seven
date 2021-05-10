//date and time

showDate();
function showDate() {

  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let months = [
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
  ];

  let month = months[now.getMonth()];

  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
  hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`;
  }

  let dayToday= document.querySelector("#today");
  dayToday.innerHTML = `${day} ${month} ${date} ${year}`;
  let timeNow = document.querySelector("#time");
  timeNow.innerHTML = `${hours}:${minutes}`;
}

// weather forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


//Forecast Celsius
function displayForecastCelsius(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2" id="column">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max" id="temperature-unit"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min" id="temperature-unit"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecastCelsius(coordinates) {
let apiKey = "cd0505d0c14f390be6a62ee650d13e27";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayForecastCelsius);
}



//buttons and search form

let form = document.querySelector("#citySubmit");
form.addEventListener("click", city);

function city(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city.value}`;
  searchCity(city.value);
}

function searchCity(city) {
  let apiKey = "cd0505d0c14f390be6a62ee650d13e27";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}


function showWeather(response) {
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#city").innerHTML = response.data.name;

  let weatherNow = document.querySelector("#temperature-unit");
  let temperature = Math.round(response.data.main.temp);
  weatherNow.innerHTML = `${temperature}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  
getForecastCelsius(response.data.coord);

  
}


// gps
function searchLocation(position) {
  let apiKey = "cd0505d0c14f390be6a62ee650d13e27";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", displayCurrentLocation);


/*weather conversion
function changeCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature-unit");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", changeCelsius);
celsiusTemp.addEventListener("click", displayForecastCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature-unit");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", changeFahrenheit);
*/

//weather conversion
function changeCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature-unit");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  let forecastMax = document.querySelectorAll(
    ".weather-forecast-temperature-max"
  );
  forecastMax.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML.replace("°", "");
    // convert to Celsius
    item.innerHTML = `${Math.round(((currentTemp - 32) * 5) / 9)}°`;
  });
  let forecastMin = document.querySelectorAll(
    ".weather-forecast-temperature-min"
  );
  forecastMin.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML.replace("°", "");
    // convert to Celsius
    item.innerHTML = `${Math.round(((currentTemp - 32) * 5) / 9)}°`;
  });
  // to avoid double conversion
  celsiusTemp.removeEventListener("click", changeCelsius);
  fahrenheitTemp.addEventListener("click", changeFahrenheit);
}
let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", changeCelsius);
function changeFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature-unit");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  let forecastMax = document.querySelectorAll(
    ".weather-forecast-temperature-max"
  );
  forecastMax.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML.replace("°", "");
    // convert to Fahrenheit
    item.innerHTML = `${Math.round((currentTemp * 9) / 5 + 32)}°`;
  });
  let forecastMin = document.querySelectorAll(
    ".weather-forecast-temperature-min"
  );
  forecastMin.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML.replace("°", "");
    // convert to Fahrenheit
    item.innerHTML = `${Math.round((currentTemp * 9) / 5 + 32)}°`;
  });
  // to avoid double conversion
  celsiusTemp.addEventListener("click", changeCelsius);
  fahrenheitTemp.removeEventListener("click", changeFahrenheit);
}
let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", changeFahrenheit);


searchCity("San Francisco");

