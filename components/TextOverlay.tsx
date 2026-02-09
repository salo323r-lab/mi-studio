'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface TextOverlayProps {
    children: ReactNode;
    progress: MotionValue<number>;
    range: [number, number]; // e.g. [0.1, 0.3] -> 10% to 30%
    align?: 'left' | 'center' | 'right';
}

export default function TextOverlay({ children, progress, range, align = 'center' }: TextOverlayProps) {
    const [start, end] = range;
    // Fade in over first 10% of range, fade out over last 10%
    const fadeInStart = start;
    const fadeInEnd = start + ((end - start) * 0.1);
    const fadeOutStart = end - ((end - start) * 0.1);
    const fadeOutEnd = end;

    const opacity = useTransform(
        progress,
        [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        progress,
        [fadeInStart, fadeInEnd, fadeOutEnd],
        [20, 0, -20]
    );

    const alignClass = align === 'left' ? 'items-start text-left' :
        align === 'right' ? 'items-end text-right' :
            'items-center text-center';

    return (
        <motion.div
            style={{ opacity, y, display: useTransform(progress, (p) => (p >= start && p <= end ? 'flex' : 'none')) }} // Optimization: hide when out of range? Or just opacity 0 and pointer-events-none
            className={`fixed inset-0 pointer-events-none flex flex-col justify-center px-8 md:px-24 ${alignClass}`}
        >
            {children}
        </motion.div>
    );
}
