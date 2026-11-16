// =====================================================
// Fix the Glitched Page!
// A virus scrambled this trainer card. Fix it using ONLY JavaScript.
//
// RULE: don't touch index.html or style.css. Write everything in this file.
// Save, then refresh the page (F5). The "System check" panel shows what's fixed.
//
// Tip: try each line in the Console first. When it works, copy it here.
// =====================================================

// Data you can use (don't change it, just use it!)
const trainer = {
  name: "N'NextGen",
  motto: "Code, debug, repeat!",
  hp: 120,
  atk: 85,
  spd: 95,
};



// ---------- Level 1 · Change the text (querySelector + textContent) ----------

// Mission 1: change the title (#title) to:  Trainer Card

document.querySelector("#title").textContent = "Trainer Card"

// Mission 2: put your own nickname in #trainer-name

document.querySelector("#trainer-name").textContent = "poom"

// Mission 3: put a motto in #motto (use trainer.motto, or write your own!)

document.querySelector("#motto").textContent = `${trainer.motto}`

// ---------- Level 2 · Change the look (classList + style) ----------

// Mission 4: remove the class "glitch" from #card   (watch the shaking stop!)

document.querySelector("#card").classList.remove("glitch")

// Mission 5: add the class "highlight" to #trainer-name

document.querySelector("#trainer-name").classList.add("highlight")

// Mission 6: change the color of #motto using .style.color

document.querySelector("#motto").style.color = 'green'

// ---------- Level 3 · Change attributes (src, alt, href) ----------

// Mission 7: change the picture: set the src of #avatar to "avatar.svg"

document.querySelector("#avatar").src = "avatar.svg"

// Mission 8: give #avatar a real alt text (describe the picture in words)

document.querySelector("#avatar").alt = "describe the picture in words"

// Mission 9: fix #link: set its href to a real website (starting with https://)
//            and change its text too

document.querySelector("#link").href = "https://poomrelax.in.th"
document.querySelector("#link").textContent = "https://poomrelax.in.th"

// ---------- Level 4 · Use the data (objects + DOM) ----------

// Mission 10: fill #hp, #atk and #spd with trainer.hp, trainer.atk and trainer.spd

document.querySelector("#hp").textContent = trainer.hp
document.querySelector("#atk").textContent = trainer.atk
document.querySelector("#spd").textContent = trainer.spd

// Mission 11: make EVERY .badge shiny: add the class "badge" to each one
//             (Hint: querySelectorAll + for...of)

const badgeAll = document.querySelectorAll(".badge")
for(const a of badgeAll){
  a.classList.add("shiny")
}

// ---------- Boss level ----------

const team = [
  { name: "Pikachu", element: "⚡" },
  { name: "Sylveon", element: "🎀" },
  { name: "Gyarados", element: "💧" },
];

// Mission 12: fill the list #team with every Pokémon in the `team` array.
//   Hint: select #team and set its innerHTML to "" (empty).
//         Then loop over team, and for each one add a new <li>:
//         list.innerHTML += `<li>${p.element} ${p.name}</li>`;

const teamE = document.querySelector("#team")
for(const p of team){
  teamE.innerHTML += `<li>${p.element} ${p.name}</li>`;
}

// Secret bonus: make the 🌙 Night mode button (#night-btn) toggle the class "night" on the body.
//   This needs addEventListener: the "Listen" step from the 3-step formula slide!
