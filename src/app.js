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
///city options
function displayParis(event) {
  event.preventDefault();
  let apiKey = "2c4a14026882da503eb13e803b24b4dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Paris&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
let parisElement = document.querySelector("#paris");
parisElement.addEventListener("click", displayParis);
