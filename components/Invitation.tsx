"use client";

import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Trophy, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { Gifts } from "./Gifts";
import { Rsvp } from "./Rsvp";
import { Gallery } from "./Gallery";

export function Invitation() {
    const { t } = useLanguage();

    return (
        <div className="relative min-h-screen w-full pb-20 overflow-x-hidden font-sans">

            {/* FIXED BACKGROUND IMAGE */}
            <div className="fixed inset-0 z-0">
                <img
                    src="/hero-libby-2.jpg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-90"
                />
                {/* Light overlay for readability */}
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 pt-12 flex flex-col items-center gap-10 max-w-2xl text-center">

                {/* HEADER CARD - Glassmorphism */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/40 backdrop-blur-xl p-8 md:p-10 rounded-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border border-white/50 text-pink-900 w-full relative overflow-hidden group"
                >
                    {/* subtle shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Icon */}
                    <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto text-pink-500 shadow-lg mb-6 animate-pulse border-4 border-white">
                        <PartyPopper className="w-10 h-10" />
                    </div>

                    <h1 className="font-serif text-5xl md:text-7xl text-pink-500 drop-shadow-sm leading-tight mb-4">
                        {t.eventInfo.title}
                    </h1>

                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto rounded-full mb-6" />

                    <p className="text-lg md:text-xl text-pink-800 leading-relaxed whitespace-pre-line font-medium">
                        {t.eventInfo.welcomeMsg}
                    </p>

                    {/* Event Details */}
                    <div className="grid gap-4 py-8 mt-4 border-t border-pink-200/50">
                        <div className="flex items-center justify-center gap-3 text-lg font-bold text-pink-700 tracking-wide">
                            <Calendar className="w-6 h-6 text-pink-400" />
                            <span>{t.eventInfo.date}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-lg font-bold text-pink-700 tracking-wide">
                            <Clock className="w-6 h-6 text-pink-400" />
                            <span>{t.eventInfo.time}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-pink-800 whitespace-pre-line text-base font-medium">
                            <MapPin className="w-6 h-6 text-pink-400 flex-shrink-0" />
                            <span>{t.eventInfo.location}</span>
                        </div>
                    </div>

                    {/* Map Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full pt-2">
                        <a
                            href="https://waze.com/ul/hde14p6n40"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-4 bg-pink-500 hover:bg-pink-400 text-white rounded-2xl font-bold uppercase tracking-widest text-sm shadow-lg transition-all hover:scale-[1.02] border border-white/30 backdrop-blur-sm"
                        >
                            Waze
                        </a>
                        <a
                            href="https://maps.google.com/?q=Condominio+Astralis+Isla+Verde"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-4 bg-blue-400 hover:bg-blue-300 text-white rounded-2xl font-bold uppercase tracking-widest text-sm shadow-lg transition-all hover:scale-[1.02] border border-white/30 backdrop-blur-sm"
                        >
                            Google Maps
                        </a>
                    </div>
                </motion.div>

                {/* "Oh Two-dless!" CUSTOM SECTION */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-full py-10 px-6 rounded-[30px] bg-pink-400/20 backdrop-blur-sm border-2 border-white/60 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 10%)', backgroundSize: '20px 20px' }}
                    />

                    <h2 className="font-serif text-5xl md:text-7xl text-pink-500 drop-shadow-white rotate-2 mb-2">
                        Oh Two-dless!
                    </h2>
                    <div className="flex justify-center gap-2 mb-4">
                        <span className="text-3xl">🎀</span>
                        <span className="text-3xl">✨</span>
                        <span className="text-3xl">🎀</span>
                    </div>
                    <p className="text-pink-800 text-lg md:text-xl font-bold">
                        We can’t believe it, but yes, it’s true!
                    </p>
                </motion.div>

                {/* SECTIONS */}
                <div className="w-full space-y-10">

                    {/* RSVP */}
                    <Rsvp />

                    {/* Gifts */}
                    <Gifts />

                    {/* Gallery */}
                    <div className="bg-white/30 backdrop-blur-md p-6 md:p-8 rounded-[40px] border border-white/40 shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <Gallery />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
