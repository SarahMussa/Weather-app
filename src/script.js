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

// Conditions
function weather(response) {
  console.log(response.data);

  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#temperature-today").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temperature-max-today").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temperature-min-today").innerHTML = Math.round(
    response.data.main.temp_min
  );
  //FEELS LIKE -----
  //document.querySelector("#temperature-feelslike").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  // SUNRISE -----
  //document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  // SUNSET ------
  //document.querySelector("#sunset").innerHTML = response.data.sys.sunset;
  //CHANGES OF RAIN -------
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

let temperature = 19;
// Fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureC = document.querySelector("#temperature-today");
  let temperatureUnit = document.querySelector("#temperature-unit");
  let temperatureF = Math.round((temperature * 9) / 5 + 32);
  temperatureC.innerHTML = `${temperatureF}`;
  temperatureUnit.innerHTML = "º F";
}
let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", convertToFahrenheit);

// Celsius
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureC = document.querySelector("#temperature-today");
  let temperatureUnit = document.querySelector("#temperature-unit");
  temperatureC.innerHTML = `${temperature}`;
  temperatureUnit.innerHTML = "º C";
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// AmPm
function convertAmPm(event) {
  event.preventDefault();
  let hourAmPm = document.querySelector("#current-hour");

  if (hourFormat === "24h") {
    AmPm.innerHTML = "h";
    hourFormat = "12h";
    hourAmPm.innerHTML = hour(now);
  } else {
    AmPm.innerHTML = "Am/Pm";
    hourFormat = "24h";
    hourAmPm.innerHTML = hour(now);
  }
}
let AmPm = document.querySelector("#ampm");
AmPm.addEventListener("click", convertAmPm);
