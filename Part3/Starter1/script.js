// Part 3 · S1
// Don't need to type anything here
// WE GO USING DEV CONSOLE(F12)

const title = document.querySelector("#title")
const photo = document.querySelector("#photo")
const link = document.querySelector("#link")
const intro = document.querySelector(".intro")
const lis = document.querySelectorAll("li")
const body = document.querySelector("body")

const name = "poom"
title.textContent = `Hello, I'm ${name}`

intro.innerHTML = `whatt is a <b>${name}</b>`

body.classList.add("dark")
intro.classList.add("highlight")
intro.style.color = '#2100b4'

link.href = "https://poomrelax.in.th"
link.target = "_blank"

photo.src = 'https://res.cloudinary.com/dzce1xeo1/image/upload/v1792850571/giphy_asv3a7.gif'
photo.alt = "this is a image"

setTimeout(() => {
    intro.classList.remove("highlight")
    intro.style.color = '#fff'
}, 4000)

for(let i = 0; i < lis.length; i++){
    lis[i].textContent = `i love ce ${i+1} ${lis[i].textContent}`
}

