"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface EnvelopeProps {
    onOpen: () => void;
}

export function Envelope({ onOpen }: EnvelopeProps) {
    const { t } = useLanguage();
    const [isOpening, setIsOpening] = useState(false);

    const handleOpen = () => {
        if (isOpening) return;
        setIsOpening(true);

        onOpen();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[radial-gradient(circle_at_center,_#ffffff_0%,_var(--color-cream-50)_100%)] relative z-40 overflow-hidden">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
                className="relative flex flex-col items-center gap-8 cursor-pointer group"
                onClick={handleOpen}
            >
                {/* Envelope / Opening Image Container */}
                <motion.div
                    className={cn(
                        "relative w-[85vw] max-w-[400px] aspect-[4/3] drop-shadow-2xl",
                        isOpening ? "animate-out fade-out zoom-out duration-1000" : "transition-transform duration-500 hover:scale-[1.03]"
                    )}
                >
                    <motion.img
                        src="/envelope-libby-2.jpg"
                        alt="Envelope"
                        className="w-full h-full object-cover rounded-[30px] border-[8px] border-white shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                        animate={isOpening ? { scale: 1.1, opacity: 0, y: 100 } : { scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    />
                </motion.div>

                {/* CTA Button */}
                <motion.button
                    className="px-12 py-5 bg-pink-500 text-white rounded-full font-bold tracking-widest uppercase shadow-xl hover:bg-pink-600 transition-colors"
                    animate={isOpening ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                >
                    {t.landing.cta}
                </motion.button>
            </motion.div>
        </div>
    );
}
