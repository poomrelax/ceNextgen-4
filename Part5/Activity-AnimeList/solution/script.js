const listBody = document.querySelector("#list-body");
const count = document.querySelector("#count");

fetch("my-list.json")
  .then((response) => response.text())
  .then((text) => {

    // ---------- Level 1 ----------
    const myList = JSON.parse(text);
    count.textContent = `${myList.length} anime`;

    // ---------- Level 2 + 3 (+ Bonus A) ----------
    for (const anime of myList) {
      // Bonus A
      let score = anime.score;
      if (anime.score === 0) {
        score = "-";
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img class="cover" src="${anime.image}" alt="${anime.title}"></td>
        <td class="title">${anime.title}</td>
        <td>${anime.type}</td>
        <td>${anime.progress} / ${anime.episodes}</td>
        <td class="score">${score}</td>
        <td class="status">${anime.status}</td>
      `;
      tr.classList.add(anime.status);   // Level 3
      listBody.append(tr);
    }

    // ---------- Bonus B ----------
    function showOnly(status) {
      for (const row of listBody.querySelectorAll("tr")) {
        if (status === "all" || row.classList.contains(status)) {
          row.classList.remove("hidden");
        } else {
          row.classList.add("hidden");
        }
      }
    }

    document.querySelector("#tab-all").addEventListener("click", () => showOnly("all"));
    document.querySelector("#tab-watching").addEventListener("click", () => showOnly("watching"));
    document.querySelector("#tab-completed").addEventListener("click", () => showOnly("completed"));
    document.querySelector("#tab-planned").addEventListener("click", () => showOnly("planned"));
  });
