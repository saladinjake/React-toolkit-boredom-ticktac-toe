import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Player = 'X' | 'O' | null;

export interface GameState {
  board: Player[];
  xIsNext: boolean;
  winner: Player | 'Draw';
  winningLine: number[] | null;
  scores: {
    X: number;
    O: number;
    Draws: number;
  };
}

const loadState = (): GameState => {
  try {
    const serialized = localStorage.getItem('tictactoe_state');
    if (serialized === null) {
      return {
        board: Array(9).fill(null),
        xIsNext: true,
        winner: null,
        winningLine: null,
        scores: { X: 0, O: 0, Draws: 0 }
      };
    }
    return JSON.parse(serialized);
  } catch (err) {
    return {
      board: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      winningLine: null,
      scores: { X: 0, O: 0, Draws: 0 }
    };
  }
};

const initialState: GameState = loadState();

const calculateWinner = (squares: Player[]) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6] // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (state.board[index] || state.winner) return;

      state.board[index] = state.xIsNext ? 'X' : 'O';
      state.xIsNext = !state.xIsNext;

      const winResult = calculateWinner(state.board);
      if (winResult) {
        state.winner = winResult.winner;
        state.winningLine = winResult.line;
        if (state.winner === 'X') state.scores.X += 1;
        if (state.winner === 'O') state.scores.O += 1;
      } else if (!state.board.includes(null)) {
        state.winner = 'Draw';
        state.scores.Draws += 1;
      }

      localStorage.setItem('tictactoe_state', JSON.stringify(state));
    },
    resetGame: (state) => {
      state.board = Array(9).fill(null);
      state.xIsNext = true;
      state.winner = null;
      state.winningLine = null;
      localStorage.setItem('tictactoe_state', JSON.stringify(state));
    },
    resetScores: (state) => {
      state.scores = { X: 0, O: 0, Draws: 0 };
      localStorage.setItem('tictactoe_state', JSON.stringify(state));
    }
  }
});

export const { makeMove, resetGame, resetScores } = gameSlice.actions;
export default gameSlice.reducer;
