# Sport Standings App

🔗 **Live Demo:** [https://sport-standings-app.vercel.app/](https://sport-standings-app.vercel.app/)

A sports tournament tracker for football, basketball, and tennis, with features to add teams/players, enter match results, and display an automatically updated standings table.

## Features

-   Add teams/players (start at **0 points**)
-   Each team/player can play only once against any other
-   **Scoring system**:
    -   Win: **3 pts**
    -   Draw: **1 pt**
    -   Loss: **0 pts**
-   Standings table auto-updates and sorts by points
-   Table shows: Matches Played (P/M), Wins (W), Draws (D), Losses (L), Points (Pts)
-   Data persists after page refresh (`localStorage`)

---

## Tech Stack

-   **React + TypeScript**
-   **Vite**
-   **SCSS**
-   **ESLint + Prettier**

---

## Project Structure

```
sport-standings-app/
├─ public/
├─ src/
│  ├─ App.tsx
│  ├─ assets/
│  ├─ components/
│  │  ├─ PageHeader/
│  │  ├─ TeamScorePanel/
│  │  ├─ MatchResults/
│  │  └─ ui/
│  │     └─ Table/
│  ├─ data/
│  │  └─ data.ts
│  ├─ hooks/
│  │  └─ useFormState.ts
│  ├─ pages/
│  │  ├─ Football/
│  │  │  ├─ FootballPage.tsx
│  │  │  └─ useFootballLogic.ts
│  │  ├─ Basketball/
│  │  │  ├─ BasketballPage.tsx
│  │  │  └─ useBasketBallLogic.ts
│  │  └─ Tennis/
│  │     ├─ TennisPage.tsx
│  │     └─ useTennisLogic.ts
│  ├─ scss/
│  │  ├─ main.scss
│  │  └─ abstracts|base|utils/...
│  └─ utils/
│     ├─ matchId.ts
│     ├─ options.ts
│     ├─ points.ts
│     ├─ useLocalStorageState.ts
│     └─ validators.ts
├─ index.html
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
└─ eslint.config.js
```

---

## Getting Started

**Requirements:** Node.js 18+ (recommended), npm or pnpm.

```bash
# 1. Install dependencies
npm install
# or
pnpm install

# 2. Run in development mode
npm run dev
# open in browser: http://localhost:5173 (or the address shown in terminal)

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---
