'use client';

import { motion } from 'framer-motion';

export default function LoadingScreen({ progress }: { progress: number }) {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white"
        >
            <div className="mb-4 text-2xl font-light tracking-widest text-[#ededed]/80">
                LOADING EXPERIENCE
            </div>
            <div className="h-1 w-64 overflow-hidden rounded-full bg-white/10">
                <motion.div
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.2 }}
                />
            </div>
            <div className="mt-2 text-sm font-light text-white/40">
                {Math.round(progress)}%
            </div>
        </motion.div>
    );
}
