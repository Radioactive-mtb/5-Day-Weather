var key = "467de7ad3a55a3c9940ee7f2f771114a";
var queryURL =
  "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
var geoCode =
  "https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";
var search = document.getElementById("user-input");
var searchButton = document.getElementById("search");
var cityEl = document.getElementById("current-city");
searchButton.addEventListener("click", start);

var newBtn = $("<button>");

function start(event) {
  event.preventDefault();
  var geoCode =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    search.value +
    "&limit=1&appid=" +
    key +
    "";

  fetch(geoCode)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var lat = data[0].lat;
      var lon = data[0].lon;
      var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;

      fetch(queryURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          cityEl.textContent = data.city.name;
          for (var i = 0; i < 6; i++) {
            document.getElementById("temp-" + i + "").textContent =
              "temp: " + Number(data.list[i].main.temp).toFixed(0) + "°";
          }

          for (var i = 0; i < 6; i++) {
            document.getElementById("wind-" + i + "").textContent =
              "wind: " + Number(data.list[i].wind.speed).toFixed(0) + "mph";
          }

          for (var i = 0; i < 6; i++) {
            document.getElementById("humidity-" + i + "").textContent =
              "Humidity: " +
              Number(data.list[i].main.humidity).toFixed(0) +
              "%";
          }
          for (var i = 0; i < 6; i++) {
            document.getElementById("icon-" + i + "").src =
              "https://openweathermap.org/img/wn/" +
              data.list[i].weather[0].icon +
              ".png";
          }
        });
    });
}
// pulling the date for the results
var weekday = [
  moment().format("dddd"),
  moment().add(1, "d").format("dddd"),
  moment().add(2, "d").format("dddd"),
  moment().add(3, "d").format("dddd"),
  moment().add(4, "d").format("dddd"),
  moment().add(5, "d").format("dddd"),
  moment().add(6, "d").format("dddd"),
];

//sets the text to proper day
for (let i = 0; i < 6; i++) {
  document.getElementById("date-" + i + "").textContent = weekday[i];
}
