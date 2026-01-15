"use client";

import { useLanguage } from "@/lib/i18n";
export function Header() {
    const { t } = useLanguage();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 pointer-events-none">
            <a
                href="https://epicaevents.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-[0.2em] text-pink-900/60 hover:text-pink-900 pointer-events-auto transition-colors font-bold"
            >
                {t.header.brand}
            </a>
        </header>
    );
}
