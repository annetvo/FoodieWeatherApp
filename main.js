const api = {
    key: "753d6282f30b5fe21ffdde30e976f9de",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) { //enter key
    getResults(searchbox.value);
  }
}

function getResults (query) {
    fetch (`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weatherData) {
    const weatherCondition = weatherData.weather[0].main

    let city = document.querySelector('.location .city');
    city.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weatherData.main.temp)}<span>°f</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weatherCondition;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `Hi ${Math.round(weatherData.main.temp_min)}°f / Low ${Math.round(weatherData.main.temp_max)}°f`;

    switch (weatherCondition) {
        case "Rain":
            document.getElementById("boody").style.backgroundImage = "url('static/images/rainy.gif')";
            break;
        case "Clear":
            document.getElementById("boody").style.backgroundImage = "url('static/images/clear.gif')";
            break;
        case "Clouds":
            document.getElementById("boody").style.backgroundImage = "url('static/images/clouds.gif')";
            break;
        case "Thunderstorm":
            document.getElementById("boody").style.backgroundImage = "url('static/images/thunderstorm.gif')";
            break;
        case "Drizzle":
            document.getElementById("boody").style.backgroundImage = "url('static/images/drizzle.gif')";
            break;
        case "Snow":
            document.getElementById("boody").style.backgroundImage = "url('static/images/snow.gif')";
            break;
        case "Fog":
            document.getElementById("boody").style.backgroundImage = "url('static/images/fog.gif')";
            break;
        case "Mist":
            document.getElementById("boody").style.backgroundImage = "url('static/images/mist.gif')";
            break;
        default:
            document.getElementById("boody").style.backgroundImage = "url('static/images/bg.gif')";
            break;
      }
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;

}
