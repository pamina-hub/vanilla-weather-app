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
