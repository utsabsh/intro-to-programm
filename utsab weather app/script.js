const apiKey="ff46499780e490138710451eed3d6b14";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon =document.querySelector(".weather-icon");
async function CheckWeather(city){
	const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid="+apiKey+"&units=metric");
	var data = await response.json();
	if(response.status == 404){
		document.querySelector(".error").style.display = "block";
		document.querySelector(".weather").style.display ="none";
	}else{
// This section is for the date and day
 	const{dt}=data;

   const date = new Date(dt * 1000);

 const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dateString = `${date.toLocaleDateString()}, ${dayOfWeek}`;
	
	document.querySelector(".city").innerHTML=data.name;
	document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
	document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
	document.querySelector(".wind").innerHTML=data.wind.speed + "km/h";
	if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
	}else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
	}else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
	}else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
	}else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/mist.png";
	}
	document.querySelector(".weather").style.display="block";
	document.querySelector(".error").style.display = "none";
	document.querySelector(".dt").innerText ="Date and Day:\n " + dateString + " UTC";
} 
}
searchBtn.addEventListener("click", ()=>{
	CheckWeather(searchBox.value)
})

//Rainfall section which is using if else condition statement
let rainfallConditionSpan = document.getElementById("rainfall-condition");

// Define a function to check the rainfall amount and set the condition accordingly
function checkRainfall(humidity) {
  let rainfallCondition;
  if (humidity <= 0) {
    rainfallCondition = "rainfall N/A.";
  } else if (humidity > 0 && humidity <= 50) {
    rainfallCondition = "Light rainfall.";
  } else if (humidity> 51 && humidity <= 90) {
    rainfallCondition = "Moderate rainfall.";
  } else {
    rainfallCondition = "Heavy rainfall.";
  }
  
  // Output the rainfall condition to the span element
  rainfallConditionSpan.innerHTML = rainfallCondition;
}

// Call the checkRainfall function with a rainfall amount (in millimeters)
checkRainfall(30);
CheckWeather( );