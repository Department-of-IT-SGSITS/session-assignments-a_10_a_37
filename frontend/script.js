const API_BASE = "https://ytlod7v3b0.execute-api.eu-north-1.amazonaws.com"; 
const LAST_CHECK_KEY = "lastAlertId_v1";
let lastAlertId = localStorage.getItem(LAST_CHECK_KEY) || null;

async function fetchLatestWeather(){
  try {
    const res = await fetch(`${API_BASE}/getLatestWeather`);
    if(!res.ok) throw new Error("Network error");
    const data = await res.json();
    updateWeatherUI(data);
  } catch(err){
    console.error("fetchLatestWeather", err);
  }
}

async function fetchAlerts(){
  try {
    const res = await fetch(`${API_BASE}/getAlerts`);
    if(!res.ok) throw new Error("Network error");
    const arr = await res.json();
    if(Array.isArray(arr) && arr.length > 0){
      const latest = arr[0];
      if(latest.id !== lastAlertId){
        lastAlertId = latest.id;
        localStorage.setItem(LAST_CHECK_KEY, lastAlertId);
        showAlert(latest.message, latest.type);
      }
    }
  } catch(err){
    console.error("fetchAlerts", err);
  }
}

function updateWeatherUI(data){
  if(!data || !data.temperature) return;

  // Header
  document.getElementById("city").innerText = data.city || "Unknown";
  document.getElementById("temp").innerText = Math.round(data.temperature) + "°";

  // Details
  document.getElementById("detailTemp").innerText = Math.round(data.temperature) + "°C";
  document.getElementById("realFeel").innerText = Math.round(data.temperature) + "°C";
  document.getElementById("humidity").innerText = (data.humidity || 0) + "%";
  document.getElementById("wind").innerText = ((data.windSpeed || 0) * 3.6).toFixed(1) + " km/h";
  document.getElementById("chance").innerText = "0%";
  document.getElementById("condition").innerText = data.weather || "--";
  document.getElementById("timestamp").innerText = data.timestamp 
    ? new Date(data.timestamp).toLocaleString() 
    : "--";

  // Weather icon
  const w = (data.weather || "").toLowerCase();
  let icon = "🌤";
  if (w.includes("cloud")) icon="⛅";
  else if (w.includes("rain")||w.includes("drizzle")) icon="🌧";
  else if (w.includes("thunder")) icon="⛈";
  else if (w.includes("clear")) icon="☀️";
  else if (w.includes("haze") || w.includes("fog") || w.includes("mist")) icon="🌫";
  document.getElementById("icon").innerText = icon;
}

function showAlert(message, type){
  const container = document.getElementById("alertContainer");
  container.innerHTML = ""; // clear previous alerts

  const el = document.createElement("div");
  el.className = "modalAlert";

  // modal inner box
  el.innerHTML = `
    <div class="modalContent">
      <h2>${type || "Alert"}</h2>
      <p>${message}</p>
      <button id="closeAlertBtn">OK</button>
    </div>
  `;

  container.appendChild(el);

  // close on button click
  document.getElementById("closeAlertBtn").addEventListener("click", () => {
    el.remove();
  });
}


// initial load
fetchLatestWeather();
fetchAlerts();

// polling every 15s
setInterval(fetchLatestWeather, 15000);
setInterval(fetchAlerts, 15000);
