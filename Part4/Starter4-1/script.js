// 4-1 · My first event 

// 1 · Select the button and the message (querySelector)

const btn = document.getElementById('btn')
const msg = document.getElementById('msg')

// 2 · Listen for "click" and log to the Console
//   btn.addEventListener("click", () => {
//     console.log("Clicked!");
//   });

let count = 0
btn.addEventListener('click', () => {
    console.log("Clicked!");
    ++count
    msg.innerHTML = `You clicked!<br>count: ${count}`
    console.log(count)
})


// 3 · Change the page instead: put "You clicked!" in #msg


// 4 · Count the clicks with a variable:  Clicked 3 times
