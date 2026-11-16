window.addEventListener("load", async () => {
  const $ = (s) => document.querySelector(s);
  const text = (s) => ($(s) ? $(s).textContent.trim() : "");
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const banner = (msg) => { $("#error-banner").textContent = msg; $("#error-banner").classList.remove("hidden"); };

  $("#score").textContent = "checking…";

  if (location.protocol === "file:") {
    banner("⚠ Open this page with Live Server! When you double-click index.html, fetch() isn't allowed to read my-list.json. In VS Code: right-click index.html → Open with Live Server.");
    $("#score").textContent = "0 / 6";
    return;
  }

  let items;
  try {
    items = await (await fetch("my-list.json")).json();
  } catch (e) {
    banner(`⚠ The checker couldn't read my-list.json (${e.message}). Is the file still next to index.html?`);
    return;
  }

  const snapshot = () => `${document.querySelectorAll("#list-body tr").length}|${text("#count")}`;
  let last = snapshot(), stableFor = 0;
  for (let t = 0; t < 3000 && stableFor < 400; t += 100) {
    await sleep(100);
    const now = snapshot();
    stableFor = now === last ? stableFor + 100 : 0;
    last = now;
  }

  const rows = [...document.querySelectorAll("#list-body tr")];
  const tds = (tr) => [...tr.querySelectorAll("td")];
  const cell = (tr, i) => (tds(tr)[i] ? tds(tr)[i].textContent.trim() : "");
  const isHidden = (tr) => tr.classList.contains("hidden") || getComputedStyle(tr).display === "none";
  const needRows = () => {
    if (rows.length === 0) throw new Error("No rows yet: remove the // in front of the Level 2 loop.");
  };
  const eachRow = (fn) => {
    needRows();
    let matched = 0;
    for (const tr of rows) {
      const a = items.find((x) => cell(tr, 1) === x.title);
      if (!a) continue;
      matched = matched + 1;
      const r = fn(tr, a);
      if (r !== true) return r;
    }
    return matched > 0 || 'No row shows a real anime title. Did you JSON.parse the text? (Looping over text gives one row per LETTER.)';
  };

  const CORE = [
    {
      label: "1 · Parse: #count shows how many anime",
      test() {
        if (text("#count") === `${items.length} anime`) return true;
        const n = parseInt(text("#count"), 10);
        if (n > items.length) return `#count says ${n}: that's the number of LETTERS in the text. Use JSON.parse(text) first.`;
        return `Parse the text (JSON.parse), then put "${items.length} anime" in #count (myList.length).`;
      },
    },
    {
      label: "2 · The table has a row for every anime",
      test() {
        needRows();
        if (rows.length !== items.length) return `Found ${rows.length} rows, expected ${items.length}.`;
        const wrong = rows.findIndex((tr, i) => cell(tr, 1) !== items[i].title);
        return wrong === -1 || `Row ${wrong + 1} should be "${items[wrong].title}" (the title goes in the 2nd cell).`;
      },
    },
    {
      label: "2 · Every row shows its cover picture",
      test: () => eachRow((tr, a) => {
        const img = tr.querySelector("img");
        return (img && img.getAttribute("src") === a.image) || `${a.title}: the first cell needs <img class="cover" src="\${anime.image}">.`;
      }),
    },
    {
      label: "2 · Type and progress (like 12 / 12)",
      test: () => eachRow((tr, a) => {
        if (tds(tr).length < 4) return `Add the type and progress cells (now ${tds(tr).length} cells per row).`;
        if (cell(tr, 2) !== a.type) return `${a.title}: the 3rd cell should be the type "${a.type}".`;
        const want = `${a.progress} / ${a.episodes}`;
        if (cell(tr, 3).replace(/\s/g, "") !== want.replace(/\s/g, "")) return `${a.title}: progress should be "${want}".`;
        return true;
      }),
    },
    {
      label: "2 · Score",
      test: () => eachRow((tr, a) => {
        if (tds(tr).length < 5) return "Add the score cell: <td class=\"score\">${anime.score}</td>";
        const ok = cell(tr, 4) === String(a.score) || (a.score === 0 && cell(tr, 4) === "-");
        return ok || `${a.title}: the 5th cell should be the score ${a.score}.`;
      }),
    },
    {
      label: "3 · Status cell + color bar",
      test: () => eachRow((tr, a) => {
        if (cell(tr, 5).toLowerCase() !== a.status) return `${a.title}: add a last cell <td class="status">\${anime.status}</td>.`;
        if (!tr.classList.contains(a.status)) return `${a.title}: give the row its color with tr.classList.add(anime.status).`;
        return true;
      }),
    },
  ];

  const BONUS = [
    {
      label: 'A · Score shows "-" when it is 0',
      test: () => eachRow((tr, a) => (a.score !== 0 || cell(tr, 4) === "-") || `${a.title} has score 0: show "-" instead.`),
    },
    {
      label: "B · Tabs show only one status",
      test() {
        if (rows.length !== items.length) return "Build all the rows first.";
        const statusOf = (tr) => (items.find((x) => cell(tr, 1) === x.title) || {}).status;
        $("#tab-watching").click();
        const okWatching = rows.every((tr) => isHidden(tr) === (statusOf(tr) !== "watching"));
        $("#tab-planned").click();
        const okPlanned = rows.every((tr) => isHidden(tr) === (statusOf(tr) !== "planned"));
        $("#tab-all").click();
        const allBack = rows.every((tr) => !isHidden(tr));
        if (!okWatching || !okPlanned) return 'A tab should add the class "hidden" to every row of another status.';
        if (!allBack) return "#tab-all should show every row again.";
        return true;
      },
    },
  ];

  const run = (list) => list.map((m) => {
    try { return m.test(); } catch (e) { return e.message; }
  });
  const coreRes = run(CORE);
  const bonusRes = run(BONUS);
  const passed = coreRes.filter((r) => r === true).length;

  $("#score").textContent = `${passed} / ${CORE.length}`;
  $("#progress-bar").style.width = `${(passed / CORE.length) * 100}%`;

  const draw = (listEl, missions, res, showHint) => {
    missions.forEach((m, i) => {
      const li = document.createElement("li");
      const ok = res[i] === true;
      li.className = ok ? "done" : "";
      li.textContent = `${ok ? "✅" : "⬜"} ${m.label}`;
      if (!ok && showHint(i)) {
        const hint = document.createElement("span");
        hint.className = "hint";
        hint.textContent = `Next: ${res[i]}`;
        li.append(hint);
      }
      listEl.append(li);
    });
  };
  const firstFail = coreRes.findIndex((r) => r !== true);
  draw($("#missions"), CORE, coreRes, (i) => i === firstFail);
  draw($("#levelup"), BONUS, bonusRes, () => passed === CORE.length);

  if (window.__errors && window.__errors.length) {
    banner(`⚠ script.js stopped at an error: ${window.__errors[0]}. Open the Console (Ctrl + Shift + J) to see which line.`);
  }

  if (passed === CORE.length) {
    $("#score").textContent = `${passed} / ${CORE.length} · LIST COMPLETE ✨`;
  }
});
