import axios from 'axios';

export default class SearchRequest {

    API_KEY = '8217b56d767b6ba420281b7b6db7cfc0';

    constructor() {
    }

    //vraca prognozu na osnovu lat i lon async drugi nacin
    async getWeatherData(lat, lon) {
        let api = '8217b56d767b6ba420281b7b6db7cfc0';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${this.API_KEY}`);
        const weather = await response.json();
        return weather;
    }

    //vraca lokaciju na kojoj se nalazimo
    async getCurrentLocation(resolve, reject) {
        navigator.geolocation.getCurrentPosition(
            (success) => {
                let latitude = success.coords.latitude;
                let longitude = success.coords.longitude;
                let response = {
                    "lat": latitude,
                    "lon": longitude
                }
                resolve(response);
            }
        );
    }

    //vraca kordinate na osnovu naziva grada
    async getCordinates(city) {
        const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=${this.API_KEY}`);
        const data = await result.json();
        return data;
    };

    //vraca naziv grada na osnovu lat i lon
    async getNearestCity(lat, lon) {
        let api = '8217b56d767b6ba420281b7b6db7cfc0';
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${1}&appid=${this.API_KEY}`);
        const city = await response.json();
        return city[0].name;
    }

}