const searchButton = document.querySelector(".btn");
const inputCity = document.querySelector("#inputCity");
const cityNameDate = document.querySelector("h4");
const currentWeatherCard = document.querySelector("#currentWeather .card-body");
const fiveDayForecast = document.querySelector("#fiveDayForecast");

searchButton.addEventListener("click", () => {
    fetchWeatherData(inputCity.value);
});

function fetchWeatherData(city) {
    const apiKey = "6cfcd046bcdbf5f166a9d037293881fc";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => console.error("Error fetching weather data: ", error));
}

function displayWeatherData(data) {
    cityNameDate.textContent = `${data.city.name} and ${dayjs().format("MM/DD/YYYY")}`;

    const currentWeatherData = data.list[0];
    currentWeatherCard.querySelector(".temp").textContent = `Temp: ${currentWeatherData.main.temp} °C`;
    currentWeatherCard.querySelector(".wind").textContent = `Wind: ${currentWeatherData.wind.speed} m/s`;
    currentWeatherCard.querySelector(".humidity").textContent = `Humidity: ${currentWeatherData.main.humidity}%`;

    for (let i = 0; i < 5; i++) {
        const forecastData = data.list[(i + 1) * 8];
        const card = document.createElement("div");
        card.classList.add("col");

        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Date: ${dayjs(forecastData.dt_txt).format("MM/DD/YYYY")}</h5>
                    <p class="temp">Temp: ${forecastData.main.temp} °C</p>
                    <p class="wind">Wind: ${forecastData.wind.speed} m/s</p>
                    <p class="humidity">Humidity: ${forecastData.main.humidity}%</p>
                </div>
            </div>
        `;

        fiveDayForecast.appendChild(card);
    }
}
