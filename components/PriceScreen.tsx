'use client';

import { motion } from 'framer-motion';

const prices = [
    { item: "Жіноча стрижка", price: "800 ₴" },
    { item: "Чоловіча стрижка", price: "600 ₴" },
    { item: "Дитяча стрижка", price: "400 ₴" },
    { item: "Укладка волосся", price: "500 ₴" },
    { item: "Фарбування (в один тон)", price: "2000 ₴" },
    { item: "Складне фарбування", price: "3500 ₴" },
    { item: "Манікюр комплекс", price: "700 ₴" },
    { item: "Педікюр комплекс", price: "900 ₴" },
    { item: "Макіяж денний", price: "1200 ₴" },
    { item: "Макіяж вечірній", price: "1500 ₴" },
];

export default function PriceScreen() {
    return (
        <section className="relative min-h-screen w-full bg-[#050505] px-8 py-24 md:px-24">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mx-auto max-w-4xl"
            >
                <h2 className="mb-16 text-center text-6xl font-bold tracking-tighter text-white/90 md:text-8xl">
                    Ціни
                </h2>

                <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                    {prices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex items-baseline justify-between border-b border-white/10 pb-4"
                        >
                            <span className="text-xl font-light tracking-wide text-white/80">
                                {service.item}
                            </span>
                            <span className="text-xl font-medium text-white/60">
                                {service.price}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-white/40 uppercase tracking-widest">
                        * Ціни можуть змінюватись в залежності від складності роботи
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
