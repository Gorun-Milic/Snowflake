import { elements } from "./base";

const renderDay = (day, index) => {
    const markup = `
        <div class="day" data-number="${index}">
            <div class="day-img">
                <img class="weather-icon" src="http://openweathermap.org/img/wn/${day.weather.icon}@2x.png" alt="" width="60px">
            </div>
            <div class="day-name">${day.weekday.slice(0, 3).toUpperCase()}</div>
            <div class="day-temperature">
                ${day.weather.temperature}&degC
            </div>
        </div>
    `;

    elements.sideBar.insertAdjacentHTML('beforeend', markup);
}

export const renderDays = days => {
    let index = 0;
    days.forEach(renderDay, index);
}

export function clearSideBar() {
    elements.sideBar.innerHTML = '';
}
