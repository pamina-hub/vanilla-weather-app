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
  let apiKey = "d20ee31d1c5fc8d0a74be4a2ab93bf1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  let apiKey = "d20ee31d1c5fc8d0a74be4a2ab93bf1f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
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
