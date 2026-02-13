const $ = (sel) => document.querySelector(sel);

const modal = $("#modal");
const backdrop = $("#backdrop");
const closeBtn = $("#close");
const startBtn = $("#startQuiz");
const nextBtn = $("#nextBtn");
const backBtn = $("#backBtn");
const statusEl = $("#status");

const stepPill = $("#stepPill");
const qTitle = $("#qTitle");
const qText = $("#qText");
const answerArea = $("#answerArea");

const modalCard = document.querySelector(".modal-card");
const mascot = $("#mascot");
const mascotText = $("#mascotText");
const toast = $("#toast");

// Where you’ll redirect after quiz (we’ll build this next)
const NEXT_PAGE = "vault.html"; // placeholder for later

function confettiBurst(n = 80) {
    for (let i = 0; i < n; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.animationDuration = (2.0 + Math.random() * 2.6) + "s";
        c.style.transform = `rotate(${Math.random() * 360}deg)`;
        c.style.background = `hsl(${Math.floor(Math.random() * 360)} 90% 70%)`;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 5200);
    }
}
function mascotSet(state, text) {
    mascot.classList.remove("happy", "sad");
    if (state) mascot.classList.add(state);
    if (text) mascotText.textContent = text;

    // auto return to neutral
    clearTimeout(mascot._t);
    mascot._t = setTimeout(() => {
        mascot.classList.remove("happy", "sad");
        mascotText.textContent = "Bb 🥺💗";
    }, 900);
}

function wiggleModal() {
    modalCard.classList.remove("wiggle");
    void modalCard.offsetWidth;
    modalCard.classList.add("wiggle");
}

function showToast() {
    toast.classList.remove("show");
    void toast.offsetWidth;
    toast.classList.add("show");
}
const quiz = [
    {
        title: "When did our relationship start?",
        text: "Type the date exactly like this: Month Day, Year",
        type: "text",

        validate: (v) => normalize(v) === normalize("March 29, 2025"),
    },
    {
        title: "What’s our favorite color?",
        text: "Pick the best answer 💗💙",
        type: "choice",
        choices: ["Blue and Pink", "Green", "Just Blue", "Just Pink"],
        validate: (v) => {
            const n = normalize(v);
            return n === normalize("Blue and Pink");
        },
    },
    {
        title: "8 means?",
        text: "One word. Tiny hint: forever ♾️",
        type: "text",
        validate: (v) => normalize(v) === normalize("Infinity"),
    },
    {
        title: "My favorite song?",
        text: "Clue: its a color too 😉",
        type: "text",
        validate: (v) => normalize(v) === normalize("Blue"),
    },
];

let step = 0;
let answers = new Array(quiz.length).fill("");
let selectedChoice = null;

function normalize(s) {
    return String(s || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}

function openModal() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    step = 0;
    answers.fill("");
    renderStep();
}

function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    statusEl.textContent = "";
}

function renderStep() {
    statusEl.textContent = "";
    selectedChoice = null;

    const q = quiz[step];
    stepPill.textContent = `Question ${step + 1}/${quiz.length}`;
    qTitle.textContent = q.title;
    qText.textContent = q.text;

    backBtn.disabled = step === 0;
    nextBtn.textContent = (step === quiz.length - 1) ? "Finish 💗" : "Next";

    answerArea.innerHTML = "";

    if (q.type === "text") {
        const input = document.createElement("input");
        input.className = "input";
        input.placeholder = "Type your answer…";
        input.value = answers[step] || "";
        input.addEventListener("input", () => {
            answers[step] = input.value;
        });
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") handleNext();
        });
        answerArea.appendChild(input);
        setTimeout(() => input.focus(), 60);
    }

    if (q.type === "choice") {
        q.choices.forEach((c) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "choice";
            btn.textContent = c;

            if (answers[step] && normalize(answers[step]) === normalize(c)) {
                btn.classList.add("selected");
                selectedChoice = c;
            }

            btn.addEventListener("click", () => {
                answers[step] = c;
                selectedChoice = c;

                Array.from(answerArea.querySelectorAll(".choice")).forEach(x => x.classList.remove("selected"));
                btn.classList.add("selected");
            });

            answerArea.appendChild(btn);
        });
    }
}

function handleNext() {
    const q = quiz[step];
    const val = answers[step];

    if (!val || normalize(val).length === 0) {
        statusEl.textContent = "Answer it first, Bb 🥺";
        return;
    }

    const ok = q.validate(val);
    if (!ok) {
        statusEl.textContent = "Hehe close… try again bb naku 💗";
        return;
    }


    confettiBurst(30);

    if (step < quiz.length - 1) {
        step++;
        renderStep();
        return;
    }


    statusEl.textContent = "Perfect. Welcome, Bb 💙";
    confettiBurst(120);


    setTimeout(() => {
        window.location.href = NEXT_PAGE;
    }, 700);
}


startBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

backBtn.addEventListener("click", () => {
    if (step === 0) return;
    step--;
    renderStep();
});

nextBtn.addEventListener("click", handleNext);

document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("show")) return;
    if (e.key === "Escape") closeModal();
});
