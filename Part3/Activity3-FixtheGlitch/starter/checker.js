(() => {
  const $ = (s) => document.querySelector(s);
  const text = (s) => ($(s) ? $(s).textContent.trim() : "");
  const pick = (getter, fallback) => { try { return getter(); } catch (e) { return fallback; } };

  const T = pick(() => trainer, { hp: 120, atk: 85, spd: 95 });
  const TEAM = pick(() => team, [{ name: "Pikachu" }, { name: "Sylveon" }, { name: "Gyarados" }]);

  const MISSIONS = [
    { lv: "Level 1", label: "Title says Trainer Card",
      ok: () => text("#title").toLowerCase() === "trainer card" },
    { lv: "Level 1", label: "Your nickname is in #trainer-name",
      ok: () => text("#trainer-name") !== "" && text("#trainer-name") !== "???" },
    { lv: "Level 1", label: "#motto has a real motto",
      ok: () => text("#motto") !== "" && !text("#motto").includes("l0ad1ng") },

    { lv: "Level 2", label: 'Class "glitch" removed from #card',
      ok: () => !$("#card").classList.contains("glitch") },
    { lv: "Level 2", label: '#trainer-name has class "highlight"',
      ok: () => $("#trainer-name").classList.contains("highlight") },
    { lv: "Level 2", label: "#motto has a new color (style.color)",
      ok: () => $("#motto").style.color !== "" },

    { lv: "Level 3", label: "#avatar shows avatar.svg",
      ok: () => ($("#avatar").getAttribute("src") || "").endsWith("avatar.svg") },
    { lv: "Level 3", label: "#avatar has a real alt text",
      ok: () => { const a = ($("#avatar").getAttribute("alt") || "").trim(); return a !== "" && a !== "???"; } },
    { lv: "Level 3", label: "#link goes to a real website with new text",
      ok: () => /^https?:\/\/.+/.test($("#link").getAttribute("href") || "") && text("#link") !== "" && !text("#link").includes("br0ken") },

    { lv: "Level 4", label: "HP, ATK and SPD come from the trainer object",
      ok: () => text("#hp") === String(T.hp) && text("#atk") === String(T.atk) && text("#spd") === String(T.spd) },
    { lv: "Level 4", label: 'Every .badge has class "shiny"',
      ok: () => { const b = document.querySelectorAll(".badge"); return b.length > 0 && [...b].every((x) => x.classList.contains("shiny")); } },

    { lv: "Boss", label: "#team lists every Pokémon from the team array",
      ok: () => {
        const items = document.querySelectorAll("#team li");
        return items.length === TEAM.length && TEAM.every((p, i) => items[i].textContent.includes(p.name));
      } },
  ];

  const results = MISSIONS.map((m) => { try { return !!m.ok(); } catch (e) { return false; } });
  const passed = results.filter(Boolean).length;
  const glitch = Math.round(100 - (passed / MISSIONS.length) * 100);

  $("#glitch-percent").textContent = `${glitch}%`;
  $("#progress-bar").style.width = `${(passed / MISSIONS.length) * 100}%`;

  const list = $("#missions");
  MISSIONS.forEach((m, i) => {
    const li = document.createElement("li");
    li.className = results[i] ? "done" : "";
    li.textContent = `${results[i] ? "✅" : "⬜"} ${m.lv}: ${m.label}`;
    list.append(li);
  });

  let bonusOk = false;
  try {
    const btn = $("#night-btn");
    const before = document.body.classList.contains("night");
    btn.click();
    const after = document.body.classList.contains("night");
    bonusOk = before !== after;
    if (after !== before) btn.click();
    if (document.body.classList.contains("night") !== before) document.body.classList.toggle("night", before);
  } catch (e) { bonusOk = false; }
  $("#bonus").textContent = bonusOk ? "🌙 Secret bonus unlocked: night mode works!" : "🌙 Secret bonus: ???";
  $("#bonus").classList.toggle("unlocked", bonusOk);

  if (window.__errors && window.__errors.length) {
    const banner = $("#error-banner");
    banner.textContent = `⚠ script.js stopped at an error: ${window.__errors[0]}. Open the Console (Ctrl + Shift + J) to see which line.`;
    banner.classList.remove("hidden");
  }

  if (passed === MISSIONS.length) {
    document.body.classList.add("restored");
    $("#glitch-percent").textContent = "0% · SYSTEM RESTORED ✨";
  }
})();
