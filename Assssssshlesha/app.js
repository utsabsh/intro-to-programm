const apiKey = '973e8385ff772e226758580362d6f378';

function getWeather(city) {
  // Construct the API URL
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Fetch the weather data from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Extract the relevant weather information from the API response
      const cityName = data.name;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const description = data.weather[0].description;
      const windSpeed = data.wind.speed;
      const{dt}=data;
    

      //Date section starts frome here
      const date = new Date(dt * 1000);

      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayOfWeek = daysOfWeek[date.getDay()];
      const dateString = `${date.toLocaleDateString()}, ${dayOfWeek}`;
 

      // Update the HTML with the weather information
      document.querySelector('.weather-info h2').textContent = cityName;
      document.querySelector('.temp').textContent = `Temperature: ${temperature}°C`;
      document.querySelector('.humidity').textContent = `Humidity: ${humidity}%`;
      document.querySelector('.description').textContent = `Weather Description: ${description}`;
     
      document.querySelector('.wind-speed').textContent = `Wind Speed: ${windSpeed} m/s`;
      document.querySelector(".dt").innerText ="Date and Day: " + dateString + " UTC";
 
     
    })
    .catch(error => {
      // If there's an error fetching the weather data, display an error message
      document.querySelector('.weather-info h2').textContent = 'Error';
      document.querySelector('.temp').textContent = '';
      document.querySelector('.humidity').textContent = '';
      document.querySelector('.description').textContent = error.message;
      
    });
}

// Rainfall section Starts from here

let rainfallConditionSpan = document.getElementById("rainfall-condition");

// Define a function to check the rainfall amount and set the condition accordingly
function checkRainfall(humidity) {
  let rainfallCondition;
  if (humidity <= 0) {
    rainfallCondition = "rainfall N/A.";
  } else if (humidity > 0 && humidity <= 50) {
    rainfallCondition = "Light rainfall Occur.";
  } else if (humidity> 51 && humidity <= 90) {
    rainfallCondition = "Moderate rainfall Occur.";
  } else {
    rainfallCondition = "Heavy rainfall Occur.";
  }
  
  // Output the rainfall condition to the span element
  rainfallConditionSpan.innerHTML = rainfallCondition;
}

// Call the checkRainfall function with a rainfall amount (in millimeters)
checkRainfall(20);


  

// Attach an event listener to the form to fetch weather data when the form is submitted
const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const cityInput = document.querySelector('input[type="text"]');
  const city = cityInput.value.trim();
  getWeather(city);
});
