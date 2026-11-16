// =====================================================
// Event Arcade!
// 5 machines are switched off. Wake each one up with addEventListener.
//
// RULE: don't touch index.html or style.css. Write everything in this file.
// Save, then refresh the page (F5). The "Machine check" panel shows what works.
//
// The pattern you'll use every time:
//
//   element.addEventListener("eventName", (event) => {
//     // what should happen
//   });
//
// The elements are already selected for you below each machine.
// =====================================================


// ---------- Machine 1 · Power Switch · "click" ----------
// When #power-btn is clicked: toggle the class "on" on #lamp.
// Hint: classList.toggle("on") adds it if missing, removes it if there.
const powerBtn = document.querySelector("#power-btn");
const lamp = document.querySelector("#lamp");

powerBtn.addEventListener("click", () => {
  lamp.classList.toggle("on")
});



// ---------- Machine 2 · Shy Ghost · "mouseenter" and "mouseleave" (= hover) ----------
// Mouse enters #ghost  → add the class "hide"
// Mouse leaves #ghost  → remove the class "hide"
const ghost = document.querySelector("#ghost");

ghost.addEventListener("mouseenter", () => {
    ghost.classList.add("hide")
})
ghost.addEventListener("mouseleave", () => {
    ghost.classList.remove("hide")
})


// ---------- Machine 3 · Name Tag · "input" ----------
// Every time the user types in #name-input:
//   #name-preview shows what's in the box  (nameInput.value)
const nameInput = document.querySelector("#name-input");
const namePreview = document.querySelector("#name-preview");

nameInput.addEventListener("input", () => {
    namePreview.textContent = nameInput.value
})

// ---------- Machine 4 · Dino Jump · "keydown" and "keyup" ----------
// Listen on the whole page: document.addEventListener("keydown", (event) => { ... });
// The event object tells you WHICH key:  event.key  → "a", "Enter", "ArrowUp", " " (Space)
//
// keydown:
//   1. show event.key in #last-key
//   2. if the key is " " (Space) or "ArrowUp" → add the class "jump" to #dino
// keyup:
//   remove the class "jump" from #dino
const dino = document.querySelector("#dino");
const lastKey = document.querySelector("#last-key");

document.addEventListener("keydown", (e) => {
    // e.preventDefault()
    if(e.key == " " || e.key == "ArrowUp"){
        dino.classList.add("jump")
    }
    lastKey.textContent = e.key
})
document.addEventListener("keyup", () => {
    // e.preventDefault()
    dino.classList.remove("jump")
})


// ---------- Machine 5 · Secret Door · "click" + input.value ----------
// When #door-btn is clicked, read what's typed in #door-input (doorInput.value):
//   if it is "nextgen":
//     add the class "open" to #door and show "Welcome in!" in #door-msg
//   otherwise:
//     remove the class "open" and show "Wrong password!" in #door-msg
const doorBtn = document.querySelector("#door-btn");
const doorInput = document.querySelector("#door-input");
const door = document.querySelector("#door");
const doorMsg = document.querySelector("#door-msg");

doorBtn.addEventListener("click", () => {
    if(doorInput.value == "nextgen"){
        door.classList.add("open")
        doorMsg.textContent = "Welcome in!"
    }else{
        door.classList.remove("open")
        doorMsg.textContent = "Wrong password!"
    }
})

// ---------- Bonus · Radar · "mousemove" ----------
// When the mouse moves over #radar:
//   1. #coords shows   x: 40, y: 25   using event.offsetX and event.offsetY
//   2. move #blip there:  blip.style.left = event.offsetX + "px";  (and top with offsetY)
const radar = document.querySelector("#radar");
const blip = document.querySelector("#blip");
const coords = document.querySelector("#coords");

radar.addEventListener("mousemove", (e) => {
    coords.textContent = `x: ${e.offsetX}, y: ${e.offsetY}`
    blip.style.left = e.offsetX + "px"
    blip.style.top = e.offsetY + "px"
})