const chat = document.getElementById("chat");
const input = document.getElementById("input");

function addMsg(text, cls) {
  const d = document.createElement("div");
  d.className = "msg " + cls;
  d.innerText = text;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

function typingOn() {
  const t = document.createElement("div");
  t.id = "typing";
  t.className = "msg bot";
  t.innerHTML = `
    <div class="typing">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>`;
  chat.appendChild(t);
  chat.scrollTop = chat.scrollHeight;
}

function typingOff() {
  const t = document.getElementById("typing");
  if (t) t.remove();
}

async function send() {
  if (!input.value.trim()) return;

  const text = input.value;
  input.value = "";
  addMsg(text, "user");
  typingOn();

  const res = await fetch("/chat", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({message: text})
  });

  const data = await res.json();
  typingOff();
  addMsg(data.reply, "bot");
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") send();
});