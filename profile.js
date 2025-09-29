// Mock logged-in farmer data
const loggedInFarmer = {
  name: "Prathmesh Takalkar",
  farmerID: "F12345"
};

// Example array of farmers
let farmers = [
  { id: 1, name: "Rakesh" },
  { id: 2, name: "Vansh" },
  { id: 3, name: "Mahesh" },
  { id: 4, name: "Pritam" }
];

// Get DOM elements
const farmerList = document.getElementById('farmerList');
const addFarmerBtn = document.getElementById('addFarmerBtn');
const farmerNameSpan = document.getElementById('farmerName');

// Display logged-in farmer name
if(farmerNameSpan) farmerNameSpan.textContent = loggedInFarmer.name;

// Function to render farmer boxes
function renderFarmers() {
  if(!farmerList) return;
  farmerList.innerHTML = '';
  
  farmers.forEach((farmer, index) => {
    const div = document.createElement('div');
    div.className = 'category-box';
    div.style.animation = `fadeInUp 0.5s ease forwards`;
    div.style.animationDelay = `${index * 0.1}s`;
    div.innerHTML = `<span>👨‍🌾 ${farmer.name}</span>`;
    
    div.onclick = () => {
      // Navigate to farmer-details page with id
      window.location.href = `farmer-details.html?id=${farmer.id}`;
    };
    
    farmerList.appendChild(div);
  });
}

// Add new farmer
if(addFarmerBtn){
  addFarmerBtn.addEventListener('click', () => {
    const name = prompt("Enter farmer name:");
    if(name){
      const id = farmers.length ? farmers[farmers.length-1].id + 1 : 1;
      farmers.push({ id, name });
      renderFarmers();
    }
  });
}

// Initial render
renderFarmers();

/* ===== CSS Animation ===== 
You can put this in profile.css
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
*/
