# DMS 2 DD Calculator

A simple tool to convert **Degrees–Minutes–Seconds (DMS)** coordinates to **Decimal Degrees (DD)** and back. Visit the live demo at [https://sounny.github.io/DMS2DDCalculator/](https://sounny.github.io/DMS2DDCalculator/).

---

## Table of Contents

1. [Why This Tool](#why-this-tool)
2. [Features](#features)
3. [Quick Start](#quick-start)
4. [Project Layout](#project-layout)
5. [Scripts](#scripts)
6. [Tech Stack](#tech-stack)
7. [Roadmap](#roadmap)
8. [Contribute](#contribute)
9. [License](#license)

---

## Why This Tool

Maps in books often show locations in DMS format, while most GIS software expects DD. Mixing the two can lead to misaligned layers or incorrect joins. This site demonstrates the conversion math and updates a map in real time so students can see how it works.

---

## Features

* **Two-way converter** – DMS → DD and DD → DMS
* **Live math panel** – updates the formula `DD = degrees + minutes/60 + seconds/3600` as you type
* **Leaflet map** – shows the point on an OpenStreetMap base layer with an optional "Use my location" button
* **Practice quiz** – five random questions with an instant score tracker
* **Client-only** – works offline once cached, no server component
* **Accessible design** – keyboard-friendly controls and a high contrast toggle

---

## Quick Start

```bash
# 1. Clone
 git clone https://github.com/YOUR_NAME/DMS2DDCalculator.git
 cd DMS2DDCalculator

# 2. Serve
# Any static server works. Example with Node:
 npx serve .
# or Python:
 python -m http.server 8000
```

Open `http://localhost:8000` in your browser to see the converter and map.

---

## Project Layout

```
DMS2DDCalculator/
│
├─ index.html        # Main page
├─ css/
│   └─ main.css      # Styles
│
├─ js/
│   ├─ app.js        # Input logic + math
│   ├─ map.js        # Leaflet setup
│   └─ quiz.js       # Practice mode
│
└─ assets/
    └─ img/          # Icons and screenshots
```

---

## Scripts

| Task         | Command                   |
| ------------ | ------------------------- |
| Start server | `npx serve .`             |
| Lint JS      | `npm run lint` (optional) |
| Minify files | `npm run build`           |

---

## Tech Stack

| Layer  | Choice               | Note           |
| ------ | -------------------- | -------------- |
| Markup | **HTML5**            | One page       |
| Style  | **CSS3**             | Flexbox + Grid |
| Logic  | **Vanilla JS (ES6)** | No build tools |
| Map    | **Leaflet 1.9+**     | OSM tiles      |
| Icons  | Inline SVG           | Fast load      |

---

## Roadmap

* Add UTM and MGRS tabs
* Provide REST-like query in URL (`?lat=...&lon=...`)
* Save last ten conversions in `localStorage`
* Switch to Service Worker for full offline mode

---

## Contribute

1. Fork the repo.
2. Create a branch: `git checkout -b feature-name`.
3. Commit: `git commit -m "Add feature"`.
4. Push: `git push origin feature-name`.
5. Open a pull request.

Please keep code simple and use clear names. Run the linter before pushing.

---

## License

This project is open source under the MIT License.
