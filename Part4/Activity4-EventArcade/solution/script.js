// ---------- Machine 1 · Power Switch · "click" ----------
const powerBtn = document.querySelector("#power-btn");
const lamp = document.querySelector("#lamp");

powerBtn.addEventListener("click", () => {
  lamp.classList.toggle("on");
});


// ---------- Machine 2 · Shy Ghost · "mouseenter" and "mouseleave" ----------
const ghost = document.querySelector("#ghost");

ghost.addEventListener("mouseenter", () => {
  ghost.classList.add("hide");
});

ghost.addEventListener("mouseleave", () => {
  ghost.classList.remove("hide");
});


// ---------- Machine 3 · Name Tag · "input" ----------
const nameInput = document.querySelector("#name-input");
const namePreview = document.querySelector("#name-preview");

nameInput.addEventListener("input", () => {
  namePreview.textContent = nameInput.value;
});


// ---------- Machine 4 · Dino Jump · "keydown" and "keyup" ----------
const dino = document.querySelector("#dino");
const lastKey = document.querySelector("#last-key");

document.addEventListener("keydown", (event) => {
  lastKey.textContent = event.key === " " ? "Space" : event.key;

  if (event.key === " " || event.key === "ArrowUp") {
    dino.classList.add("jump");
  }
});

document.addEventListener("keyup", () => {
  dino.classList.remove("jump");
});


// ---------- Machine 5 · Secret Door · "click" + input.value ----------
const doorBtn = document.querySelector("#door-btn");
const doorInput = document.querySelector("#door-input");
const door = document.querySelector("#door");
const doorMsg = document.querySelector("#door-msg");

doorBtn.addEventListener("click", () => {
  if (doorInput.value === "nextgen") {
    door.classList.add("open");
    doorMsg.textContent = "Welcome in!";
  } else {
    door.classList.remove("open");
    doorMsg.textContent = "Wrong password!";
  }
});


// ---------- Bonus · Radar · "mousemove" ----------
const radar = document.querySelector("#radar");
const blip = document.querySelector("#blip");
const coords = document.querySelector("#coords");

radar.addEventListener("mousemove", (event) => {
  coords.textContent = `x: ${event.offsetX}, y: ${event.offsetY}`;
  blip.style.left = event.offsetX + "px";
  blip.style.top = event.offsetY + "px";
});
