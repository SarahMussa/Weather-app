// Date
function formatDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[now.getDay()];
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
  let month = months[now.getMonth()];
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
  //CHANGES OF RAIN -------
}

// Forecast
function forecast(response) {
  console.log(response.data);
  document.querySelector(
    "#uv-index"
  ).innerHTML = `${response.data.daily[0].uvi} of 10`;
  document.querySelector(
    "#daily-icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png" alt="Temperature icon" id="daily-icon" />`;

  let forecast = document.querySelector("#forecast");
  let forecast1 = response.data.daily[1];
  let forecast2 = response.data.daily[2];
  let forecast3 = response.data.daily[3];
  let forecast4 = response.data.daily[4];
  let forecast5 = response.data.daily[5];
  let forecast6 = response.data.daily[6];
  let forecast7 = response.data.daily[7];
  forecast.innerHTML = `
  <div class="row">
  <div class="col-5">Saturday</div>
  <div class="col-4 ">
  <strong>
  ${Math.round(forecast1.temp.max)}°
  </strong> 
  / 
  ${Math.round(forecast1.temp.min)}°
  </div>
  <div class="col-3">
  <img src="http://openweathermap.org/img/wn/${
    forecast1.weather[0].icon
  }@2x.png" alt="Temperature icon" class="forecastIcons" />
  </div>
  </div>
  <div class="row">
  <div class="col-5">Saturday</div>
  <div class="col-4 temperature"><strong>${Math.round(
    forecast2.temp.max
  )}°</strong> / ${Math.round(forecast2.temp.min)}°</div>
  <div class="col-3">
  <img src="http://openweathermap.org/img/wn/${
    forecast2.weather[0].icon
  }@2x.png" alt="Temperature icon" class="forecastIcons" />
  </div>
  </div> 
  <div class="row">
  <div class="col-5">Saturday</div>
  <div class="col-4 temperature"><strong>${Math.round(
    forecast3.temp.max
  )}°</strong> / ${Math.round(forecast3.temp.min)}°</div>
  <div class="col-3">
  <img src="http://openweathermap.org/img/wn/${
    forecast3.weather[0].icon
  }@2x.png" alt="Temperature icon" class="forecastIcons" />
  </div>
  </div>   
  <div class="row">
    <div class="col-5">Saturday</div>
    <div class="col-4 temperature"><strong>${Math.round(
      forecast4.temp.max
    )}°</strong> / ${Math.round(forecast4.temp.min)}°</div>
    <div class="col-3">
      <img src="http://openweathermap.org/img/wn/${
        forecast4.weather[0].icon
      }@2x.png" alt="Temperature icon" class="forecastIcons" />
    </div>
  </div>
    <div class="row">
    <div class="col-5">Saturday</div>
    <div class="col-4 temperature"><strong>${Math.round(
      forecast5.temp.max
    )}°</strong> / ${Math.round(forecast5.temp.min)}°</div>
    <div class="col-3">
      <img src="http://openweathermap.org/img/wn/${
        forecast5.weather[0].icon
      }@2x.png" alt="Temperature icon" class="forecastIcons" />
    </div>
  </div>
    <div class="row">
    <div class="col-5">Saturday</div>
    <div class="col-4 temperature"><strong>${Math.round(
      forecast6.temp.max
    )}°</strong> / ${Math.round(forecast6.temp.min)}°</div>
    <div class="col-3">
      <img src="http://openweathermap.org/img/wn/${
        forecast6.weather[0].icon
      }@2x.png" alt="Temperature icon" class="forecastIcons" />
    </div>
  </div>
    <div class="row">
    <div class="col-5">Saturday</div>
    <div class="col-4 temperature"><strong>${Math.round(
      forecast7.temp.max
    )}°</strong> / ${Math.round(forecast7.temp.min)}°</div>
    <div class="col-3">
     <img src="http://openweathermap.org/img/wn/${
       forecast7.weather[0].icon
     }@2x.png" alt="Temperature icon" class="forecastIcons" />
    </div>
  </div>
  `;

  let hourForecast = document.querySelector("#hour-forecast");
  let forecastHour = response.data.daily[0];
  hourForecast.innerHTML = `<div class="col-3">
              <p>Morning</p>
              <p class="temperature">${Math.round(forecastHour.temp.morn)}°</p>
            </div>
            <div class="col-3">
              <p>Afternoon</p>
              <p class="temperature">${Math.round(forecastHour.temp.day)}°</p>
            </div>
            <div class="col-3">
              <p>Evening</p>
              <p class="temperature">${Math.round(forecastHour.temp.eve)}°</p>
            </div>
            <div class="col-3">
              <p>Night</p>
              <p class="temperature">${Math.round(forecastHour.temp.night)}°</p>
            </div>`;
}
//<img src="http://openweathermap.org/img/wn/$@2x.png" alt="Temperature icon" class="hourIcons" />

// Search city
function searchCity(city) {
  let apiKey = "5c090f8cdeae8b782090bca3c05b7983";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weather, forecast);
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

  let part = "daily";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecast);
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
  let temperatureUnit = document.querySelector("#temperature-unit");
  temperatureUnit.innerHTML = "º F";
  let temperatureF = Math.round((temperatureC * 9) / 5 + 32);
  temperatureC.innerHTML = `${temperatureF}`;

  let maxTemp = document.querySelector("#temperature-max-today");
  let maxTempC = weather(response.data.main.temp_max);
  maxTemp.innerHTML = Math.round((maxTempC * 9) / 5 + 32);
}
let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", convertToFahrenheit);

// Celsius
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureC = document.querySelector("#temperature-today");
  let temperatureUnit = document.querySelector("#temperature-unit");
  temperatureC.innerHTML = Math.round(temperatureC);
  temperatureUnit.innerHTML = "º C";

  let tempMax = document.querySelector("#temperature-max-today");
  tempMax.innerHTML = Math.round(tempMax);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

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
