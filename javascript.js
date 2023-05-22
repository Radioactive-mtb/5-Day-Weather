var key = "467de7ad3a55a3c9940ee7f2f771114a";

var search = document.getElementById("user-input");
var searchButton = document.getElementById("search");
var newCity = document.getElementById("current-city");
var cityBtn = document.getElementById("selectable");
var searchHistory = [];
var city;

load();

function start(event) {
  if (!city) {
    event.preventDefault();
    geoCode =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      search.value +
      "&limit=1&appid=" +
      key +
      "";

    var btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = search.value;
    cityBtn.append(btn);
    history(search.value);
  } else {
    geoCode =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=1&appid=" +
      key +
      "";
    history(city);
    console.log(city);
  }

  city = "";
  fetch(geoCode)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var lat = data[0].lat;
      var lon = data[0].lon;
      queryURL =
        `https://api.openweathermap.org/data/2.5/forecast?lat=` +
        lat +
        `&lon=` +
        lon +
        `&appid=` +
        key +
        `&units=imperial`;

      fetch(queryURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          newCity.textContent = data.city.name;
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
searchButton.addEventListener("click", start);

window.addEventListener("load", () => {
  var lat;
  var lon;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        key +
        "&units=imperial";

      fetch(queryURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          newCity.textContent = data.city.name;

          for (var i = 0; i < 6; i++) {
            document.getElementById("temp-" + i + "").textContent =
              "Temp: " + Number(data.list[i].main.temp).toFixed(0) + "°";
          }

          for (var i = 0; i < 6; i++) {
            document.getElementById("wind-" + i + "").textContent =
              "Wind: " + Number(data.list[i].wind.speed).toFixed(0) + " mph";
          }

          for (var i = 0; i < 6; i++) {
            document.getElementById("hum-" + i + "").textContent =
              "Humidity: " + Number(data.list[i].main.humidity) + "%";
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
});

function history(event) {
  if (!search.value) {
    return;
  } else {
    searchHistory.push(event);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
}

function load() {
  var loadHistory = localStorage.getItem("searchHistory");
  if (loadHistory == null) {
    return;
  }

  var cityButtonArr = JSON.parse(loadHistory);
  console.log(cityButtonArr);
  for (var i = 0; i < cityButtonArr.length; i++) {
    var btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = cityButtonArr[i];
    cityBtn.append(btn);
  }
}

cityBtn.addEventListener("click", (event) => {
  city = event.target.textContent;
  start();
});
