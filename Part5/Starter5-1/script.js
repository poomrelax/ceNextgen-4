// 5-1 · Create & remove elements 

const list = document.querySelector("#list");
const input = document.querySelector("#item");
const addBtn = document.querySelector("#add");

// ===== Part A · Create =====

// Step 1 · In the Console first:
//   const li = document.createElement("li");   // 1. create (not on the page yet!)
//   li.textContent = "Pocky";                   // 2. fill it in
//   list.append(li);                            // 3. add it → it appears

addBtn.addEventListener('click', () => {
    const li = document.createElement("li")
    li.textContent = input.value
    input.value = ""
    const btn = document.createElement("button")
    btn.textContent = "Delete"
    btn.addEventListener('click', () => {
        li.remove()
    })
    li.append(btn)
    list.append(li);
})

// Step 2 · Now do the same inside a "click" listener on #add,
//          using the text from the input (input.value)


// Step 3 · Don't add empty items:  if (input.value === "") return;


// ===== Part B · Remove =====

// Step 4 · Create a <button> with the text "Delete"  


// Step 5 · Give it a "click" listener that runs li.remove();

// Step 6 · Put the button inside the li:  li.append(delBtn);