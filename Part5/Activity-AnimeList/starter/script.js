// =====================================================
// RULE: don't touch index.html, style.css or my-list.json. Write everything here.
// Open the page with Live Server. The "List check" panel shows your progress.
//
// Tip: open my-list.json in VS Code first. It's an ARRAY [ ] of OBJECTS { }.
//      Each object is one anime: title, image, type, episodes, progress, score, status
// =====================================================

const listBody = document.querySelector("#list-body");
const count = document.querySelector("#count");
const tabWatching = document.querySelector("#tab-watching");

fetch("my-list.json")
  .then((response) => response.text())
  .then((text) => {
    // ---------- Level 1 · Parse ----------
    // 1. Turn the text into an array:   const myList = JSON.parse(text);
    // 2. Show how many anime in #count, like:   12 anime   (myList.length)
    const myList = JSON.parse(text);
    count.textContent = `${myList.length} anime`;
    // console.log(myList)
    // ---------- Level 2 · One row per anime ----------
    // Remove the // in front of the loop below. You'll see covers and titles appear
    // Then add 3 more <td> inside the `...`:
    //   type                    → ${anime.type}
    //   progress, like 12 / 12  → ${anime.progress} / ${anime.episodes}
    //   score                   → <td class="score">${anime.score}</td>
    //
    for (const anime of myList) {
      const tr = document.createElement("tr");
      tr.id = "item"
      tr.innerHTML = `
        <td id=""><img class="cover" src="${anime.image}" alt="${anime.title}"></td>
        <td id="" class="title">${anime.title}</td>
        <td id="">${anime.type}</td>
        <td id="">${anime.progress} / ${anime.episodes}</td>
        <td id="" class="score">${anime.score <= 0 ? "-" : anime.score}</td>
        <td id="" class="status">${anime.status}</td>
      `;
      tr.classList.add(anime.status);
      listBody.append(tr);
    }
});

tabWatching.addEventListener('click', () => {
  const items = document.querySelectorAll("#item");
  for (const t of items) {
    if(!t.classList.contains("watching")){
      t.classList.add("hidden")
    }
  }
})
    // ---------- Level 3 · Status ----------
    // Inside the loop:
    //   1. add one more cell at the end:   <td class="status">${anime.status}</td>
    //   2. give the row a color:          tr.classList.add(anime.status);

    // ---------- Bonus (if you finish early) ----------
    // A · Score "-": when anime.score is 0, show "-" instead of 0.
    //
    //
    // B · Tabs: clicking #tab-watching hides (class "hidden") every row that isn't "watching".
    //     Same for #tab-completed and #tab-planned. #tab-all shows every row again.
    //     Tip: row.classList.contains("watching") tells you a row's status.