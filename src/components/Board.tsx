import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { makeMove } from '../redux/slices/gameSlice';
import { motion } from 'framer-motion';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const { board, winningLine, winner } = useSelector((state: RootState) => state.game);

  return (
    <div className="grid grid-cols-3 gap-3 p-4 bg-slate-800 rounded-2xl shadow-2xl max-w-[400px] w-full mx-auto border border-slate-700">
      {board.map((square, i) => {
        const isWinningSquare = winningLine?.includes(i);
        const isWinningX = isWinningSquare && winner === 'X';
        const isWinningO = isWinningSquare && winner === 'O';

        return (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(makeMove(i))}
            disabled={!!square || !!winner}
            className={`h-24 sm:h-28 rounded-xl text-5xl sm:text-6xl font-black flex items-center justify-center transition-colors shadow-inner
              ${!square && !winner ? 'hover:bg-slate-700 bg-slate-900 cursor-pointer' : 'bg-slate-900 cursor-default'}
              ${isWinningX ? 'text-green-400 ring-2 ring-green-400 bg-green-900/20' : ''}
              ${isWinningO ? 'text-amber-400 ring-2 ring-amber-400 bg-amber-900/20' : ''}
              ${!isWinningSquare && square === 'X' ? 'text-blue-400' : ''}
              ${!isWinningSquare && square === 'O' ? 'text-rose-400' : ''}
            `}
          >
            {square && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {square}
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default Board;
