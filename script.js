const PASSCODE = "1229";

const $ = (sel) => document.querySelector(sel);

let pin = "";
const dots = Array.from(document.querySelectorAll(".dot"));
const statusEl = $("#status");
const hintEl = $("#hint");
const card = $("#card");

const success = $("#success");
const backBtn = $("#back");
const unlockBtn = $("#unlock");

function updateDots() {
    dots.forEach((d, i) => d.classList.toggle("filled", i < pin.length));
}

function setStatus(msg) {
    statusEl.textContent = msg;
}

function shake() {
    card.classList.remove("shake");
    void card.offsetWidth;
    card.classList.add("shake");
}

function pulse() {
    card.classList.remove("pulse");
    void card.offsetWidth;
    card.classList.add("pulse");
}

function confettiBurst(n = 80) {
    for (let i = 0; i < n; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.animationDuration = (2.0 + Math.random() * 2.4) + "s";
        c.style.transform = `rotate(${Math.random() * 360}deg)`;
        c.style.background = `hsl(${Math.floor(Math.random() * 360)} 90% 70%)`;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 5200);
    }
}

function enterDigit(d) {
    if (pin.length >= 4) return;
    pin += d;
    updateDots();
    setStatus("");
}

function delDigit() {
    pin = pin.slice(0, -1);
    updateDots();
}

function clearPin() {
    pin = "";
    updateDots();
}

function lock() {
    success.hidden = true;
    card.hidden = false;
    hintEl.textContent = "Hint: Our birthdate ✨";
    setStatus("");
    clearPin();
}

function unlock() {

    confettiBurst(90);
    setTimeout(() => {
        window.location.href = "home.html";
    }, 520);
}


function tryUnlock() {
    if (pin.length === 0) return setStatus("Type the number, bb naku✨");

    if (pin === PASSCODE) {
        setStatus("Unlocked 💙");
        pulse();
        confettiBurst(60);
        setTimeout(() => {
            unlock();
            clearPin();
        }, 420);
    } else {
        setStatus("Not quite — try again 💗");
        hintEl.textContent = "Hint: it’s our best number 😉";
        shake();
        setTimeout(clearPin, 220);
    }
}

// Keypad clicks
document.querySelectorAll(".key").forEach(btn => {
    btn.addEventListener("click", () => {
        const k = btn.dataset.key;
        if (k === "del") return delDigit();
        if (k === "clear") return clearPin();
        enterDigit(k);
    });
});

// Buttons
unlockBtn.addEventListener("click", tryUnlock);
backBtn.addEventListener("click", lock);

// Keyboard support
document.addEventListener("keydown", (e) => {
    if (card.hidden) return;

    if (e.key >= "0" && e.key <= "9") enterDigit(e.key);
    if (e.key === "Backspace") delDigit();
    if (e.key === "Escape") clearPin();
    if (e.key === "Enter") tryUnlock();
});

// init
updateDots();
setStatus("");
