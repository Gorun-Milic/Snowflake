export default class SearchRequest {

    API_KEY = 'secret key';

    constructor() {
    }

    //vraca prognozu na osnovu lat i lon async drugi nacin
    async getWeatherData(lat, lon) {
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
            },
            (error)=>{
                alert("Enable location or type a city name!");
            }
        );
    }

    //vraca kordinate na osnovu naziva grada
    async getCordinates(city) {
        const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=${this.API_KEY}`);
        const res = await result.json();
        return res;
    };

    //vraca naziv grada na osnovu lat i lon
    async getNearestCity(lat, lon) {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${1}&appid=${this.API_KEY}`);
        const city = await response.json();
        return city[0].name;
    }

}
