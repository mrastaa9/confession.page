const list = document.getElementById("list");
const form = document.getElementById("confessionForm");
const input = document.getElementById("confessionInput");

const colors = ["bg1", "bg2", "bg3", "bg4", "bg5", "bg6"];

function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hrs ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

function saveConfession(e) {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const confessions = JSON.parse(localStorage.getItem("confessions") || "[]");
  const colorClass = colors[Math.floor(Math.random() * colors.length)];
  confessions.unshift({
    text,
    time: new Date().toISOString(),
    likes: 0,
    color: colorClass
  });
  localStorage.setItem("confessions", JSON.stringify(confessions));
  input.value = "";
  loadConfessions();
}

function likeConfession(index) {
  const confessions = JSON.parse(localStorage.getItem("confessions") || "[]");
  confessions[index].likes = (confessions[index].likes || 0) + 1;
  localStorage.setItem("confessions", JSON.stringify(confessions));
  loadConfessions();
}

function loadConfessions() {
  const confessions = JSON.parse(localStorage.getItem("confessions") || "[]");
  list.innerHTML = "";

  confessions.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = `confession ${item.color || colors[index % colors.length]}`;

    li.innerHTML = `
      <p>${item.text}</p>
      <small>${timeAgo(new Date(item.time))}</small><br>
      <button class="likeBtn" onclick="likeConfession(${index})">❤ ${item.likes || 0}</button>
    `;

    list.appendChild(li);
    setTimeout(() => {
      li.style.opacity = 1;
    }, 100);
  });
}

form.addEventListener("submit", saveConfession);
window.likeConfession = likeConfession;
window.onload = loadConfessions;