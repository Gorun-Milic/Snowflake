import City from "./model/City";
import Day from "./model/Day";
import SearchRequest from "./model/SearchRequest";
import SearchResponse from "./model/SearchResponse";
import Weather from "./model/Weather";
import * as dates from "./services/dates"
import { elements } from "./view/base";
import {renderContent, clearContent} from "./view/contentView";
import {renderDays, clearSideBar} from "./view/sideBarView";
import {getInput, clearInput, loadSpinner} from "./view/headerView";

let searchRequest = new SearchRequest();
let searchResponse = new SearchResponse();
let chosenDay = new Day();
let selectedDay;

main();

async function main() {

    loadSpinner();
    await init();

    clearContent();
    renderContent(chosenDay);
    renderAllDays();

}

async function init() {
    var currentLocation = new Promise((resolve, reject) => {
        searchRequest.getCurrentLocation(resolve, reject);
    });

    const coordinates = await currentLocation;
    const weatherData = await searchRequest.getWeatherData(coordinates.lat, coordinates.lon);
    const nearestCity = await searchRequest.getNearestCity(coordinates.lat, coordinates.lon);

    extractCurrentDay(weatherData, nearestCity, coordinates);
    
}

function extractCurrentDay(weatherData, cityName, coordinates) {
    clearData();
    const weekday = dates.currentDay(dates.currentDate());
    const date = dates.formatDate(dates.currentDate());
    let city = new City(cityName, coordinates.lat, coordinates.lon);
    let weather = new Weather(Math.round(weatherData.current.temp), weatherData.current.weather[0].description, Math.round(weatherData.current.humidity), Math.round(weatherData.current.wind_speed), weatherData.current.weather[0].icon);
    let day = new Day(weekday, date, city, weather);

    searchResponse.days.push(day);
    chosenDay = day;
    extractArray(weatherData.daily, city);
}

function extractArray(days, city) {
    let i = 1;
    days.slice(0, 6).forEach(day=>{
        let newDay = new Day();
        let weather = new Weather();

        weather.humidity = Math.round(day.humidity);
        weather.windSpeed = Math.round(day.wind_speed);
        weather.temperature = Math.round(day.temp.day);
        weather.description = day.weather[0].description;
        weather.icon = day.weather[0].icon;

        newDay.city = city;
        newDay.weekday = dates.currentDay(dates.daysAfterToday(i));
        newDay.date = dates.formatDate(dates.daysAfterToday(i));
        newDay.weather = weather;

        searchResponse.days.push(newDay);
        i++;
    });

}

const clearData = () => {
    searchResponse.days = [];
}

elements.searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    clearContent();
    loadSpinner();
    let seachedCity = getInput();
    let data = await searchRequest.getCordinates(seachedCity);
    if (data.length===0) {
        alert("City does not exists. Try typing another place.");
        clearContent();
        renderContent(chosenDay);
    }else {
        let {lat, lon} = data[0];
        let coordinates = {
            "lat": lat,
            "lon": lon
        }

        const weatherData = await searchRequest.getWeatherData(lat, lon);
        let nearestCity = await searchRequest.getNearestCity(lat, lon);

        if (nearestCity.includes('Municipality')) {
            nearestCity = seachedCity;
        }

        extractCurrentDay(weatherData, nearestCity, coordinates);

        clearContent();
        renderContent(chosenDay);
        renderAllDays();
        clearInput();
    }
});

elements.sideBar.addEventListener("click", (e)=>{
    selectedDay.classList.remove("curr-day");
    const day = e.target.closest('.day');
    if (day) {
        const number = (parseInt(day.getAttribute('data-number')));
        chosenDay = searchResponse.days[number];
        clearContent();
        day.className = 'day curr-day';
        selectedDay = day;
        renderContent(chosenDay);
    }
});

function renderAllDays() {
    clearSideBar();
    renderDays(searchResponse.days);
    selectedDay = document.querySelector('[data-number="0"]');
    selectedDay.className = 'day curr-day';
}
