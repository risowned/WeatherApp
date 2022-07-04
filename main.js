//Using city name as input
const cityNameKey = "myCity";
document
  .getElementById("inputButtonId")
  .addEventListener("click", function (event) {
    (async function () {
      const weatherData = await fetch(
        apiUrlCreater("q=" + document.getElementById("cityNameInputId").value)
      );
      // to save the data in localstorage
      localStorage.setItem(
        cityNameKey,
        document.getElementById("cityNameInputId").value
      );
      const weatherInfo = await weatherData.json();
      allWeatherData(weatherInfo);
    })();
  });
//Using user's current latitude and longitude
document
  .getElementById("logLocationButtonId")
  .addEventListener("click", logLocationFunction);
function logLocationFunction() {
  navigator.geolocation.getCurrentPosition((success) =>
    (async function () {
      const weatherData = await fetch(
        apiUrlCreater(
          "lat=" + success.coords.latitude + "&lon=" + success.coords.longitude
        )
      );
      const weatherInfo = await weatherData.json();
      // to save the data in localstorage
      localStorage.setItem(cityNameKey, weatherInfo.name);
      allWeatherData(weatherInfo);
    })()
  );
}
// Function to get sunrise and sunset time in hh:mm format.
function timestampToTime(x) {
  var date = new Date(x * 1000);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var formatTime = hours + ":" + minutes.toString().padStart(2, "0");
  return formatTime;
}
// Fuction to get weather information.
function allWeatherData(weatherParameter) {
  //To get city name
  document.getElementById("theChosenCity").innerHTML = weatherParameter.name;
  //to get the temperature
  document.getElementById("temperature").innerHTML =
    (weatherParameter.main.temp - 273.15).toFixed(2) + " ℃";
  //to get the weather icon
  const weatherIcon =
    "https://openweathermap.org/img/w/" +
    weatherParameter.weather[0].icon +
    ".png";
  document.getElementById("iconForWeatherType").innerHTML =
    '<img src = "' + weatherIcon + ' ">';
  //to get wind speed
  const windSpeedMPH = (weatherParameter.wind.speed * 2.23694).toFixed(2);
  document.getElementById("windSpeed").innerHTML =
    "Wind speed: " + windSpeedMPH + " ml/h";
  //to get cloud parcentage
  const cloudParcentage = weatherParameter.clouds.all;
  document.getElementById("howCloudyItIs").innerHTML =
    "Cloudy: " + cloudParcentage + "%";
  //to get sunrise time
  document.getElementById("sunriseTime").innerHTML =
    "Sunrise: " + timestampToTime(weatherParameter.sys.sunrise);
  // to get sunset time
  document.getElementById("sunsetTime").innerHTML =
    "Sunset: " + timestampToTime(weatherParameter.sys.sunset);
  //to get the background image
  document.getElementById("container").style.backgroundImage =
    "url('https://i.pinimg.com/originals/9e/0f/fd/9e0ffd65930d4bb80764d56b42f5b8a0.jpg')";

  (error) => console.log(error);
}

window.addEventListener("load", (event) => {
  const city = localStorage.getItem(cityNameKey);
  if (city !== "") {
    //console.log("City name" + city);
    (async function () {
      const weatherData = await fetch(apiUrlCreater("q=" + city));
      const weatherInfo = await weatherData.json();
      allWeatherData(weatherInfo);
    })();
  }
});

function apiUrlCreater(queryString) {
  return (
    "https://api.openweathermap.org/data/2.5/weather?" +
    queryString +
    "&appid=a9a4924b301fedae29f7f402ae447166"
  );
}
