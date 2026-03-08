'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SportData } from '@/data/sports';

export default function SportCard({ sport, index, onClick }: { sport: SportData; index: number; onClick: () => void }) {
    // Dynamically load the Lucide icon
    const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[sport.iconName] || Icons.Activity;

    return (
        <motion.button
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl bg-transparent border border-slate-700/50 p-6 flex flex-col items-center justify-center text-center h-full transition-all hover:border-slate-500 hover:bg-white/5 active:scale-95"
        >
            {/* Header / Logo */}
            <div className={`p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-white shadow-sm ring-1 ring-inset ring-white/10 mb-4 group-hover:bg-slate-800 transition-colors`}>
                <IconComponent className="w-8 h-8" />
            </div>

            {/* Content */}
            <div>
                <h3 className="text-xl font-bold text-white mb-1">{sport.name}</h3>
                <span className="text-xs font-semibold uppercase tracking-wider text-green-400/80">
                    {sport.category}
                </span>
            </div>

            <div className="absolute top-4 right-4">
                <span className="text-xs font-mono font-bold bg-green-900/30 text-green-400/80 px-2 py-1 rounded border border-green-700/30">
                    {sport.players?.length || 0}
                </span>
            </div>
        </motion.button>
    );
}
