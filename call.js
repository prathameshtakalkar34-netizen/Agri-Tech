const callBtn = document.getElementById('callBtn');
const answerBtn = document.getElementById('answerBtn');
const remoteAudio = document.getElementById('remoteAudio');

let pc = new RTCPeerConnection();

// Play remote audio
pc.ontrack = (event) => {
  remoteAudio.srcObject = event.streams[0];
};

// Caller: Start call
callBtn.onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  stream.getTracks().forEach(track => pc.addTrack(track, stream));

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  // Send offer to backend server (FastAPI / Node signaling)
  console.log("Send this offer to the other peer:", offer.sdp);
};

// Receiver: Answer call
answerBtn.onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  stream.getTracks().forEach(track => pc.addTrack(track, stream));

  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  // Send answer to backend server
  console.log("Send this answer to the caller:", answer.sdp);
};
let localStream;
let pc;

// Get elements
const callBtn = document.getElementById("callBtn");
const answerBtn = document.getElementById("answerBtn");
const localAudio = document.getElementById("localAudio");
const remoteAudio = document.getElementById("remoteAudio");

// ICE servers (free STUN)
const servers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }
  ]
};

// Start Call
callBtn.onclick = async () => {
  pc = new RTCPeerConnection(servers);

  // Local stream
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
  localAudio.srcObject = localStream;

  // Remote stream
  pc.ontrack = event => {
    remoteAudio.srcObject = event.streams[0];
  };

  // Create offer
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  // Send offer to backend (signaling server needed)
  console.log("Send this offer to the other peer:", offer);
};

// Answer Call
answerBtn.onclick = async () => {
  pc = new RTCPeerConnection(servers);

  // Local stream
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
  localAudio.srcObject = localStream;

  // Remote stream
  pc.ontrack = event => {
    remoteAudio.srcObject = event.streams[0];
  };

  // Normally: fetch the offer from backend
  const offer = prompt("Paste the caller's offer here:");
  await pc.setRemoteDescription(JSON.parse(offer));

  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  // Send answer to backend
  console.log("Send this answer back to caller:", answer);
};
