'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, User, Hash, Trophy, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Sport = 'Football' | 'Cricket' | 'Volleyball' | 'Tug of War' | 'Basketball' | 'Chess' | 'Table Tennis' | 'Badminton' | 'Throwball' | 'Carrom' | 'Kabaddi';
type Gender = 'boy' | 'girl';

export default function RegistrationForm() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState<Gender | null>(null);
    const [sports, setSports] = useState<Sport[]>([]);
    const [jerseyNumber, setJerseyNumber] = useState<string>('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const checkAvailability = async () => {
        if (!gender || !jerseyNumber || sports.length === 0) return true;

        try {
            const res = await fetch('/api/check-availability', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gender, jersey_number: parseInt(jerseyNumber), sports })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            if (data.available === false) {
                setError(`Number ${jerseyNumber} is already taken by ${data.takenBy} for one of your selected sports.`);
                return false;
            }
            return true;
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to check availability');
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !gender || !jerseyNumber || sports.length === 0) {
            setError('Please fill in all fields.');
            return;
        }

        setError(null);
        setIsSubmitting(true);

        const isAvailable = await checkAvailability();
        if (!isAvailable) {
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    gender,
                    jersey_number: parseInt(jerseyNumber),
                    sports
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            setSuccess(true);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleSport = (sport: Sport) => {
        setSports(prev =>
            prev.includes(sport)
                ? prev.filter(s => s !== sport)
                : [...prev, sport]
        );
    };

    const availableSports: Sport[] = ['Football', 'Cricket', 'Volleyball', 'Tug of War', 'Basketball', 'Kabaddi', 'Chess', 'Table Tennis', 'Badminton', 'Throwball', 'Carrom'];

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 rounded-2xl text-center space-y-6"
            >
                <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-white">Registration Complete!</h2>
                <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-xl inline-block mt-4 mb-2 shadow-inner">
                    <p className="text-slate-200">
                        {name}, you&apos;re all set with <span className="text-green-400 font-bold">Jersey #{jerseyNumber}</span> for {sports.join(', ')}.
                    </p>
                </div>

                {/* Purchase Jersey CTA */}
                <div className="mt-6 p-6 bg-slate-800/60 border border-slate-700/80 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-400 to-emerald-600" />
                    <h3 className="text-xl font-bold text-white mb-2">Next Step: Claim Your Jersey!</h3>
                    <p className="text-slate-300 text-sm mb-6">
                        Please visit the link below and fill the form with your claimed jersey number to officially purchase the jersey.
                    </p>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeaMaUuVJSDNHvoZCZS0YOvsYS6ZtQcS-dzIMV7oHrykblVIA/viewform?usp=header"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-green-500/25 gap-2 group"
                    >
                        <Trophy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Purchase Jersey Form
                    </a>
                </div>
                <button
                    onClick={() => {
                        setSuccess(false);
                        setName('');
                        setGender(null);
                        setSports([]);
                        setJerseyNumber('');
                    }}
                    className="mt-8 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-medium border border-slate-700"
                >
                    Register Another
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-3xl relative"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Error message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl flex items-start gap-3"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <p className="text-sm">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 1. Personal Details */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                        <User className="w-5 h-5 text-cyan-400" /> Let&apos;s get to know you
                    </h3>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="glass-input w-full px-4"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setGender('boy')}
                            className={cn(
                                "py-3 rounded-xl font-medium transition-all duration-300 border",
                                gender === 'boy'
                                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                    : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800"
                            )}
                        >
                            Boys
                        </button>
                        <button
                            type="button"
                            onClick={() => setGender('girl')}
                            className={cn(
                                "py-3 rounded-xl font-medium transition-all duration-300 border",
                                gender === 'girl'
                                    ? "bg-pink-500/20 border-pink-500/50 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.2)]"
                                    : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800"
                            )}
                        >
                            Girls
                        </button>
                    </div>
                </div>

                {/* 2. Select Sports */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2 border-t border-slate-800 pt-6">
                        <Trophy className="w-5 h-5 text-purple-400" /> Select Your Sports
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {availableSports.map(sport => {
                            const isActive = sports.includes(sport);
                            return (
                                <button
                                    key={sport}
                                    type="button"
                                    onClick={() => toggleSport(sport)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                                        isActive
                                            ? "bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                                            : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-300"
                                    )}
                                >
                                    {sport}
                                    {isActive && <Check className="w-3 h-3 inline-block ml-1" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Jersey Number */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2 border-t border-slate-800 pt-6">
                        <Hash className="w-5 h-5 text-blue-400" /> Pick Your Identifier
                    </h3>
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="Enter Jersey Number (e.g. 10)"
                            value={jerseyNumber}
                            onChange={(e) => setJerseyNumber(e.target.value)}
                            className="glass-input w-full px-4 text-lg font-mono"
                            min="0"
                            max="999"
                        />
                    </div>
                    <p className="text-xs text-slate-500 ml-1">
                        * You cannot select a number if someone of your gender in ANY of your selected sports already has it.
                    </p>
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-slate-800">
                    <button
                        type="submit"
                        disabled={isSubmitting || !name || !gender || !jerseyNumber || sports.length === 0}
                        className="w-full relative group overflow-hidden bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all border border-slate-700"
                    >
                        {/* Hover Gradient Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 group-hover:duration-500 transition-opacity disabled:hidden" />

                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Securing Number...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Claim Jersey Number
                                </>
                            )}
                        </span>
                    </button>
                </div>

            </form>
        </motion.div>
    );
}
