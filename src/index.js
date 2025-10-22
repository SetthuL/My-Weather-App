function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  let timeElement = document.querySelector("#current-time");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");

  let temperature = response.data.main.temp;
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let speed = response.data.wind.speed;
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


  cityElement.innerHTML = city;
  timeElement.innerHTML = formatDate(new Date());
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  speedElement.innerHTML = `${speed} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${iconUrl}" class="weather-icon"/>`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "489a3bb050f56c279586eaa0b982d18e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);

  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");

function displayForecast(response) {
  let forecastContainer = document.querySelector("#forecast");
  forecastContainer.innerHTML = "";

  let forecastList = response.data.list;

  let dailyForecasts = forecastList.filter((forecast, index) => index % 8 === 0).slice(0, 6);
  
  dailyForecasts.forEach(dayForecast => {
    let date = new Date(dayForecast.dt * 1000);
    let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
    let temp = Math.round(dayForecast.main.temp);
    let icon = dayForecast.weather[0].icon;
    let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    forecastContainer.innerHTML += `
      <div class="forecast-day">
        <div>${dayName}</div>
        <img src="${iconUrl}" alt="${dayForecast.weather[0].description}" />

        <div>${temp}°C</div>
      </div>
    `;
  });
}