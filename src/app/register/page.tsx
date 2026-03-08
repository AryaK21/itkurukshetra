import RegistrationForm from '@/components/RegistrationForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
    return (
        <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 bg-[#020617]">
            {/* Grassy Background Theme Elements */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-30 bg-cover bg-center"
                style={{ backgroundImage: 'url(/grassy_court_bg.png)' }}
            />
            <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#020617]/70 to-[#020617] pointer-events-none z-0" />

            {/* Back Button */}
            <div className="absolute top-6 left-6 z-20">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700/50 hover:border-cyan-500/50"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Back to Dashboard</span>
                </Link>
            </div>

            {/* Header */}
            <div className="text-center z-10 mb-8 max-w-2xl mt-16 md:mt-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    <span className="text-white">Claim Your </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Jersey</span>
                </h1>
                <p className="text-slate-300 text-lg">
                    Join the official IT Department roster. Check availability and secure your number.
                </p>
            </div>

            {/* Main Form Area */}
            <div className="w-full max-w-xl z-10 mb-20">
                <RegistrationForm />
            </div>

        </main>
    );
}
