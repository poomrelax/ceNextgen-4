const rows = document.querySelector("#rows");
const status = document.querySelector("#status");

fetch("anime.json")
  .then((response) => response.json())
  .then((animeList) => {
    
    for(const anime of animeList){
      const tr = document.createElement("tr")
        tr.innerHTML +=  `
        <td><img class="cover" src="${anime.image}" alt="${anime.title}"></td>
        <td class="title">${anime.title}</td>
        <td>${anime.type}</td>
        <td>${anime.episodes}</td>
        <td>${anime.year}</td>
        <td>${anime.studio}</td>`
      rows.append(tr)
    }

    // Step 1 · Look at what we got:

    // Step 2 · Turn the text into object:

    // Step 3 · Show ONE anime as a table row:
    // const tr = document.createElement("tr");
    // tr.innerHTML = `
    //   <td><img class="cover" src="${animeList[0].image}" alt="${animeList[0].title}"></td>
    //   <td class="title">${animeList[0].title}</td>
    //   <td>${animeList[0].type}</td>
    //   <td>${animeList[0].episodes}</td>
    //   <td>${animeList[0].year}</td>
    //   <td>${animeList[0].studio}</td>
    // `;
    // rows.append(tr);

    //   Step 4 put inside a loop and change animeList[0] to anime
    // for (const anime of animeList) { 
    //   ...
    // }
  });