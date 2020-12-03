// Date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[date.getDay()];
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
    "December",
  ];
  let month = months[date.getMonth()];
  let day = now.getDate();
  return `${weekDay}, ${month} ${day}`;
}
let todayDate = document.querySelector("#current-date");
let now = new Date();
todayDate.innerHTML = formatDate(now);

// Hour
let hourFormat = "24h";
function hour(date) {
  if (hourFormat === "24h") {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (hour < 10) {
      hour = `0${hour}`;
    }

    return `${hour}:${minutes}h`;
  } else {
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
}
let currentHour = document.querySelector("#current-hour");
currentHour.innerHTML = hour(now);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${hour}:${minutes} h`;
}

// Conditions
function weather(response) {
  console.log(response.data);
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temperature-today").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temperature-max-today").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temperature-min-today").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon-now")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#sunrise").innerHTML = formatHours(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatHours(
    response.data.sys.sunset * 1000
  );

  // Request forecast
  let apiKey = "5c090f8cdeae8b782090bca3c05b7983";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecast);
}

// Forecast and conditions
function forecast(response) {
  console.log(response.data);
  document.querySelector("#uv-index").innerHTML = `${Math.round(
    response.data.daily[0].uvi
  )} of 10`;
  document.querySelector(
    "#daily-icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png" alt="Temperature icon" id="daily-icon" />`;

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let forecastElement = document.querySelector("#forecast");
  // clear the forecast
  forecastElement.innerHTML = "";

  // use for to make it clear
  for (let index = 1; index < 8; index++) {
    let forecast = response.data.daily[index];
    let day = new Date(forecast.dt * 1000);
    forecastElement.innerHTML += `
    <div class="row">
      <div class="col-12 col-md-5">${weekDays[day.getDay()]}</div>
      <div class="col-12 col-md-4">
        <strong>
          <span class="forecast-max">${Math.round(forecast.temp.max)}</span>°
        </strong> 
        / 
        <span class="forecast-min">${Math.round(forecast.temp.min)}</span>°
      </div>
      <div class="col-12 col-md-3">
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" alt="Temperature icon" class="forecastIcons" />
      </div>
    </div>
    `;
  }

  let hourForecast = document.querySelector("#hour-forecast");
  let forecastHour = response.data.daily[0];
  hourForecast.innerHTML = `<div class="col-6 col-md-3">
              <p>Morning</p>
              <p class="temperature"><span id="morning-temp">${Math.round(
                forecastHour.temp.morn
              )}</span>°</p>
            </div>
            <div class="col-6 col-md-3">
              <p>Afternoon</p>
              <p class="temperature"><span id="afternoon-temp">${Math.round(
                forecastHour.temp.day
              )}</span>°</p>
            </div>
            <div class="col-6 col-md-3">
              <p>Evening</p>
              <p class="temperature"><span id="evening-temp">${Math.round(
                forecastHour.temp.eve
              )}</span>°</p>
            </div>
            <div class="col-6 col-md-3">
              <p>Night</p>
              <p class="temperature"><span id="night-temp">${Math.round(
                forecastHour.temp.night
              )}</span>°</p>
            </div>`;
}

// Search city
function searchCity(city) {
  let apiKey = "5c090f8cdeae8b782090bca3c05b7983";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weather);
}

// Search city - Submit
function submitSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let city = document.querySelector("#searched-city");
  city.innerHTML = `${cityInput.value}`;

  searchCity(cityInput.value);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", submitSearch);

// Search Location
function searchLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "5c090f8cdeae8b782090bca3c05b7983";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weather);
}

// Current Location
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", currentLocation);

// Fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureC = document.querySelector("#temperature-today");
  let temperatureF = Math.round((temperatureC.innerHTML * 9) / 5 + 32);
  temperatureC.innerHTML = `${temperatureF}`;

  let temperatureUnit = document.querySelector("#temperature-unit");
  temperatureUnit.innerHTML = "º F";

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round((feelsLike.innerHTML * 9) / 5 + 32);

  let tempMax = document.querySelector("#temperature-max-today");
  tempMax.innerHTML = Math.round((tempMax.innerHTML * 9) / 5 + 32);

  let tempMin = document.querySelector("#temperature-min-today");
  tempMin.innerHTML = Math.round((tempMin.innerHTML * 9) / 5 + 32);

  let temperatureUnitToday = document.querySelector("#temperature-unit-today");
  temperatureUnitToday.innerHTML = "F";

  let morningTemp = document.querySelector("#morning-temp");
  morningTemp.innerHTML = Math.round((morningTemp.innerHTML * 9) / 5 + 32);

  let afternoonTemp = document.querySelector("#afternoon-temp");
  afternoonTemp.innerHTML = Math.round((afternoonTemp.innerHTML * 9) / 5 + 32);

  let eveningTemp = document.querySelector("#evening-temp");
  eveningTemp.innerHTML = Math.round((eveningTemp.innerHTML * 9) / 5 + 32);

  let nightTemp = document.querySelector("#night-temp");
  nightTemp.innerHTML = Math.round((nightTemp.innerHTML * 9) / 5 + 32);

  let forecastMax = document.querySelectorAll(".forecast-max");
  forecastMax.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    // convert to Fahrenheit
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });

  let forecastMin = document.querySelectorAll(".forecast-min");
  forecastMin.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    // convert to Fahrenheit
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });

  // disable event to avoid multiple conversion
  celsiusLink.addEventListener("click", convertToCelsius);
  fahrenheitButton.removeEventListener("click", convertToFahrenheit);
}
let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", convertToFahrenheit);

// Celsius
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureC = document.querySelector("#temperature-today");
  temperatureC.innerHTML = Math.round(((temperatureC.innerHTML - 32) * 5) / 9);

  let temperatureUnit = document.querySelector("#temperature-unit");
  temperatureUnit.innerHTML = "º C";

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(((feelsLike.innerHTML - 32) * 5) / 9);

  let tempMax = document.querySelector("#temperature-max-today");
  tempMax.innerHTML = Math.round(((tempMax.innerHTML - 32) * 5) / 9);

  let tempMin = document.querySelector("#temperature-min-today");
  tempMin.innerHTML = Math.round(((tempMin.innerHTML - 32) * 5) / 9);

  let temperatureUnitToday = document.querySelector("#temperature-unit-today");
  temperatureUnitToday.innerHTML = "C";

  let morningTemp = document.querySelector("#morning-temp");
  morningTemp.innerHTML = Math.round(((morningTemp.innerHTML - 32) * 5) / 9);

  let afternoonTemp = document.querySelector("#afternoon-temp");
  afternoonTemp.innerHTML = Math.round(
    ((afternoonTemp.innerHTML - 32) * 5) / 9
  );

  let eveningTemp = document.querySelector("#evening-temp");
  eveningTemp.innerHTML = Math.round(((eveningTemp.innerHTML - 32) * 5) / 9);

  let nightTemp = document.querySelector("#night-temp");
  nightTemp.innerHTML = Math.round(((nightTemp.innerHTML - 32) * 5) / 9);

  let forecastMax = document.querySelectorAll(".forecast-max");
  forecastMax.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;

    // convert to Fahrenheit
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });

  let forecastMin = document.querySelectorAll(".forecast-min");
  forecastMin.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    // convert to Fahrenheit
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });

  // disable event to avoid multiple conversion
  celsiusLink.removeEventListener("click", convertToCelsius);
  fahrenheitButton.addEventListener("click", convertToFahrenheit);
}
let celsiusLink = document.querySelector("#celsius-link");

// AmPm
function convertAmPm(event) {
  event.preventDefault();
  let hourAmPm = document.querySelector("#current-hour");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");

  if (hourFormat === "24h") {
    AmPm.innerHTML = "h";
    hourFormat = "12h";
    hourAmPm.innerHTML = hour(now);
    sunrise.innerHTML = hour(now);
    sunset.innerHTML = hour(now);
  } else {
    AmPm.innerHTML = "Am/Pm";
    hourFormat = "24h";
    hourAmPm.innerHTML = hour(now);
    sunrise.innerHTML = hour(now);
    sunset.innerHTML = hour(now);
  }
}
let AmPm = document.querySelector("#ampm");
AmPm.addEventListener("click", convertAmPm);

// Load city on load
searchCity("Paris");
