// final.js

(() => {
    const $ = (sel) => document.querySelector(sel);

    $("#logoutBtn")?.addEventListener("click", () => {
        window.location.href = "vault.html";
    });


    const modal = $("#modal");
    const modalCard = $("#modalCard");
    const closeBtn = $("#close");
    const closeBtn2 = $("#close2");
    const backdrop = $("#backdrop");
    const galleryEl = $("#gallery");
    const modalMsg = $("#modalMsg");

    function openModal() {
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        wiggle(modalCard);
    }
    function closeModal() {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
    }

    closeBtn?.addEventListener("click", closeModal);
    closeBtn2?.addEventListener("click", closeModal);
    backdrop?.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("show")) return;
        if (e.key === "Escape") closeModal();
    });

    function wiggle(el) {
        if (!el) return;
        el.style.animation = "none";

        void el.offsetWidth;
        el.style.animation = "pop .22s ease both";
    }


    const message =
        `Hi, Bb…

I know na lately that we've been having a lot of misunderstanding and tampuhan sa isat-isa especially your selosa-mode.
But, don't worry bb, I will always choose you. The time was so fast that even me couldn't imagine that I was love, and
I love...you. Today, would be not just an ordinary celebration of hearts or love but somehow its a celebration of us who 
still strong enough to hold on for each other. I may not be the perfect "Man" but I'll assure you I will be the unique one
and unforgettable. 

Happy Valentines Day, Bb naku  💗💙.

Mwuaaaaaaaa 💗💙
Mwuaaaaaaaa 💙💗
Mwuaaaaaaaa 💗💙
Mwuaaaaaaaa 💙💗
Mwuaaaaaaaa 💗💙
Mwuaaaaaaaa 💙💗
Mwuaaaaaaaa 💗💙
Mwuaaaaaaaa 💙💗

Iloveyouuuuuuuu 🤍

I choose you, Bb May-May. 💗
Happy Valentines Day po bb.

`;


    let typingToken = 0;
    function typeInto(el, text, baseSpeedMs = 28) {
        typingToken++;
        const token = typingToken;
        el.textContent = "";
        let i = 0;

        function delayFor(ch) {
            if (ch === "\n") return baseSpeedMs + 140;
            if (ch === ",") return baseSpeedMs + 110;
            if (ch === "." || ch === "!" || ch === "?") return baseSpeedMs + 120;
            if (ch === "—") return baseSpeedMs + 140;
            const jitter = (i % 9 === 0) ? 18 : 0;
            return baseSpeedMs + jitter;
        }

        function tick() {
            if (token !== typingToken) return;
            if (i <= text.length) {
                el.textContent = text.slice(0, i);
                const ch = text[i] || "";
                i++;
                setTimeout(tick, delayFor(ch));
            }
        }
        tick();
    }

    //  GALLERY ASSETS 

    const galleryItems = [
        { type: "image", src: "assets/first.jpeg", label: "First Kiss" },
        { type: "image", src: "assets/brown.jpg", label: "Cutie 💗" },
        { type: "image", src: "assets/renzie.jpg", label: "With Aw-aw" },
        { type: "image", src: "assets/peace.jpeg", label: "First kita in the Library" },
        { type: "image", src: "assets/dec.jpg", label: "Sakpan Moments" },
        { type: "image", src: "assets/20.jpg", label: "Jolibee 2025" },
        { type: "image", src: "assets/hugger.jpeg", label: "Photoshoot" },
        { type: "image", src: "assets/mubarak.jpg", label: "Date with my baby" },
        { type: "image", src: "assets/intrams.jpeg", label: "First Concert with You" },
        { type: "image", src: "assets/heart.jpeg", label: "2 heart, One Love💗💙" },
        { type: "image", src: "assets/luya.jpeg", label: "Katulgon yet Cute" },
        { type: "video", src: "assets/video.mp4", label: "Video Song 🎥" },
    ];

    function renderGallery() {
        if (!galleryEl) return;
        galleryEl.innerHTML = "";

        for (const item of galleryItems) {
            const tile = document.createElement("div");
            tile.className = "tile";

            if (item.type === "image") {
                const img = document.createElement("img");
                img.src = item.src;
                img.alt = item.label || "Photo";
                img.loading = "lazy";
                tile.appendChild(img);
            } else {
                const vid = document.createElement("video");
                vid.src = item.src;
                vid.controls = true;
                vid.playsInline = true;
                vid.preload = "metadata";
                tile.appendChild(vid);
            }

            const label = document.createElement("div");
            label.className = "label";
            label.textContent = item.label || "";
            tile.appendChild(label);

            galleryEl.appendChild(tile);
        }
    }


    $("#centerFlower")?.addEventListener("click", () => {
        renderGallery();
        openModal();
        typeInto(modalMsg, message, 28);

        burst(window.innerWidth * 0.52, window.innerHeight * 0.30, 120, "heart");
    });

    const canvas = $("#fx");
    const ctx = canvas.getContext("2d", { alpha: true });

    const isSmall = window.matchMedia("(max-width: 680px)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let softMode = prefersReduced;
    let timer = null;

    function resize() {
        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener("resize", resize);
    resize();

    function rand(min, max) { return min + Math.random() * (max - min); }
    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    const particles = [];

    function addParticle(x, y, vx, vy, hue, size, life, grav = 0.03, drag = 0.986) {
        particles.push({ x, y, vx, vy, hue, size, life, age: 0, grav, drag });
    }


    function heartPoints(n = 190) {
        const pts = [];
        for (let i = 0; i < n; i++) {
            const t = (i / n) * Math.PI * 2;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            pts.push({ x: x / 18, y: -y / 18 });
        }
        return pts;
    }
    function iceCreamPoints(n = 240) {
        const pts = [];
        const scoopCount = Math.floor(n * 0.55);
        const coneCount = n - scoopCount;

        for (let i = 0; i < scoopCount; i++) {
            const a = (i / scoopCount) * Math.PI * 2;
            const r = 0.42 + Math.random() * 0.03;
            pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r - 0.25 });
        }

        for (let i = 0; i < coneCount; i++) {
            const u = i / coneCount;
            const left = { x: -0.32, y: 0.05 };
            const right = { x: 0.32, y: 0.05 };
            const tip = { x: 0.00, y: 0.85 };

            const edgePick = Math.random();
            let p;
            if (edgePick < 0.33) p = { x: left.x * (1 - u) + tip.x * u, y: left.y * (1 - u) + tip.y * u };
            else if (edgePick < 0.66) p = { x: right.x * (1 - u) + tip.x * u, y: right.y * (1 - u) + tip.y * u };
            else p = { x: left.x * (1 - u) + right.x * u, y: left.y * (1 - u) + right.y * u };

            const jitter = 0.04;
            pts.push({ x: p.x + rand(-jitter, jitter), y: p.y + rand(-jitter, jitter) });
        }
        return pts;
    }
    function classicPoints(n = 220) {
        const pts = [];
        for (let i = 0; i < n; i++) {
            const a = (i / n) * Math.PI * 2;
            const r = 0.35 + Math.random() * 0.55;
            pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
        }
        return pts;
    }

    const HEART = heartPoints(190);
    const ICE = iceCreamPoints(240);

    function shapeBurst(x, y, pts, scale, hueRange) {
        const T = softMode ? 46 : 34;
        const limit = isSmall ? Math.floor(pts.length * 0.72) : pts.length;

        for (let i = 0; i < limit; i++) {
            const p = pts[i];
            const tx = p.x * scale;
            const ty = p.y * scale;

            const vx = tx / T + rand(-0.10, 0.10);
            const vy = ty / T + rand(-0.10, 0.10);

            const hue = rand(hueRange[0], hueRange[1]);
            const size = rand(1.2, 2.8);
            const life = rand(55, 98);

            addParticle(x, y, vx, vy, hue, size, life, rand(0.018, 0.05), rand(0.985, 0.993));
        }
    }

    function burst(x, y, count = 120, kind = "classic") {
        if (kind === "heart") {
            shapeBurst(x, y, HEART, rand(210, 270), [320, 350]);
            return;
        }
        if (kind === "ice") {
            shapeBurst(x, y, ICE, rand(220, 280), (Math.random() < 0.5 ? [205, 230] : [320, 350]));
            shapeBurst(x, y, classicPoints(isSmall ? 40 : 60), rand(60, 90), [0, 360]); // sprinkles
            return;
        }


        shapeBurst(x, y, classicPoints(isSmall ? 160 : 240), rand(160, 240), pick([[320, 350], [205, 230], [290, 320]]));
        setTimeout(() => shapeBurst(x, y, classicPoints(isSmall ? 120 : 160), rand(110, 170), pick([[205, 230], [320, 350]])), 80);
    }

    function draw() {
        ctx.fillStyle = softMode ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.12)";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.age++;
            p.vx *= p.drag;
            p.vy = p.vy * p.drag + p.grav;
            p.x += p.vx;
            p.y += p.vy;

            const t = 1 - (p.age / p.life);
            if (t <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.globalAlpha = Math.max(0, t);
            ctx.fillStyle = `hsla(${p.hue} 95% 70% / ${t})`;
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }
    draw();

    function spawnRandom() {
        const x = rand(window.innerWidth * 0.15, window.innerWidth * 0.85);
        const y = rand(window.innerHeight * 0.10, window.innerHeight * 0.45);
        const r = Math.random();
        if (r < 0.34) burst(x, y, 120, "heart");
        else if (r < 0.62) burst(x, y, 120, "ice");
        else burst(x, y, 140, "classic");
    }

    function startShow() {
        if (timer) clearInterval(timer);
        const base = softMode ? 520 : 360;
        const interval = isSmall ? Math.round(base * 1.25) : base;
        timer = setInterval(spawnRandom, interval);
    }
    startShow();


    (() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight * 0.22;
        burst(cx, cy, 160, "classic");
        setTimeout(() => burst(cx * 0.55, cy * 1.25, 140, "heart"), 220);
        setTimeout(() => burst(cx * 1.45, cy * 1.25, 140, "ice"), 520);
        setTimeout(() => burst(cx, cy * 1.55, 160, "classic"), 880);
    })();


    $("#moreFx")?.addEventListener("click", () => {
        for (let i = 0; i < 4; i++) {
            setTimeout(() => spawnRandom(), i * 140);
        }
    });

    window.addEventListener("click", (e) => {
        if (e.target && (e.target.tagName === "BUTTON" || e.target.closest("button"))) return;
        const kind = Math.random() < 0.5 ? "heart" : "classic";
        burst(e.clientX, e.clientY, 120, kind);
    });
})();
