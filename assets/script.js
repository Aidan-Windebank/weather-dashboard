// main API stuff
var weatherApiMain = 'https://api.openweathermap.org';
var ApiKey = '8bd058af9003ff266c0c4da0bf17566d';

// global variables
const buttonClick = $('#search-button');
const cityInput = $('#city-input');


// fucntion to get gps cooridinates from city seach

buttonClick.click(function (event) {
    event.preventDefault();
    const search = cityInput.val();
    console.log(search);
    gpsCoords(search);
});

function gpsCoords(search) {
    var apiUrl = `${weatherApiMain}/geo/1.0/direct?q=${search}&limit=5&appid=${ApiKey}`;
  
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })
  }



    























