const $ = (sel) => document.querySelector(sel);

const items = [
    {
        id: "assurance",
        pill: "Assurance",
        title: "Open when you need to feel loved, Bb 💗",
        preview: "A reminder you never have to earn my love.",
        tag: "💗 Assurance",
        body:
            `Bb,

I love you — not just when things are easy,
not just when you’re smiling,
not just when everything is perfect.

I love you when you’re tired.
I love you when you’re quiet.
I love you when you’re figuring things out.

You are safe with me.
You are chosen by me.
Always.`
    },
    {
        id: "encouragement",
        pill: "Encouragement",
        title: "Open when you doubt yourself, Bb 💙",
        preview: "A soft push, a warm hand — I believe in you.",
        tag: "💙 Encouragement",
        body:
            `Bb,

If your mind is being unfair to you today, listen to me:

You are capable.
You are growing.
You are doing better than you think.

I’m proud of you — not only for what you achieve,
but for how you keep showing up even on hard days.

I believe in you.
And I’m right here, cheering for you.`
    },
    {
        id: "future",
        pill: "Our Future",
        title: "Open when you worry about tomorrow 🌙",
        preview: "A promise: we’ll build something good, together.",
        tag: "🌙 Our Future",
        body:
            `Bb,

Our future will be good.
Not because life is always easy,
but because we will keep choosing each other.

I’ll be more gentle.
More consistent.
More present.

We’ll grow, we’ll learn, we’ll laugh a lot —
and I’ll keep loving you in a way that feels safe.

I’m excited for our future, Bb.
I really am.`
    }
];

const cardsEl = $("#cards");
const resetBtn = $("#resetBtn");
const progressLabel = $("#progressLabel");
const fill = $("#fill");
const finalBtn = $("#finalBtn");
const tinyNote = $("#tinyNote");

// modal
const modal = $("#modal");
const backdrop = $("#backdrop");
const closeBtn = $("#close");
const modalCard = $("#modalCard");
const nextBtn = $("#nextBtn");
const tag = $("#tag");
const lt = $("#lt");
const ls = $("#ls");
const lb = $("#lb");

let opened = new Set();
let currentIndex = 0;

/* ===== Confetti (subtle) ===== */
function confettiBurst(n = 40) {
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

/* ===== Typewriter ===== */
let typingToken = 0;
function typeInto(el, text, speedMs = 75) {
    typingToken++;
    const token = typingToken;
    el.textContent = "";
    let i = 0;
    function tick() {
        if (token !== typingToken) return;
        if (i <= text.length) {
            el.textContent = text.slice(0, i);
            i++;
            const jitter = (i % 12 === 0) ? 40 : 0;
            setTimeout(tick, speedMs + jitter);
        }
    }
    tick();
}

/* ===== UI ===== */
function render() {
    cardsEl.innerHTML = "";

    items.forEach((it, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "card" + (opened.has(it.id) ? " opened" : "");
        btn.innerHTML = `
      <div class="shimmer"></div>
      <div class="head">
        <strong>${it.pill}</strong>
        <span class="pill">${opened.has(it.id) ? "Opened ✓" : "Tap to open"}</span>
      </div>
      <h3>${it.title}</h3>
      <p>${it.preview}</p>
    `;
        btn.addEventListener("click", () => openLetter(idx));
        cardsEl.appendChild(btn);
    });

    const count = opened.size;
    progressLabel.textContent = `${count}/${items.length} opened`;
    fill.style.width = `${(count / items.length) * 100}%`;
    //Add here the count if how many cards i will add
    if (count === 0) tinyNote.textContent = "A little love, one tap at a time.";
    if (count === 1) tinyNote.textContent = "You’re doing great, Bb 🥺💗";
    if (count === 2) tinyNote.textContent = "One more… then the surprise 🌷";
    if (count === 3) tinyNote.textContent = "Okay… ready? 💙";

    finalBtn.disabled = count !== items.length;
}

/* ===== Modal flow ===== */
function openModal() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}
function wiggle() {
    modalCard.classList.remove("wiggle");
    void modalCard.offsetWidth;
    modalCard.classList.add("wiggle");
}

function openLetter(idx) {
    currentIndex = idx;
    const it = items[idx];

    opened.add(it.id);
    render();

    tag.textContent = it.tag;
    lt.textContent = it.title;
    ls.textContent = "For Bb.";
    typeInto(lb, it.body, 75);

    openModal();
    confettiBurst(22);
}

function openNext() {
    const unopenedIndex = items.findIndex(x => !opened.has(x.id));
    if (unopenedIndex !== -1) return openLetter(unopenedIndex);
    return openLetter((currentIndex + 1) % items.length);
}

/* ===== Events ===== */
resetBtn.addEventListener("click", () => {
    opened = new Set();
    render();
    confettiBurst(18);
});

finalBtn.addEventListener("click", () => {
    window.location.href = "final.html";
});


closeBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);
nextBtn.addEventListener("click", openNext);
document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("show")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "Enter") openNext();
});

/* init */
render();
