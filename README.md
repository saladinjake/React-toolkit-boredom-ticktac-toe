# Tic-Tac-Toe

A classic two-player Tic-Tac-Toe game implemented with React, Redux Toolkit, and TypeScript. The game runs entirely in the browser with no backend or external dependencies beyond the React ecosystem. Game state is managed globally through the Redux store, allowing clean separation between game logic and rendering.

## Features

Two players take turns selecting squares on a three-by-three grid. The application detects win conditions for rows, columns, and diagonals and declares the winner when a line is completed. A draw is detected when all squares are filled with no winner. The current player indicator updates after each move. A reset button clears the board and restarts the game. The move history is tracked in the store, and players can step back to any previous game state.

## Technology Stack

- React: UI library for rendering the game board and control elements.
- Redux Toolkit: Game state management using createSlice. The slice tracks the board state, current player, game history, and winner.
- TypeScript: Typed definitions for board squares, player turns, and store state shape.
- React Hooks: useSelector and useDispatch connect components to the Redux store.
- Vite: Build tool and local development server.

## Project Structure

The source directory contains the Board component that renders the grid, the Square component for individual cells, the StatusBar component showing whose turn it is or the winner, and the History component for stepping through previous moves. The Redux slice contains all game logic including win detection, move recording, and time-travel navigation.

## Running the Project

Install dependencies and start the development server:

    npm install
    npm run dev

Last updated: 2026-05-01
