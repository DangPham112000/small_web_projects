const APIKEY = '3265874a2c77ae4a04bb96236a642d2f';

const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`;

const mainEl = document.getElementById('main');
const searchEl = document.getElementById('search');
const formEl = document.getElementById('form');

async function getWeatherByLocation(location) {
    const resp = await fetch(url(location), {origin: 'cors'});
    const respData = await resp.json();

    console.log(respData);

    addWeatherToMain(respData);
}

function addWeatherToMain(weather) {
    if (weather.cod === '404') {
        alert(weather.message);
        return;
    }
    const weatherEl = document.createElement('div');

    weatherEl.classList.add('weather');

    weatherEl.innerHTML = `
        <div class="weather-header">
            <h1 class="city">${weather.name}</h1>
            <div class="wind">
                <p>WIND</p>
                ${weather.wind.speed * 3.6}km/h
                ${weather.wind.deg}°
            </div>
        </div>
        <div class="weather-body">
            <div class="icon-group">
                <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"/>
                <p>${weather.weather[0].main}</p>
            </div>
            <h2 class="temp">${KtoC(weather.main.temp)}°</h2>
        </div>
    `;
    // another icon style
    // <img src="https://openweathermap.org/img/w/${weather.weather[0].icon}.png"/>


    mainEl.innerHTML = '';
    
    mainEl.appendChild(weatherEl);
}


function KtoC(K) {
    return Math.round(K - 272.15);
}

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchEl.value;
    getWeatherByLocation(location);
    searchEl.value = '';
});

getWeatherByLocation('ho chi minh');