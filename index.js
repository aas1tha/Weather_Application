let cityName = document.querySelector('.weather_city');
let dateTime = document.querySelector('.weather_date_time');
let w_forecast = document.querySelector('.weather_forecast');
let w_icon = document.querySelector('.weather_icon');
let w_temperature = document.querySelector('.weather_temperature');
let w_minTem = document.querySelector('.weather_min');
let w_maxTem = document.querySelector('.weather_max');
let w_feelsLike = document.querySelector('.weather_feelsLike');
let w_humidity = document.querySelector('.weather_humidity');
let w_wind = document.querySelector('.weather_wind');
let w_pressure = document.querySelector('.weather_pressure');
let citySearch = document.querySelector('.weather_search');




// to get the date and time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  console.log(curDate);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };    // what we want to display

  const formatter = new Intl.DateTimeFormat("en-US", options);    // API
  return formattedDate = formatter.format(curDate);
  // console.log(formattedDate);


};


// search functionality
let city = "bharuch";   // by default
citySearch.addEventListener('submit', (e) => {
  e.preventDefault();
  let cityName = document.querySelector('.city_name');
  city = cityName.value;  // update the value as per user has entered
  getWeatherData();   // now fetch data for input
  cityName.value = "";
});


// to get the actual country name
const getCountryName = (code) => {
  return new Intl.DisplayNames(['en'], { type: "region" }).of(code);      // using an API
};




//define the getWeather function here
const getWeatherData = async () => {    //mkae async for API
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dd98e3ff8d84f775ccb6790cdc6e4f76&units=metric`;
   // q = query
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    // console.log(data);
    const {main, name, weather, wind, sys, dt} = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;

    dateTime.innerHTML = getDateTime(dt);

    w_temperature.innerHTML = `${main.temp}&deg;C`;   // cover this html tag with `` in .js
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&deg;C`;   // no decimal points
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&deg;C`;   
    
    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&deg;C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed.toFixed(1)}m/s`;
    w_pressure.innerHTML = `${main.pressure}hPa`;


  }
  catch (error){
    // cityName.innerHTML = `Location not found.`;
    console.log(error);
  }
};

// getWeatherData();

window.addEventListener("load", getWeatherData());


// api key: dd98e3ff8d84f775ccb6790cdc6e4f76
