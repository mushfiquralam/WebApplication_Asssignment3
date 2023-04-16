function getDataonClick() {

  apiKey = "85529bf7a773ab4d7ea73c6251488a32";
  var cityName = "";
  cityName = document.getElementById("sCityName").value;

  if (!cityName) {
    cityName = "Dhaka";
  }

  console.log(" City Name : " + cityName);
  var today = new Date();
  console.log("today: "+today)
  var mm = today.getMonth();
  var dd = today.getDate();
  var yy = today.getFullYear();

  var hours = addZero(today.getHours());
  var mins = addZero(today.getMinutes());

  var day = today.getDay() - 1;
  console.log("Day: " + day);

  const month= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const daysName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  var todayDate = `${dd} ${month[mm]}, ${yy}`;
  console.log("dd: " + dd + " mm: " + mm + " yy: " + yy + " Day: " + day);
  var todaytime;

  var k = addZero(hours % 12);
  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }
  if (hours > 12) {
    var todaytime = `${k} : ${mins} PM`;
  } else {
    var todaytime = `${hours}: ${mins} AM`;
  }
  document.getElementById("addDate").innerHTML = todayDate;
  document.getElementById("addTime").innerHTML = todaytime;
  document.getElementById("weather-location").innerHTML = cityName;
  var f = day;
  for (i = 0; i < 5; i++) {
    if (f + 1 > 6) {
      f = -1;
    }
    f = f + 1;
    console.log("Day: in:" + f);
    console.log("Day: " + i + ":" + f);
    document.getElementById("weekn" + (i + 1)).innerHTML = daysName[f];
  }
  console.log("Time: " + todaytime);
  console.log(" Date" + todayDate);
  console.log(" Day: " + day);
  getWeatherInfo();
  function getWeatherInfo() {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&exclude=hourly,minutely&units=metric&appid=" + this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          console.log("No data weather found.")
          alert("No data weather found.");
          throw new Error("No data weather found.");
        }
        return response.json();
      })
      .then((data) => {
        for (i = 0; i < 5; i++) {
          document.getElementById("day" + (i + 1)).innerHTML = Number(data.list[i].main.temp).toFixed(1) + "&#176;C";
          console.log("day" + (i + 1) + " temp : " + data.list[i].main.temp)
        }

        for(i = 0; i<5; i++){
          document.getElementById("weather" + (i+1)).innerHTML = data.list[i].weather[0].main;
          console.log("day" + (i+1)+" weather status : "+data.list[i].weather[0].main)
        }

        document.getElementById( "feels").innerHTML = "Feels like: " + data.list[0].main.feels_like + "&#176;C";
        console.log("day1" + " feels like : " + data.list[0].main.feels_like);

        document.getElementById("humidity").innerHTML = "Humidity: " + data.list[0].main.humidity + "%";
        console.log("day1"+ " humidity: " + data.list[0].main.humidity);
       
        document.getElementById("day1windSpeed").innerHTML = "Wind Speed: " + data.list[0].wind.speed + "m/s";
        console.log("day1" + " wind speed : " + data.list[0].wind.speed);
        
        for (i = 0; i < 5; i++) {
          document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
            data.list[i].weather[0].icon
            + ".png";
        }
        console.log(data)
      });
  }
}