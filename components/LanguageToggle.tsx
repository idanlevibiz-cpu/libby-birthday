"use client";

import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
    const { lang, toggleLang } = useLanguage();

    return (
        <button
            onClick={toggleLang}
            className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-800/20 bg-cream-50/80 backdrop-blur-sm text-xs font-serif uppercase tracking-widest text-emerald-900 transition-all hover:bg-emerald-900 hover:text-gold-400 shadow-sm",
                className
            )}
        >
            <span className={lang === "en" ? "font-bold" : "opacity-50"}>EN</span>
            <span className="opacity-30">|</span>
            <span className={lang === "es" ? "font-bold" : "opacity-50"}>ES</span>
        </button>
    );
}
