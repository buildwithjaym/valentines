# 💗 Hi Bb — Valentine Surprise Website

A **heartwarming Valentine surprise** crafted with love using pure **HTML + CSS + JavaScript** — no frameworks, no databases.  
It’s designed to feel like a **mini love story**, guiding your special someone through a gentle journey: a sweet introduction, a vault of heartfelt letters, and a final bouquet surprise with fireworks and a gallery.

---

## ✨ What This Is

This isn’t just a “quiz app” — it’s a **romantic experience** that takes your loved one through:

- **A charming entry page** (“Hi Bb…”), with a cute modal interaction
- **A Vault of Love** — 3 love letters that open one by one
- **A Heartfelt Finale** — a beautiful bouquet scene, fireworks, a gallery of memories, and a personal message

All **static and simple** — perfect for deploying on **Vercel** or any static hosting.

---

## 🗺️ Story Flow

1. **`home.html`** — Warm welcome with a sweet introduction and modal check
2. **`vault.html`** — The vault of love letters; tap to reveal each letter with a charming typewriter effect
3. **`final.html`** — The surprise scene: a glowing bouquet, fireworks, a photo/video gallery, and a loving message

---

## 📁 Project Structure

### Pages & Features

#### `home.html` — The Entrance  
*Soft, romantic landing page with a modal prompt to start the journey.*

- Files: `home.html`, `home.css`, `home.js`

---

#### `vault.html` — The Vault of Love  
*Contains 3 love letters. Tap to open each with a typewriter effect.*  
*Unlock the final surprise after reading all letters.*

- Files: `vault.html`, `vault.css`, `vault.js`

---

#### `final.html` — The Surprise Scene  
*Features a glowing bouquet scene. Tap the **pink flower** to reveal:*  
- A heartfelt typed message  
- A gallery of photos and videos  
- Fireworks display & a “More Fireworks” button

- Files: `final.html`, `final.css`, `final.js`

---

## 🛠️ Customization Tips

### Personalize the Love Letters  
Edit the `items[]` array in `vault.js`:

```js
const items = [
  {
    title: "Letter 1 Title",
    preview: "A sweet preview...",
    tag: "From the Heart",
    body: "Your full heartfelt letter..."
  },
  
];