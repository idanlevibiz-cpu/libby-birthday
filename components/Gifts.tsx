"use client";

import { useLanguage } from "@/lib/i18n";
import { Gift, Sparkles, Heart } from "lucide-react";

export function Gifts() {
    const { t } = useLanguage();

    return (
        <div id="gifts-section" className="w-full">
            <div className="bg-white/40 backdrop-blur-2xl p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/60 space-y-10 relative overflow-hidden group">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-100/30 rounded-full blur-3xl" />

                <div className="flex flex-col items-center gap-4 relative">
                    <div className="relative">
                        <div className="p-5 bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl shadow-lg animate-bounce duration-[3000ms] ease-in-out">
                            <Gift className="w-10 h-10 text-white" />
                        </div>
                        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-pink-300 animate-pulse" />
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl text-center text-pink-600 drop-shadow-sm tracking-tight">{t.gifts.title}</h2>
                    <p className="max-w-md text-pink-800/70 text-center font-medium leading-relaxed italic">
                        "{t.gifts.card2Desc}"
                    </p>
                </div>

                {/* Gift Card */}
                <div className="relative group/card max-w-lg mx-auto">
                    <div className="absolute inset-0 bg-pink-400 translate-y-2 translate-x-2 rounded-[32px] opacity-10 group-hover/card:translate-y-3 group-hover/card:translate-x-3 transition-transform duration-300" />

                    <div className="relative bg-white/80 backdrop-blur-md p-8 rounded-[32px] border border-pink-100 shadow-xl space-y-6 text-center transform group-hover/card:-translate-y-1 transition-transform duration-300">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-pink-900 leading-tight">
                                {t.gifts.card1Title}
                            </h3>
                            <p className="text-sm text-pink-800/60 font-medium px-4">
                                {t.gifts.card1Desc}
                            </p>
                        </div>

                        <div className="py-4 border-y border-pink-50/50">
                            <p className="text-[10px] uppercase tracking-widest font-black text-pink-400 mb-2">PayPal Connection</p>
                            <p className="text-xl font-mono text-pink-600 select-all bg-pink-50/50 py-3 px-6 rounded-2xl border border-pink-100 inline-block">
                                medspa123ae@gmail.com
                            </p>
                        </div>

                        <a
                            href="https://www.paypal.com/myaccount/transfer/homepage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn relative block w-full py-5 bg-pink-500 text-white rounded-[24px] font-black uppercase tracking-[0.15em] transition-all shadow-xl hover:shadow-pink-400/40 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {(t.gifts as any).cta}
                                <Heart className="w-5 h-5 fill-white" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                        </a>

                        <p className="text-[10px] text-pink-300 font-bold italic">
                            * No pressure, just party! ✨
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
