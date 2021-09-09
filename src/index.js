import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

// function fetching weather data on click event
const searchWeatherByCity = (event) => {
	event.preventDefault();
	console.log("work");

	fetch(
		"https://community-open-weather-map.p.rapidapi.com/weather?q=Pozna%C5%84&lat=0&lon=0&callback=test&id=2172797&lang=en&units=metric",
		{
			method: "GET",
			headers: {
				"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
				"x-rapidapi-key": "e328accc28msh6031df70b3e41b0p14dee7jsnb4d5ff2ddc44",
			},
		}
	)
		.then((response) => {
			console.log(response);
		})
		.catch((err) => {
			console.error(err);
		});

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
	daysContainer.classList.add("container", "row", "upcoming-days-container");

	//append todays weather as child
	weatherToday.innerHTML = "T";
	document.querySelector("#output-below-here").appendChild(weatherToday);

	//append next days container as sibling
	document.querySelector(".weather-today").after(daysContainer);

	//append next 3 days as children to container

	weather1.innerHTML = "E";
	document.querySelector(".upcoming-days-container").appendChild(weather1);

	weather2.innerHTML = "S";
	document.querySelector(".upcoming-days-container").appendChild(weather2);

	weather3.innerHTML = "(T)";
	document.querySelector(".upcoming-days-container").appendChild(weather3);
};

// event listener for button
document
	.querySelector("#search-btn")
	.addEventListener("click", searchWeatherByCity);
