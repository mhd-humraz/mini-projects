const apiKey = "9266f4c12c1be2b16dac42952f00a837";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");

  // Current weather
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const currentRes = await fetch(currentUrl);
    if (!currentRes.ok) throw new Error("City not found");
    const currentData = await currentRes.json();

    const weatherHTML = `
      <h2>${currentData.name}, ${currentData.sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png" alt="Weather icon">
      <p><strong>Temperature:</strong> ${currentData.main.temp}°C</p>
      <p><strong>Weather:</strong> ${currentData.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${currentData.main.humidity}%</p>
    `;
    document.getElementById("weatherResult").innerHTML = weatherHTML;

    // 5-day forecast
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    const forecastHTML = forecastData.list
      .filter(f => f.dt_txt.includes("12:00:00")) // Noon data
      .map(f => `
        <div class="forecast-day">
          <p><strong>${new Date(f.dt_txt).toLocaleDateString()}</strong></p>
          <img src="https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png" alt="icon">
          <p>${f.main.temp}°C - ${f.weather[0].description}</p>
        </div>
      `).join("");

   document.getElementById("forecastResult").innerHTML = `
  <h3>5-Day Forecast</h3>
  <div class="forecast-container">
    ${forecastHTML}
  </div>
`;

  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
    document.getElementById("forecastResult").innerHTML = ``;
  }
}

// Voice input
function startVoiceInput() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("cityInput").value = transcript;
    getWeather();
  };

  recognition.onerror = function () {
    alert("Voice recognition failed. Please try again.");
  };
                                  }
