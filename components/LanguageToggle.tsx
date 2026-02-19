"use client";

import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
    const { lang, toggleLang } = useLanguage();

    return (
        <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-white/40 text-[10px] font-black tracking-widest text-pink-700 hover:bg-white/60 transition-all pointer-events-auto"
        >
            <span className={lang === "en" ? "opacity-100" : "opacity-40"}>EN</span>
            <span className="opacity-20 text-[8px]">|</span>
            <span className={lang === "es" ? "opacity-100" : "opacity-40"}>ES</span>
        </button>
    );
}
