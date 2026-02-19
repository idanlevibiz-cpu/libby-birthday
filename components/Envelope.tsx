"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { Volume2, VolumeX } from "lucide-react";

interface EnvelopeProps {
    onOpen: () => void;
}

export function Envelope({ onOpen }: EnvelopeProps) {
    const { t } = useLanguage();
    const [isOpening, setIsOpening] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const handleOpen = () => {
        if (isOpening) return;
        setIsOpening(true);
        onOpen();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black relative z-40 overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="auto"
                poster="/envelope-mia-2.jpg"
                className="absolute inset-0 w-full h-full object-cover opacity-100"
            >
                <source src="/background-video.mp4" type="video/mp4" />
            </video>

            {/* Mute/Unmute Toggle */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                }}
                className="absolute top-6 right-6 z-50 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white hover:bg-white/40 transition-all shadow-lg"
            >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="relative z-10 w-full h-full"
                onClick={handleOpen}
            >
                {/* CTA Button - Positioned FIXED at the very bottom (40px from bottom) to override any layout issues */}
                <motion.button
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 px-12 py-5 bg-pink-500 text-white rounded-full font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:bg-pink-600 transition-all hover:scale-105 active:scale-95 border-2 border-white/50 backdrop-blur-sm z-[100]"
                    animate={isOpening ? { opacity: 0, scale: 0.8, y: 100 } : { opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {t.landing.cta}
                </motion.button>
            </motion.div>
        </div>
    );
}
