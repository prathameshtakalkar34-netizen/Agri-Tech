const apiBase = "http://127.0.0.1:8000";  // FastAPI backend URL
const cropListEl = document.getElementById("cropList");

// Register a new crop
async function registerCrop() {
  const id = parseInt(document.getElementById("cropId").value);
  const name = document.getElementById("cropName").value;
  const type = document.getElementById("cropType").value;
  const description = document.getElementById("cropDesc").value;
  const price = parseFloat(document.getElementById("cropPrice").value);

  if (!id || !name || !type || !description || !price) {
    alert("Please fill all fields");
    return;
  }

  const crop = { id, name, type, description, price };

  try {
    const res = await fetch(`${apiBase}/crops`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crop)
    });

    if (res.ok) {
      alert("Crop registered successfully!");
      loadCrops();
    } else {
      const data = await res.json();
      alert("Error: " + data.detail);
    }
  } catch (err) {
    alert("Server error: " + err.message);
  }
}

// Load all crops
async function loadCrops() {
  cropListEl.innerHTML = "";
  try {
    const res = await fetch(`${apiBase}/crops`);
    const crops = await res.json();
    crops.forEach(crop => {
      const div = document.createElement("div");
      div.className = "crop-item";
      div.innerHTML = `<span>${crop.name}</span> (${crop.type}) - ${crop.description} | $${crop.price}`;
      cropListEl.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

// Load crops on page load
loadCrops();
