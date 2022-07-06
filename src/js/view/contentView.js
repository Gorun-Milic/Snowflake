import { elements } from "./base";

export function renderContent(currentDay) {
    const markup = `
            <div class="city">
                <div class="city-name">${currentDay.city.name}</div>
            </div>
            <div class="date">
                ${currentDay.date}
            </div>
            <div class="weather-img">
                <img src="http://openweathermap.org/img/wn/${currentDay.weather.icon}@2x.png" alt="">
            </div>
            <div class="weather-description">
                ${currentDay.weather.description}
            </div>
            <div class="temperature">
                ${currentDay.weather.temperature}&degC
            </div>
            <div class="weather-info">
                <div class="humidity">Humidity: ${currentDay.weather.humidity}%</div>
                <div class="wind">Wind: ${currentDay.weather.windSpeed} m/s</div>
            </div>
    `;
    elements.content.insertAdjacentHTML('afterbegin', markup);

}

export function clearContent() {
    elements.content.innerHTML = '';
}
