import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './redux/store';
import { resetGame } from './redux/slices/gameSlice';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import { Gamepad2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const dispatch = useDispatch();
  const { winner, xIsNext } = useSelector((state: RootState) => state.game);

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 selection:bg-blue-500/30">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center gap-3 bg-slate-800/50 px-6 py-2 rounded-full border border-slate-700 mb-6">
          <Gamepad2 className="text-blue-400" size={24} />
          <h1 className="text-2xl font-black tracking-widest text-white uppercase">Tic Tac Toe</h1>
        </div>
        
        <div className="h-8">
          <AnimatePresence mode="wait">
            {winner ? (
              <motion.div
                key="winner"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`text-2xl font-bold ${winner === 'Draw' ? 'text-slate-400' : 'text-green-400'}`}
              >
                {winner === 'Draw' ? "It's a Draw!" : `Winner: Player ${winner}`}
              </motion.div>
            ) : (
              <motion.div
                key="turn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xl font-medium text-slate-300"
              >
                Next Player: <span className={xIsNext ? 'text-blue-400 font-bold' : 'text-rose-400 font-bold'}>{xIsNext ? 'X' : 'O'}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full relative"
      >
        <Board />
        
        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={() => dispatch(resetGame())}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all active:scale-95"
              >
                <RotateCcw size={20} /> Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full"
      >
        <Scoreboard />
      </motion.div>
    </div>
  );
}

export default App;
