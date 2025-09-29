// Charts Example
const marketCtx = document.getElementById('marketChart').getContext('2d');
const marketChart = new Chart(marketCtx, {
    type: 'bar',
    data: {
        labels: ['Vegetables', 'Fruits', 'Grains', 'Others'],
        datasets: [{
            label: 'Market Price ($)',
            data: [120, 150, 100, 80],
            backgroundColor: ['#2ecc71','#f1c40f','#3498db','#e67e22']
        }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
});

const healthCtx = document.getElementById('healthChart').getContext('2d');
const healthChart = new Chart(healthCtx, {
    type: 'doughnut',
    data: {
        labels: ['Healthy', 'Diseased', 'Needs Attention'],
        datasets: [{
            data: [60, 25, 15],
            backgroundColor: ['#2ecc71','#e74c3c','#f1c40f']
        }]
    },
    options: { responsive: true }
});

// Crop Image Capture
const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const preview = document.getElementById('preview');

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
});

captureBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    preview.src = canvas.toDataURL('image/png');
});

// Voice Assistant (basic alert)
document.getElementById('voiceBtn').addEventListener('click', () => {
    alert('Voice Assistant Activated');
});
