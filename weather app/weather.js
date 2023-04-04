let weather = {
    apiKey: "f43e68aa9289f3dc1e3694826d06a46c",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No city found.");
            throw new Error("No city found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { dt } = data.dt;
    
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("dhulikhel");
  const form = document.querySelector('form');
const weatherDiv = document.getElementById('weather');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const location = form.elements['location'].value;
	getWeather(location);
});

async function getWeather(location) {
	try {
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid={YOUR_API_KEY}&units=metric`);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const data = await response.json();
		weatherDiv.innerHTML = `Current temperature in ${data.name}: ${data.main.temp}°C`;
	} catch (error) {
		console.log(error);
		weatherDiv.innerHTML = `An error occurred while fetching weather data for ${location}. Please try again later.`;
	}
}
