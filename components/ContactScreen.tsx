'use client';

import { motion } from 'framer-motion';

export default function ContactScreen() {
    return (
        <section className="relative min-h-screen w-full bg-[#050505] px-8 py-24 md:px-24">
            <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 items-center h-full">

                {/* Info Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center space-y-12"
                >
                    <div>
                        <h2 className="mb-8 text-5xl font-bold tracking-tighter text-white/90 md:text-7xl">
                            Контакти
                        </h2>
                        <div className="space-y-6 text-xl font-light text-white/70">
                            <p>вул. Хрещатик, 1, Київ</p>
                            <p>+38 (097) 000-00-00</p>
                            <p>hello@mistudio.com</p>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button className="rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black">
                                Instagram
                            </button>
                            <button className="rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black">
                                Telegram
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-2xl font-semibold text-white/90">
                            Робочі години
                        </h3>
                        <ul className="space-y-4 text-lg text-white/60">
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>Пн - Пт</span>
                                <span>10:00 - 20:00</span>
                            </li>
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>Сб - Нд</span>
                                <span>11:00 - 18:00</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Map Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="h-[500px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111]"
                >
                    {/* Google Map Embed - Dark Style */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.510300627798!2d30.520448076045507!3d50.45014607159239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5081283a35%3A0x6c6e3d25d19163c!2sKhreshchatyk%20St%2C%20Kyiv%2C%2002000!5e0!3m2!1sen!2sua!4v1707421234567!5m2!1sen!2sua&map_action=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </motion.div>

            </div>
        </section>
    );
}
