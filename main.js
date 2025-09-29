const BASE_URL = "http://127.0.0.1:8000"; // your backend

// Tab navigation
function showTab(id, btn) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".sidebar button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// Weather Info
async function getWeather() {
  const city = document.getElementById("city").value || "Mumbai";

  // API_KEY comes from api.js
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  const data = await res.json();

  if (data.cod !== 200) {
    document.getElementById("weather-result").innerHTML =
      `<p style="color:red;">${data.message}</p>`;
    return;
  }

  document.getElementById("weather-result").innerHTML = `
    <p><b>City:</b> ${data.name}</p>
    <p><b>Temperature:</b> ${data.main.temp} °C</p>
    <p><b>Weather:</b> ${data.weather[0].description}</p>
    <p><b>Humidity:</b> ${data.main.humidity}%</p>
  `;
}

// Analyze Image
async function analyze() {
  const fileInput = document.getElementById("photo");
  if (!fileInput.files[0]) return alert("Please select a file!");

  const formData = new FormData();
  formData.append("photo", fileInput.files[0]);

  const res = await fetch(`${BASE_URL}/analyze`, { method: "POST", body: formData });
  const result = await res.json();
  document.getElementById("analyze-output").textContent = JSON.stringify(result, null, 2);
}
