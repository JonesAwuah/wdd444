const weatherContainer = document.querySelector("#weather");
const forecastContainer = document.querySelector("#forecast");

const apiKey = "807a58c6b25711f127d258ed4d1c9779"; // Your working API key
const city = "Accra"; 
const units = "metric"; // Celsius

async function getWeather() {
  try {
    // ✅ Current Weather
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    const weatherResponse = await fetch(weatherURL);
    if (!weatherResponse.ok) throw new Error("Weather fetch failed");
    const weatherData = await weatherResponse.json();

    const icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const temp = Math.round(weatherData.main.temp);
    const desc = weatherData.weather[0].description;

    weatherContainer.innerHTML = `
      <h3>Current Weather</h3>
      <img src="${icon}" alt="${desc}">
      <p><strong>${temp}°C</strong></p>
      <p>${desc}</p>
    `;

    // ✅ Forecast (3 days, free API uses 3-hour intervals)
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    const forecastResponse = await fetch(forecastURL);
    if (!forecastResponse.ok) throw new Error("Forecast fetch failed");
    const forecastData = await forecastResponse.json();

    forecastContainer.innerHTML = "<h3>3-Day Forecast</h3>";

    // Group by date and pick midday (12:00) or fallback
    const dailyForecasts = {};
    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      if (!dailyForecasts[date] && item.dt_txt.includes("12:00:00")) {
        dailyForecasts[date] = item;
      }
    });

    // Pick the first 3 days
    const dates = Object.keys(dailyForecasts).slice(0, 3);

    dates.forEach(date => {
      const day = dailyForecasts[date];
      const weekday = new Date(date).toLocaleDateString("en-GB", { weekday: "short" });
      const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
      const temp = Math.round(day.main.temp);

      forecastContainer.innerHTML += `
        <div class="forecast-day">
          <p>${weekday}</p>
          <img src="${icon}" alt="${day.weather[0].description}">
          <p>${temp}°C</p>
        </div>
      `;
    });

  } catch (err) {
    console.error("Weather API error:", err);
    weatherContainer.innerHTML = "<p>Unable to load weather.</p>";
    forecastContainer.innerHTML = "<p>Unable to load forecast.</p>";
  }
}

getWeather();


// ✅ Spotlight Members
const spotlightContainer = document.querySelector("#spotlight");

async function loadSpotlight() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Spotlight data fetch failed");
    const members = await response.json();

    // Filter Gold (3) and Silver (2)
    const filtered = members.filter(m => m.membership >= 2);

    // Shuffle & Pick 2–3
    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

    spotlightContainer.innerHTML = "<h2>Member Spotlight</h2>";

    selected.forEach(member => {
      spotlightContainer.innerHTML += `
        <div class="spotlight-card">
          <img src="${member.image}" alt="${member.name}">
          <h3>${member.name}</h3>
          <p>${member.description}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        </div>
      `;
    });

  } catch (err) {
    console.error("Spotlight error:", err);
    spotlightContainer.innerHTML = "<p>Unable to load spotlight members.</p>";
  }
}

loadSpotlight();
