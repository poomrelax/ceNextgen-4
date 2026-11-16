window.addEventListener("load", () => {
  const $ = (s) => document.querySelector(s);
  const text = (s) => ($(s) ? $(s).textContent.trim() : "");

  const fire = (el, type, init = {}, Ctor = Event) =>
    el.dispatchEvent(new Ctor(type, { bubbles: true, cancelable: true, ...init }));

  const MACHINES = [
    {
      label: "1 · click: Power toggles .on on #lamp",
      test() {
        const btn = $("#power-btn"), lamp = $("#lamp");
        const before = lamp.classList.contains("on");
        btn.click();
        const first = lamp.classList.contains("on");
        btn.click();
        const second = lamp.classList.contains("on");
        lamp.classList.toggle("on", before);
        if (first === before) return 'Clicking #power-btn did nothing to #lamp. Listen for "click" on powerBtn.';
        if (second !== before) return "It turns on but not off again. Try classList.toggle.";
        return true;
      },
    },
    {
      label: "2 · mouseenter / mouseleave: Ghost hides and comes back",
      test() {
        const ghost = $("#ghost");
        fire(ghost, "mouseover", {}, MouseEvent);
        fire(ghost, "mouseenter", { bubbles: false }, MouseEvent);
        const hid = ghost.classList.contains("hide");
        fire(ghost, "mouseout", {}, MouseEvent);
        fire(ghost, "mouseleave", { bubbles: false }, MouseEvent);
        const back = !ghost.classList.contains("hide");
        ghost.classList.remove("hide");
        if (!hid) return 'Moving onto #ghost should add the class "hide" (event: "mouseenter").';
        if (!back) return 'It hides but never comes back: add a "mouseleave" listener that removes "hide".';
        return true;
      },
    },
    {
      label: "3 · input: Name Tag follows your typing",
      test() {
        const input = $("#name-input");
        const saved = input.value;
        input.value = "Mint";
        fire(input, "input", {}, InputEvent);
        const preview = text("#name-preview");
        input.value = saved;
        fire(input, "input", {}, InputEvent);
        if (preview !== "Mint") return `Typed "Mint" but #name-preview shows "${preview}". Use nameInput.value.`;
        return true;
      },
    },
    {
      label: "4 · keydown / keyup: Dino shows keys, jumps and lands",
      test() {
        const dino = $("#dino"), last = $("#last-key");
        const saved = last.textContent;
        const key = (type, k) => fire(document.body, type, { key: k }, KeyboardEvent);
        key("keydown", "a");
        const shownA = text("#last-key") === "a";
        const noJumpOnA = !dino.classList.contains("jump");
        key("keyup", "a");
        key("keydown", "ArrowUp");
        const jumped = dino.classList.contains("jump");
        key("keyup", "ArrowUp");
        const landed = !dino.classList.contains("jump");
        key("keydown", " ");
        const jumpedSpace = dino.classList.contains("jump");
        key("keyup", " ");
        dino.classList.remove("jump");
        last.textContent = saved;
        if (!shownA) return 'Pressing "a" should show a in #last-key (use event.key).';
        if (!jumped || !jumpedSpace) return 'Space and ArrowUp should add "jump" to #dino.';
        if (!noJumpOnA) return "Only Space and ArrowUp should jump, not every key. Use an if.";
        if (!landed) return 'The dino never lands: on "keyup", remove the class "jump".';
        return true;
      },
    },
    {
      label: "5 · click + input.value: Door opens with nextgen",
      test() {
        const btn = $("#door-btn"), input = $("#door-input"), door = $("#door"), msg = $("#door-msg");
        const saved = [input.value, door.className, msg.textContent];
        input.value = "banana";
        btn.click();
        const wrongClosed = !door.classList.contains("open");
        const wrongMsg = msg.textContent.trim();
        input.value = "nextgen";
        btn.click();
        const opened = door.classList.contains("open");
        const rightMsg = msg.textContent.trim();
        [input.value, door.className, msg.textContent] = saved;
        if (!opened && wrongMsg === "" && rightMsg === "") return 'Clicking #door-btn did nothing. Listen for "click" on doorBtn and read doorInput.value.';
        if (!opened) return 'Typed "nextgen" but #door didn\'t get the class "open".';
        if (!wrongClosed) return "A wrong password opened the door too. Check your if.";
        if (wrongMsg === "" || wrongMsg === rightMsg) return "Show a different message in #door-msg for a wrong password.";
        return true;
      },
    },
  ];

  const results = MACHINES.map((m) => {
    try { return m.test(); } catch (e) { return `Error while testing: ${e.message}`; }
  });
  const passed = results.filter((r) => r === true).length;

  $("#online").textContent = `${passed} / ${MACHINES.length}`;
  $("#progress-bar").style.width = `${(passed / MACHINES.length) * 100}%`;

  const list = $("#missions");
  MACHINES.forEach((m, i) => {
    const li = document.createElement("li");
    const ok = results[i] === true;
    li.className = ok ? "done" : "";
    li.textContent = `${ok ? "✅" : "⬜"} ${m.label}`;
    if (!ok && passed > 0) {
      const hint = document.createElement("span");
      hint.className = "hint";
      hint.textContent = results[i];
      li.append(hint);
    }
    list.append(li);
  });

  let bonusOk = false;
  try {
    const radar = $("#radar"), blip = $("#blip");
    const r = radar.getBoundingClientRect();
    const ev = new MouseEvent("mousemove", { bubbles: true, cancelable: true, clientX: r.left + 4 + 40, clientY: r.top + 4 + 25 });
    const saved = [$("#coords").textContent, blip.style.left, blip.style.top];
    radar.dispatchEvent(ev);
    const shown = text("#coords");
    bonusOk = shown.includes(String(ev.offsetX)) && shown.includes(String(ev.offsetY)) &&
      blip.style.left === `${ev.offsetX}px` && blip.style.top === `${ev.offsetY}px`;
    [$("#coords").textContent, blip.style.left, blip.style.top] = saved;
  } catch (e) { bonusOk = false; }
  $("#bonus").textContent = bonusOk ? "📡 Bonus unlocked: the radar works!" : "📡 Bonus (mousemove): ???";
  $("#bonus").classList.toggle("unlocked", bonusOk);

  if (window.__errors && window.__errors.length) {
    const banner = $("#error-banner");
    banner.textContent = `⚠ script.js stopped at an error: ${window.__errors[0]}. Machines after that line can't work. Open the Console (Ctrl + Shift + J) to see which line.`;
    banner.classList.remove("hidden");
  }

  if (passed === MACHINES.length) {
    document.body.classList.add("all-online");
    $("#online").textContent = `${passed} / ${MACHINES.length} · ARCADE ONLINE ✨`;
  }
});
