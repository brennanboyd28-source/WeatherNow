// UI elements
const loadWeatherBtn = document.getElementById("loadWeatherBtn");
const citySelect = document.getElementById("citySelect");
const statusMessage = document.getElementById("statusMessage");
const weatherResult = document.getElementById("weatherResult");

const tempSpan = document.getElementById("temp");
const windSpan = document.getElementById("wind");
const codeSpan = document.getElementById("code");
const timeSpan = document.getElementById("time");
const descSpan = document.getElementById("desc");
const iconImg = document.getElementById("weatherIcon");

// Your API key
const apiKey = "319cc5f43bc9a0867bf3435358c71795";

// Main button click
loadWeatherBtn.addEventListener("click", async () => {
  const [lat, lon] = citySelect.value.split(",");

  statusMessage.textContent = "Loading weather...";
  weatherResult.hidden = true;
  iconImg.hidden = true;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    // Fill in weather data
    tempSpan.textContent = `${data.main.temp}°F`;
    windSpan.textContent = `${data.wind.speed} mph`;
    codeSpan.textContent = data.weather[0].id;
    descSpan.textContent = data.weather[0].description;
    timeSpan.textContent = new Date().toLocaleTimeString();

    // Weather icon from OpenWeatherMap
    const iconCode = data.weather[0].icon;
    iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconImg.hidden = false;

    // Show results
    weatherResult.hidden = false;
    statusMessage.textContent = "Weather loaded!";
  } catch (error) {
    console.error("Weather error:", error);
    statusMessage.textContent = "Failed to load weather.";
  }
});




