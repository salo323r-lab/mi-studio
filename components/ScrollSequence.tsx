'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import TextOverlay from './TextOverlay';
import LoadingScreen from './LoadingScreen';

const FRAME_COUNT = 179; // Total frames (0 to 178)

export default function ScrollSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Scroll Progress (0 to 1) for the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map progress to frame index
    const frameIndex = useTransform(smoothProgress, [0, 1], [1, FRAME_COUNT]);

    // Preload Images
    useEffect(() => {
        let isMounted = true;
        const loadedImages: HTMLImageElement[] = [];
        let loadCounter = 0;

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            // Assuming images are named frame_0.jpg to frame_178.jpg in /public/sequence/
            img.src = `/sequence/frame_${i}.jpg`;
            img.onload = () => {
                if (!isMounted) return;
                loadCounter++;
                setLoadedCount(loadCounter);
                if (loadCounter === FRAME_COUNT) {
                    setImages(loadedImages); // This might be wrong order if async loading finishes differently, but array index matters?
                    // Better approach: Assign to specific index
                    // But actually the loop runs synchronously to create Image objects.
                    // We should store them in an array index based on `i`.
                }
            };
            loadedImages[i] = img;
        }

        // Check loading completion
        // We can use a promise all or just poll count?
        // Since we fill the array immediately with image objects, we can check count.

        const checkLoaded = setInterval(() => {
            if (loadCounter >= FRAME_COUNT) {
                setLoading(false);
                clearInterval(checkLoaded);
            }
        }, 100);

        return () => {
            isMounted = false;
            clearInterval(checkLoaded);
        };
    }, []);

    // Draw on Canvas
    const drawImage = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Use Math.round/floor to get integer index.
        // Ensure index is within bounds [0, FRAME_COUNT - 1]
        const safeIndex = Math.min(Math.max(Math.floor(index), 0), FRAME_COUNT - 1);
        const img = images[safeIndex];

        if (!img || !img.complete) return;

        // Canvas sizing (responsive contain)
        // We want to fill the canvas but maintain aspect ratio of the image
        // Actually, usually we set canvas size to window size and draw image "contain"

        // Set canvas dimensions to window dimensions to ensure high DPI sharpness?
        // Or keep canvas fixed size and scale with CSS?
        // Better: Set canvas internal resolution to window size.

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;

        const isMobile = window.innerWidth < 768;
        // Force 'cover' on mobile to fill screen (crop edges). 'contain' on desktop.
        // We use Math.max for cover (scales until both dimensions fit, cropping excess).
        const scale = isMobile ? Math.max(scaleX, scaleY) : Math.min(scaleX, scaleY);

        const drawWidth = img.width * scale;
        const drawHeight = img.height * scale;

        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw background color to ensure no transparency artifacts
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }, [images]);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!loading) {
            drawImage(latest);
        }
    });

    // Initial draw when loading finishes
    useEffect(() => {
        if (!loading) {
            drawImage(frameIndex.get());
        }
    }, [loading, drawImage, frameIndex]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (!loading) drawImage(frameIndex.get());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    return (
        <div ref={containerRef} className="relative h-[400vh] w-full bg-[#050505]">
            {loading && <LoadingScreen progress={(loadedCount / FRAME_COUNT) * 100} />}

            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 block h-full w-full object-contain"
                />

                {!loading && (
                    <>
                        {/* Beat A — 0–20% Scroll */}
                        <TextOverlay progress={scrollYProgress} range={[0.0, 0.20]}>
                            <h1 className="text-5xl md:text-9xl font-bold text-white/90 tracking-tighter">
                                Сьогодні сяємо
                            </h1>
                            <p className="mt-4 text-lg md:text-2xl text-white/60 font-light tracking-wide px-4">
                                Твоя персональна майстерня краси
                            </p>
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/30 text-xs md:text-sm tracking-widest uppercase">
                                Scroll to Explore
                            </div>
                        </TextOverlay>

                        {/* Beat B — 25–45% Scroll */}
                        {/* Beat B — 25–45% Scroll */}
                        <TextOverlay progress={scrollYProgress} range={[0.25, 0.45]} align="left">
                            <h2 className="text-4xl md:text-8xl font-bold text-white/90">
                                У нас зручні крісла
                            </h2>
                            <p className="mt-4 text-xl md:text-2xl text-white/60">
                                Твій затишок
                            </p>
                        </TextOverlay>

                        {/* Beat C — 50–70% Scroll */}
                        {/* Beat C — 50–70% Scroll */}
                        <TextOverlay progress={scrollYProgress} range={[0.50, 0.70]} align="right">
                            <h2 className="text-4xl md:text-8xl font-bold text-white/90">
                                Сервіс
                            </h2>
                            <p className="mt-4 text-lg md:text-2xl text-white/60 max-w-xs md:max-w-lg ml-auto">
                                Сертифіковані і ввічливі майстри
                            </p>
                        </TextOverlay>

                        {/* Beat D — 75–95% Scroll */}
                        {/* Beat D — 75–95% Scroll */}
                        <TextOverlay progress={scrollYProgress} range={[0.75, 0.95]}>
                            <h2 className="text-4xl md:text-8xl font-bold text-white/90">
                                Зручне розташування
                            </h2>
                            <p className="mt-8 text-lg md:text-xl text-white/60 font-light tracking-widest uppercase animate-bounce">
                                Гортай донизу ↓
                            </p>
                        </TextOverlay>
                    </>
                )}
            </div>
        </div>
    );
}
