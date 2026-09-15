<<<<<<< HEAD
# Three In A Row

A React implementation of the ["Three In A Row"](https://www.brainbashers.com/show3inarow.asp) puzzle. Fill each square with one of three colors so the board matches the hidden solution, then check your answer against the key — all under an optional countdown timer.

This project was built as a practice exercise in React (hooks, component composition, and mixing `.jsx` with typed `.tsx` files).

## How it works

- On load, the app fetches a puzzle (board layout + correct answers) from a remote API and renders it as a grid of clickable squares.
- Clicking a square cycles it through three states/colors. Squares marked as fixed by the puzzle (`canToggle: false`) can't be changed.
- **Check Puzzle** compares your current board against the puzzle's answer key and reports whether you're done, still going, or have made a mistake.
- **Show/Hide Incorrect** toggles red outlines on any square you've colored incorrectly.
- **Reset Puzzle** restores the board to its original (unsolved) state.
- **Timed Mode** starts a countdown on your first move, shows a shrinking/color-shifting border around the board as time runs low, and records your best completion time.

## Tech stack

- [React](https://react.dev/) (function components + hooks: `useState`, `useEffect`, `useRef`)
- TypeScript for the board's data types and the `Square` component (`.tsx`), plain JS/JSX elsewhere
- [Create React App](https://github.com/facebook/create-react-app) for the build tooling
- Puzzle data served from an external API (`https://prog2700.onrender.com/threeinarow/...`)

## Project structure

```
src/
├── App.jsx                       # Top-level state, puzzle fetching, and layout
├── App.css                       # App styling
├── Types/
│   ├── Cell.tsx                  # Cell type: currentState, correctState, canToggle
│   └── Square.tsx                # Renders a single clickable board square
├── boardControls/
│   ├── Board.jsx                 # Renders the grid of Square components
│   ├── BoardTimerBorder.jsx      # Animated countdown border drawn around the board
│   └── Timer.jsx                 # Time-left / best-time display
└── utils/
    └── checkPuzzle.js            # Compares board state against the answer key
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed

### Install & run

```bash
npm install
npm start
```

This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to play. The page reloads automatically as you edit the source.

### Other scripts

- `npm test` — launches the test runner in watch mode
- `npm run build` — builds an optimized production bundle to the `build/` folder
- `npm run eject` — copies the CRA build configuration into the project (one-way operation)

## Notes

- The app currently always loads the `sample` puzzle endpoint on startup; the other size-specific URLs defined in `App.jsx` (6x6, 8x8, 10x10, 12x12, 14x14, random) are wired up as constants but not yet hooked to any UI control.
- Play the original puzzle this is modeled after at [brainbashers.com](https://www.brainbashers.com/show3inarow.asp) to get a feel for the rules before diving into the code.
=======
Three In A Row

A React implementation of the "Three In A Row" puzzle. Fill each square with one of three colors so the board matches the hidden solution, then check your answer against the key — all under an optional countdown timer.

This project was built as a practice exercise in React (hooks, component composition, and mixing .jsx with typed .tsx files).

How it works
On load, the app fetches a puzzle (board layout + correct answers) from a remote API and renders it as a grid of clickable squares.
Clicking a square cycles it through three states/colors. Squares marked as fixed by the puzzle (canToggle: false) can't be changed.
Check Puzzle compares your current board against the puzzle's answer key and reports whether you're done, still going, or have made a mistake.
Show/Hide Incorrect toggles red outlines on any square you've colored incorrectly.
Reset Puzzle restores the board to its original (unsolved) state.
Timed Mode starts a countdown on your first move, shows a shrinking/color-shifting border around the board as time runs low, and records your best completion time.
Tech stack
React (function components + hooks: useState, useEffect, useRef)
TypeScript for the board's data types and the Square component (.tsx), plain JS/JSX elsewhere
Create React App for the build tooling
Puzzle data served from an external API (https://prog2700.onrender.com/threeinarow/...)
Project structure
src/
├── App.jsx                       # Top-level state, puzzle fetching, and layout
├── App.css                       # App styling
├── Types/
│   ├── Cell.tsx                  # Cell type: currentState, correctState, canToggle
│   └── Square.tsx                # Renders a single clickable board square
├── boardControls/
│   ├── Board.jsx                 # Renders the grid of Square components
│   ├── BoardTimerBorder.jsx      # Animated countdown border drawn around the board
│   └── Timer.jsx                 # Time-left / best-time display
└── utils/
    └── checkPuzzle.js            # Compares board state against the answer key
Getting started
Prerequisites
Node.js and npm installed
Install & run
bash
npm install
npm start

This runs the app in development mode. Open http://localhost:3000 to play. The page reloads automatically as you edit the source.

Other scripts
npm test — launches the test runner in watch mode
npm run build — builds an optimized production bundle to the build/ folder
npm run eject — copies the CRA build configuration into the project (one-way operation)
Notes
The app currently always loads the sample puzzle endpoint on startup; the other size-specific URLs defined in App.jsx (6x6, 8x8, 10x10, 12x12, 14x14, random) are wired up as constants but not yet hooked to any UI control.
Play the original puzzle this is modeled after at brainbashers.com to get a feel for the rules before diving into the code.
>>>>>>> 1461bc3f8d8a7f252fcfdb76dbe691448cdd9231
