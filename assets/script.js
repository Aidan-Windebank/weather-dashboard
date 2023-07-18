// main API stuff
var weatherApiMain = 'https://api.openweathermap.org';
var apiKey = '8bd058af9003ff266c0c4da0bf17566d';

// global variables
const buttonClick = $('#search-button');
const cityInput = $('#city-input');
var searchHistory = $('#history');

// button event listener on main search input
buttonClick.click(function (event) {
    event.preventDefault();
    const search = cityInput.val();

    //checking local storage for any cities in local storage
    var citiesList = JSON.parse(localStorage.getItem("cities")) || [];
    citiesList.push(search);
    localStorage.setItem("cities", JSON.stringify(citiesList));

    cityHistory()

    gpsCoords(search);
});

// function to grab cities out of local storage and make buttons
function cityHistory() {
    searchHistory.empty();
    var citiesList = JSON.parse(localStorage.getItem("cities")) || [];
    for (let i = 0; i < citiesList.length; i++) {
        const lastCity = citiesList[i];
        buttonHTML = $(`<button onclick="gpsCoords('${lastCity}')">${lastCity}</button>`)
        searchHistory.append(buttonHTML);
    }
}




// fucntion to get gps cooridinates from city seach
function gpsCoords(search) {
    var gpsUrl = `${weatherApiMain}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;

    fetch(gpsUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getForecast(data[0]);
        })
}

// function to take gps cooridnates and display weather forecast
function getForecast(location) {
    var { lat } = location;
    var { lon } = location;

    var forecastUrl = `${weatherApiMain}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // function from instructor to help parse data into five day forecast values
            const fiveDay = [];
            for (let i = 0; i < 40; i = i + 8) {
                fiveDay.push(data.list[i]);
            }
            todaysForecast(fiveDay);

            // function to get todays forecast out of 5 day forecast and display in container to the right
            function todaysForecast(fiveDay) {
                var date = dayjs(fiveDay[0].dt_txt).format('MMMM D, YYYY');
                var city = location.name;
                var temp = fiveDay[0].main.temp;
                var wind = fiveDay[0].wind.speed;
                var humidity = fiveDay[0].main.humidity;
                var iconUrl = `https://openweathermap.org/img/w/${fiveDay[0].weather[0].icon}.png`;

                var dailyForecast = $('#daily-forecast');
                var cityLine = $('<h2>');
                var dateLine = $('<h3>');
                var tempLine = $('<p>');
                var windLine = $('<p>');
                var humidityLine = $('<p>');
                var iconLine = $('<img>');

                dailyForecast.empty();
                dailyForecast.append(cityLine, dateLine, iconLine, tempLine, windLine, humidityLine);

                cityLine.text(city);
                dateLine.text(date);
                iconLine.attr('src', iconUrl);
                tempLine.text(`Temp: ${temp} °F`);
                windLine.text(`Wind: ${wind} MPH`);
                humidityLine.text(`Humidity: ${humidity} %`);

                fiveDayForecast(fiveDay);
            }

            // utilized same function for daily but in for loop for each day to populate cards for 5 day forecast
            function fiveDayForecast(fiveDay) {
                var fiveDayContainer = $('#five-day-forecast');
                fiveDayContainer.empty();

                for (var i = 0; i < 5; i++) {
                    var date = dayjs(fiveDay[i].dt_txt).format('MMMM D, YYYY');
                    var temp = fiveDay[i].main.temp;
                    var wind = fiveDay[i].wind.speed;
                    var humidity = fiveDay[i].main.humidity;
                    var iconUrl = `https://openweathermap.org/img/w/${fiveDay[i].weather[0].icon}.png`;

                    var fiveDayContainer = $('#five-day-forecast');
                    var container = $('<div>');
                    var card = $('<div>');
                    var dailyForecast = $('<div>');
                    var dateLine = $('<h5>');
                    var tempLine = $('<p>');
                    var windLine = $('<p>');
                    var humidityLine = $('<p>');
                    var iconLine = $('<img>');

                    fiveDayContainer.append(container);
                    container.append(card);
                    card.append(dailyForecast);
                    dailyForecast.append(dateLine, iconLine, tempLine, windLine, humidityLine);

                    container.attr('class', 'col-md');
                    card.attr('class', 'card bg-info h-100 text-black p-2 text-center');

                    dateLine.text(date);
                    iconLine.attr('src', iconUrl);
                    tempLine.text(`Temp: ${temp} °F`);
                    windLine.text(`Wind: ${wind} MPH`);
                    humidityLine.text(`Humidity: ${humidity} %`);
                }
            }
        })
}

cityHistory()








