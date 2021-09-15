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
		`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${query}&days=3&aqi=yes&alerts=no`
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
			let daysContainer = document.createElement("div");
			daysContainer.classList.add(
				"container",
				"row",
				"upcoming-days-container"
			);

			//append todays weather as child
			weatherToday.innerHTML = `<h2>${weatherData.current.condition.text}</h2>`;
			document.querySelector("#results").appendChild(weatherToday);

			//append next days container as sibling
			document.querySelector(".weather-today").after(daysContainer);

			//append next 3 days as children to container

			weather1.innerHTML = "E";
			document.querySelector(".upcoming-days-container").appendChild(weather1);

			weather2.innerHTML = "S";
			document.querySelector(".upcoming-days-container").appendChild(weather2);

			weather3.innerHTML = "(T)";
			document.querySelector(".upcoming-days-container").appendChild(weather3);
		})
		.catch((err) => {
			console.error(err);
		});
};

// event listener for button
document
	.querySelector("#search-btn")
	.addEventListener("click", searchWeatherByCity);
