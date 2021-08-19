let apiKey = "2c4a14026882da503eb13e803b24b4dd";
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hours}:${minute}`;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector(".temperature");
  let location = response.data.name;
  let currentLocation = document.querySelector(".city");
  let currentEmojiElement = document.querySelector("#currentEmoji");
  let dateElement = document.querySelector(".date");

  celsiusTemperature = Math.round(response.data.main.temp);

  currentTemperature.innerHTML = `${temperature}`;
  currentLocation.innerHTML = `${location}`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  currentEmojiElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentEmojiElement.setAttribute(
    "alt",
    `${response.data.weather[0].description}`
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col">
      <span class="time">${formatHours(forecast.dt * 1000)}</span>
          <img
            src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png"
              alt=""
          />
          <div class="weather-forecast-temperature">
            <strong>${Math.round(forecast.main.temp_max)}°</strong>
               ${Math.round(forecast.main.temp_min)}°
          </div>
    </div>`;
  }
}
function search(city) {
  let apiKey = "2c4a14026882da503eb13e803b24b4dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#search-location-input").value;
  search(city);
}
let searchForm = document.querySelector("#search-location");
searchForm.addEventListener("submit", searchLocation);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2c4a14026882da503eb13e803b24b4dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = celsiusTemperature;
  celsiusLinkElement.classList.add("active");
  fahrenheitLinkElement.classList.remove("active");
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLinkElement.classList.remove("active");
  fahrenheitLinkElement.classList.add("active");
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayParis(event) {
  event.preventDefault();
  let apiKey = "2c4a14026882da503eb13e803b24b4dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Paris&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayNewyork(event) {
  event.preventDefault();
  let apiKey = "2c4a14026882da503eb13e803b24b4dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${5128581}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${5128581}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayMilano(event) {
  event.preventDefault();
  let apiKey = "2c4a14026882da503eb13e803b24b4dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Milan&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Milan&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displaySeoul(event) {
  event.preventDefault();
  let apiKey = "2c4a14026882da503eb13e803b24b4dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTokyo(event) {
  event.preventDefault();
  let apiKey = "2c4a14026882da503eb13e803b24b4dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Tokyo&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
let parisElement = document.querySelector("#paris");
parisElement.addEventListener("click", displayParis);
let newyorkElement = document.querySelector("#newyork");
newyorkElement.addEventListener("click", displayNewyork);

let milanElement = document.querySelector("#milano");
milanElement.addEventListener("click", displayMilano);

let seoulElement = document.querySelector("#seoul");
seoulElement.addEventListener("click", displaySeoul);

let tokyoElement = document.querySelector("#tokyo");
tokyoElement.addEventListener("click", displayTokyo);
let toCurrentLocation = document.querySelector("#currentLocationButton");
toCurrentLocation.addEventListener("click", getCurrentPosition);

let celsiusLinkElement = document.querySelector("#celsiusLink");
celsiusLinkElement.addEventListener("click", displayCelciusTemperature);

let fahrenheitLinkElement = document.querySelector("#fahrenheitLink");
fahrenheitLinkElement.addEventListener("click", displayFahrenheitTemperature);

let celsiusTemperature = null;

search("London");
