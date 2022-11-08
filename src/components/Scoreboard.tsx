import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { resetScores } from '../redux/slices/gameSlice';
import { RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const Scoreboard: React.FC = () => {
  const dispatch = useDispatch();
  const { scores } = useSelector((state: RootState) => state.game);

  return (
    <div className="w-full max-w-[400px] mx-auto mt-8 relative">
      <div className="flex justify-between items-center gap-4 bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-xl">
        <motion.div className="flex-1 text-center" whileHover={{ scale: 1.05 }}>
          <p className="text-blue-400 font-bold text-sm mb-1 uppercase tracking-wider">Player X</p>
          <p className="text-3xl font-black text-white">{scores.X}</p>
        </motion.div>
        
        <div className="w-px h-12 bg-slate-700"></div>
        
        <motion.div className="flex-1 text-center" whileHover={{ scale: 1.05 }}>
          <p className="text-slate-400 font-bold text-sm mb-1 uppercase tracking-wider">Draws</p>
          <p className="text-3xl font-black text-slate-300">{scores.Draws}</p>
        </motion.div>
        
        <div className="w-px h-12 bg-slate-700"></div>
        
        <motion.div className="flex-1 text-center" whileHover={{ scale: 1.05 }}>
          <p className="text-rose-400 font-bold text-sm mb-1 uppercase tracking-wider">Player O</p>
          <p className="text-3xl font-black text-white">{scores.O}</p>
        </motion.div>
      </div>

      <button
        onClick={() => dispatch(resetScores())}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold px-4 py-1.5 rounded-full transition-colors border border-slate-600 shadow-lg"
        title="Reset Scores"
      >
        <RotateCcw size={12} /> Reset Stats
      </button>
    </div>
  );
};

export default Scoreboard;
