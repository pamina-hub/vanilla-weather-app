let apiKey = "2c4a14026882da503eb13e803b24b4dd";
///current search
function showWeather(response) {
  let updateCity = document.querySelector("#current-city");
  let temperature = Math.round(response.data.main.temp);
  let updateTemp = document.querySelector(".temperature");
  updateCity.innerHTML = `${response.data.name}`;
  updateTemp.innerHTML = `${temperature}`;
}
function retrievePosition(position) {
  let apiKey = "2c4a14026882da503eb13e803b24b4dd";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);
let currentButton = document.querySelector("#currentLocationButton");
currentButton.addEventListener("click", retrievePosition);
///city search
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-location-input");
  let h5 = document.querySelector("#current-city");
  let units = "metric";
  let apiKey = "2c4a14026882da503eb13e803b24b4dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  if (cityInput.value) {
    h5.innerHTML = `${cityInput.value}`;
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let newTemp = document.querySelector(".temperature");
  newTemp.innerHTML = `${temperature}`;
}
let form = document.querySelector("#searchButton");
form.addEventListener("click", search);
