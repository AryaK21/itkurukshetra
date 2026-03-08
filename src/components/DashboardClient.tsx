'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Trophy, Users, MonitorPlay, X } from 'lucide-react';
import { SportData } from '@/data/sports';
import SportCard from '@/components/SportCard';

export default function DashboardClient({ sportsData }: { sportsData: SportData[] }) {
    const [selectedSport, setSelectedSport] = useState<SportData | null>(null);

    return (
        <main className="min-h-screen relative bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30">

            {/* Grassy Background Theme Elements */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-cover bg-center"
                style={{ backgroundImage: 'url(/grassy_court_bg.png)' }}
            />

            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-0" />
            <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617] pointer-events-none z-0" />

            {/* Navbar / Top Hero section */}
            <header className="relative z-20 pt-16 pb-12 px-6 md:pt-24 md:pb-20 max-w-7xl mx-auto flex flex-col items-center text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-900/60 border border-green-500/50 text-green-300 text-sm font-bold mb-8 backdrop-blur-md shadow-lg uppercase tracking-widest"
                >
                    <MonitorPlay className="w-5 h-5 text-green-400" />
                    <span>Official IT Department Roster</span>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
                        <span className="text-white block mb-2">TEAM IT</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-lime-500 text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider block">
                            Kurukshetra 2026
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-12 drop-shadow-md font-medium">
                        The Information Technology department&apos;s elite lineup. Claim your jersey, join the roster, and lead IT to victory in Kurukshetra sports.
                    </p>
                </motion.div>

                {/* Primary Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        href="/register"
                        className="group relative inline-flex items-center justify-center gap-3 bg-white text-green-950 px-8 py-4 rounded-full font-bold text-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-xl shadow-green-900/30"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center gap-2">
                            <Trophy className="w-5 h-5" />
                            Join Team IT
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <button
                        onClick={() => {
                            document.getElementById('sports-roster')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-lg text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 backdrop-blur-md transition-colors shadow-lg"
                    >
                        <Users className="w-5 h-5" />
                        View Live Roster
                    </button>
                </motion.div>
            </header>


            {/* Main Roster / Sports Grid */}
            <section id="sports-roster" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-slate-800/80 bg-[#020617]/80 backdrop-blur-md rounded-t-[3rem] mt-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">IT Department Sports</h2>
                        <p className="text-slate-400">The official lineup of events our department is competing in.</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Team Events</span>
                        <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Individual</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {sportsData.map((sport, index) => (
                        <SportCard key={sport.id} sport={sport} index={index} onClick={() => setSelectedSport(sport)} />
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-800/80 bg-[#020617] py-8 px-6 text-center text-slate-500 text-sm">
                <p>© 2026 Kurukshetra IT Department. All rights reserved.</p>
                <p className="mt-1">May the best team win.</p>
            </footer>

            {/* Roster Modal */}
            <AnimatePresence>
                {selectedSport && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        onClick={() => setSelectedSport(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
                        >
                            <div className={`h-2 w-full bg-gradient-to-r ${selectedSport.accentClass}`} />

                            <button
                                onClick={() => setSelectedSport(null)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-1">{selectedSport.name} Roster</h3>
                                <p className="text-slate-400 text-sm mb-6">{selectedSport.players?.length || 0} Registered Players</p>

                                <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                    {selectedSport.players && selectedSport.players.length > 0 ? (
                                        selectedSport.players.map((player, i) => {
                                            const [name, jersey] = player.split(' #');
                                            return (
                                                <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                                                    <span className="font-medium text-slate-200">{name}</span>
                                                    <span className="font-mono text-green-400 font-bold bg-green-950/40 px-3 py-1 rounded border border-green-800/50">#{jersey}</span>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div className="text-center py-10 bg-slate-800/20 rounded-xl border border-slate-700/30 border-dashed">
                                            <p className="text-slate-400">No players registered yet.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
