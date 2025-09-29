async function sendOtp() {
  let email = document.getElementById("email").value;
  let formData = new FormData();
  formData.append("email", email);

  let response = await fetch("/send-otp", {
    method: "POST",
    body: formData
  });
  let result = await response.json();
  document.getElementById("msg").innerText = result.msg;

  if (result.success) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("otpForm").style.display = "block";
  }
}

async function verifyOtp() {
  let email = document.getElementById("email").value;
  let otp = document.getElementById("otp").value;
  let formData = new FormData();
  formData.append("email", email);
  formData.append("otp", otp);

  let response = await fetch("/verify-otp", {
    method: "POST",
    body: formData
  });

  if (response.redirected) {
    window.location.href = response.url;
  } else {
    let result = await response.json();
    document.getElementById("msg").innerText = result.msg;
  }
}

async function loadCrops() {
  let response = await fetch("/api/crops");
  let crops = await response.json();
  let container = document.getElementById("cropList");
  container.innerHTML = "";

  for (let name in crops) {
    let crop = crops[name];
    let div = document.createElement("div");
    div.className = "crop-card";
    div.innerHTML = `
      <h3>${name}</h3>
      <p>Pesticide: ${crop.pesticide}</p>
      <p>Growth Time: ${crop.growth}</p>
      <p>Market Price: ${crop.price}</p>
    `;
    container.appendChild(div);
  }
}

// 🔍 Filter crops
function filterCrops() {
  let input = document.getElementById("search").value.toLowerCase();
  let cards = document.getElementsByClassName("crop-card");
  for (let card of cards) {
    let title = card.getElementsByTagName("h3")[0].innerText.toLowerCase();
    card.style.display = title.includes(input) ? "block" : "none";
  }
}

// 🚧 Coming soon popup
function comingSoon() {
  alert("🚧 This feature is coming soon!");
}

// Run on page load
if (document.getElementById("cropList")) {
  loadCrops();
}

// ====================== FARMER DASHBOARD JS ======================

// Crop Data (optional placeholder, replace with backend fetch if available)
const crops = [
  { name: 'Tomato', category: 'Vegetables', pesticide: 'Neem Oil', growth: '90 days', price: '₹25/kg' },
  { name: 'Wheat', category: 'Grains', pesticide: 'Sulphur Powder', growth: '120 days', price: '₹20/kg' },
  { name: 'Apple', category: 'Fruits', pesticide: 'Organic Spray', growth: '150 days', price: '₹80/kg' },
  { name: 'Rice', category: 'Grains', pesticide: 'Copper Fungicide', growth: '150 days', price: '₹30/kg' },
  { name: 'Carrot', category: 'Vegetables', pesticide: 'Neem Oil', growth: '70 days', price: '₹15/kg' }
];

// DOM Elements
const cropList = document.getElementById('cropList');
const searchInput = document.getElementById('search');

// ====================== DISPLAY CROPS ======================
function displayCrops(filteredCrops) {
  cropList.innerHTML = '';
  if (filteredCrops.length === 0) {
    cropList.innerHTML = `<p style="color:#555; text-align:center;">No crops found!</p>`;
    return;
  }
  filteredCrops.forEach(crop => {
    const card = document.createElement('div');
    card.className = 'crop-card';
    card.innerHTML = `
      <h3>${crop.name}</h3>
      <p>Category: ${crop.category}</p>
      <p>Pesticide: ${crop.pesticide}</p>
      <p>Growth: ${crop.growth}</p>
      <p>Market Price: ${crop.price}</p>
    `;
    cropList.appendChild(card);
  });
}

// ====================== FILTER CROPS ======================
function filterCrops() {
  const query = searchInput.value.toLowerCase();
  const filtered = crops.filter(c => c.name.toLowerCase().includes(query));
  displayCrops(filtered);
}

// ====================== CATEGORY HIGHLIGHT ANIMATION ======================
const categoryBoxes = document.querySelectorAll('.category-box');
categoryBoxes.forEach(box => {
  box.addEventListener('mouseenter', () => {
    box.style.transform = 'translateY(-10px)';
    box.style.boxShadow = '0 15px 30px rgba(0,0,0,0.25)';
  });
  box.addEventListener('mouseleave', () => {
    box.style.transform = '';
    box.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)';
  });
});

// ====================== VOICE SEARCH (optional if voice.js included) ======================
if(typeof startListening === 'function'){
  console.log('Voice Assistant Ready');
}

// ====================== INITIAL LOAD ======================
displayCrops(crops);

// ====================== OPTIONAL: Fetch data from backend ======================
// Uncomment and modify endpoint if backend available
/*
async function fetchCropsFromBackend() {
  try {
    const response = await fetch('/api/crops');
    const data = await response.json();
    crops = data; // Replace local data
    displayCrops(crops);
  } catch(err) {
    console.error('Failed to fetch crops from backend', err);
  }
}
fetchCropsFromBackend();
*/

// Get the welcome message element
const welcomeMsg = document.getElementById("welcomeMsg");

// Fetch farmer profile from backend
async function loadFarmerProfile() {
  try {
    const res = await fetch("/api/farmer-profile"); // Make sure your backend API exists
    if (!res.ok) throw new Error("Profile not found");
    const data = await res.json();
    
    // Display the farmer's name
    welcomeMsg.innerHTML = `Welcome, ${data.name}!`;
  } catch (err) {
    console.error(err);
    welcomeMsg.innerHTML = "Welcome, Farmer!";
  }
}

// Call the function on page load
window.addEventListener("DOMContentLoaded", loadFarmerProfile);


localStorage.setItem("farmerName", "Rakesh");
const name = localStorage.getItem("farmerName");
welcomeMsg.innerHTML = `Welcome, ${name}!`;

// Animate category boxes when page loads
window.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.category-box');
  boxes.forEach((box, index) => {
    box.style.opacity = 0;
    box.style.transform = 'translateY(20px)';
    setTimeout(() => {
      box.style.transition = 'all 0.5s ease';
      box.style.opacity = 1;
      box.style.transform = 'translateY(0)';
    }, 150 * index);
  });
});

// Optional: welcome message after login
const profileName = localStorage.getItem('farmerName') || 'Farmer';
const welcomeDiv = document.createElement('div');
welcomeDiv.innerHTML = `<h2>Welcome, ${profileName}!</h2>`;
welcomeDiv.style.marginBottom = '20px';
document.querySelector('.content').prepend(welcomeDiv);

function openTab(tabId) {
  const buttons = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  buttons.forEach(btn => btn.classList.remove('active'));
  contents.forEach(tab => tab.classList.remove('active'));

  event.target.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

const callBtn = document.getElementById("callBtn");
const answerBtn = document.getElementById("answerBtn");
const micAnimation = document.getElementById("micAnimation");

callBtn.addEventListener("click", () => {
  micAnimation.classList.remove("hidden");
  alert("📞 Call started...");
});

answerBtn.addEventListener("click", () => {
  micAnimation.classList.remove("hidden");
  alert("✅ Call answered...");
});

// Optional: stop mic animation after call ends
function endCall() {
  micAnimation.classList.add("hidden");
  alert("⛔ Call ended");
}

