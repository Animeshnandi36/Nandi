const chat = document.getElementById("chat");
const input = document.getElementById("input");

function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = `msg ${className}`;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function showTyping() {
  const typing = document.createElement("div");
  typing.className = "msg bot";
  typing.id = "typing";
  typing.innerHTML = `
    <div class="typing">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>`;
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

async function send() {
  if (!input.value.trim()) return;

  addMessage(input.value, "user");
  const message = input.value;
  input.value = "";

  showTyping();

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  removeTyping();
  addMessage(data.reply, "bot");
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") send();
});