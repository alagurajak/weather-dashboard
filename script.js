const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherSection = document.getElementById("weather-section");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const currentTime = document.getElementById("current-time");
const weatherIcon = document.getElementById("weather-icon");

const API_KEY = "7128c97c02b82e0cc23842146e8824bc"; // Replace with your OpenWeatherMap API key

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      alert(data.message);
      return;
    }

    // Update weather details
    weatherSection.classList.remove("hidden");
    cityName.textContent = `City: ${data.name}`;
    temperature.textContent = data.main.temp;
    condition.textContent = data.weather[0].main;
    weatherIcon.innerHTML = getWeatherIcon(data.weather[0].main);

    // Update current time
    const now = new Date();
    currentTime.textContent = now.toLocaleTimeString();

    // Change background color based on condition
    updateBackground(data.weather[0].main);
  } catch (error) {
    alert("Error fetching weather data. Please try again.");
    console.error(error);
  }
});

function getWeatherIcon(condition) {
  const icons = {
    Clear: "☀",
    Clouds: "☁",
    Rain: "🌧",
    Snow: "❄",
    Thunderstorm: "⚡",
    Drizzle: "💧",
    Mist: "🌫",
  };

  return icons[condition] || "🌍";
}

function updateBackground(condition) {
  const colors = {
    Clear: "#87CEEB",
    Clouds: "#B0C4DE",
    Rain: "#778899",
    Snow: "#ADD8E6",
    Thunderstorm: "#8B0000",
    Drizzle: "#AFEEEE",
    Mist: "#C0C0C0",
  };

  document.body.style.backgroundColor = colors[condition] || "#f3f4f6";
}
