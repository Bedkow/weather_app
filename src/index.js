import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import key from "./db.js";

// function fetching weather data on click event
const searchWeatherByCity = (event) => {
	event.preventDefault();
	console.log("HERE'S SOME WEATHER FOR YOU LAD"); //////// temp
	document.querySelector("#results").innerHTML = "";
	let query = document.querySelector("#city-search-input").value;

	fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${query}&days=3&aqi=no&alerts=no`
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			let weatherData = data;

			//create div for todays weather
			let weatherToday = document.createElement("div");
			weatherToday.classList.add("weather-today", "col-sm-12");

			//create div for tomorrows weather
			let weather1 = document.createElement("div");
			weather1.classList.add("weather1", "col-sm-4");

			//... weather in 2 days
			let weather2 = document.createElement("div");
			weather2.classList.add("weather2", "col-sm-4");

			//... weather in 3 days
			let weather3 = document.createElement("div");
			weather3.classList.add("weather3", "col-sm-4");

			//create div container for next 3 days
			let upcomingDaysContainer = document.createElement("div");
			upcomingDaysContainer.classList.add(
				"container-fluid",
				"row",
				"upcoming-days-container",
				"text-center"
			);

			//append todays weather as child
			weatherToday.innerHTML = `<div class="text-center mb-3">
			<h2>Currently</h2>
			<h2>${weatherData.current.condition.text}</h2>
			<img src="${weatherData.current.condition.icon}">
			<div>${weatherData.current.temp_c} &#8451;</div>
			</div>`;
			document.querySelector("#results").appendChild(weatherToday);

			//append next days container as sibling
			document.querySelector(".weather-today").after(upcomingDaysContainer);

			//append next 3 days as children to container

			/// REWRITE THIS MESS TO DRY

			weather1.innerHTML = `<div>
			<h2>Today (${new Date(weatherData.forecast.forecastday[0].date).toLocaleString(
				"en-us",
				{
					weekday: "long",
				}
			)})</h2>
			<h2>${weatherData.forecast.forecastday[0].day.condition.text}</h2>
			<img src="${weatherData.forecast.forecastday[0].day.condition.icon}">
			<div>${weatherData.forecast.forecastday[0].day.avgtemp_c} &#8451;</div>
			</div>`;
			document.querySelector(".upcoming-days-container").appendChild(weather1);

			weather2.innerHTML = `<div>
			<h2>${new Date(weatherData.forecast.forecastday[1].date).toLocaleString(
				"en-us",
				{
					weekday: "long",
				}
			)}</h2>
			<h2>${weatherData.forecast.forecastday[1].day.condition.text}</h2>
			<img src="${weatherData.forecast.forecastday[1].day.condition.icon}">
			<div>${weatherData.forecast.forecastday[1].day.avgtemp_c} &#8451;</div>
			</div>`;
			document.querySelector(".upcoming-days-container").appendChild(weather2);

			weather3.innerHTML = `<div>
			<h2>${new Date(weatherData.forecast.forecastday[2].date).toLocaleString(
				"en-us",
				{
					weekday: "long",
				}
			)}</h2>
			<h2>${weatherData.forecast.forecastday[2].day.condition.text}</h2>
			<img src="${weatherData.forecast.forecastday[2].day.condition.icon}">
			<div>${weatherData.forecast.forecastday[2].day.avgtemp_c} &#8451;</div>
			</div>`;
			document.querySelector(".upcoming-days-container").appendChild(weather3);
		})
		.catch((err) => {
			console.error(err);
			if (err) {
				alert("Somerting went wrong. Use only English characters!");
			}
		});
};

// event listener for button
document
	.querySelector("#search-btn")
	.addEventListener("click", searchWeatherByCity);
