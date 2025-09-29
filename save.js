// ----- Local Storage Gallery -----

// Function to save captured image
function saveCapturedImage(dataURL) {
  let images = JSON.parse(localStorage.getItem("cropImages") || "[]");
  images.push(dataURL);
  localStorage.setItem("cropImages", JSON.stringify(images));
  updateGallery();
}

// Function to update gallery display
function updateGallery() {
  const galleryDiv = document.getElementById("gallery");
  galleryDiv.innerHTML = "";
  let images = JSON.parse(localStorage.getItem("cropImages") || "[]");
  images.reverse().forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.style.width = "150px";
    img.style.height = "100px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "8px";
    img.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    galleryDiv.appendChild(img);
  });
}

// Call this after capturing
captureBtn.addEventListener('click', ()=>{
  if(!currentStream) return alert('Camera not started');
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);
  const dataURL = canvas.toDataURL('image/jpeg',0.9);
  previewImg.src = dataURL;
  analyzeBtn.disabled=false;
  
  // Save image to gallery
  saveCapturedImage(dataURL);
});

// Initialize gallery on page load
updateGallery();
