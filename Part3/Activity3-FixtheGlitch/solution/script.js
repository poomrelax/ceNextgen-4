const trainer = {
  name: "N'NextGen",
  motto: "Code, debug, repeat!",
  hp: 120,
  atk: 85,
  spd: 95,
};

const team = [
  { name: "Pikachu", element: "⚡" },
  { name: "Sylveon", element: "🎀" },
  { name: "Gyarados", element: "💧" },
];


// ---------- Level 1 · Change the text ----------

// Mission 1
const title = document.querySelector("#title");
title.textContent = "Trainer Card";

// Mission 2
const trainerName = document.querySelector("#trainer-name");
trainerName.textContent = trainer.name;

// Mission 3
const motto = document.querySelector("#motto");
motto.textContent = trainer.motto;


// ---------- Level 2 · Change the look ----------

// Mission 4
const card = document.querySelector("#card");
card.classList.remove("glitch");

// Mission 5
trainerName.classList.add("highlight");

// Mission 6
motto.style.color = "#3b6fe0";


// ---------- Level 3 · Change attributes ----------

// Mission 7 + 8
const avatar = document.querySelector("#avatar");
avatar.src = "avatar.svg";
avatar.alt = "A pixel-art trainer with a blue beanie";

// Mission 9
const link = document.querySelector("#link");
link.href = "https://developer.mozilla.org";
link.textContent = "Learn JavaScript on MDN";


// ---------- Level 4 · Use the data ----------

// Mission 10
document.querySelector("#hp").textContent = trainer.hp;
document.querySelector("#atk").textContent = trainer.atk;
document.querySelector("#spd").textContent = trainer.spd;

// Mission 11
const badges = document.querySelectorAll(".badge");
for (const badge of badges) {
  badge.classList.add("shiny");
}


// ---------- Boss level ----------

// Mission 12
const list = document.querySelector("#team");
list.innerHTML = "";
for (const p of team) {
  list.innerHTML += `<li>${p.element} ${p.name}</li>`;
}

// Secret bonus: Select → Listen → Change
const nightBtn = document.querySelector("#night-btn");
nightBtn.addEventListener("click", () => {
  document.body.classList.toggle("night");
});
