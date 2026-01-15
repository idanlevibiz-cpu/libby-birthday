"use client";

import { useLanguage } from "@/lib/i18n";
import { Gift } from "lucide-react";

export function Gifts() {
    const { t } = useLanguage();

    return (
        <div id="gifts-section" className="w-full">
            <div className="bg-white/30 backdrop-blur-xl p-8 md:p-10 rounded-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border border-white/40 space-y-8 group hover:bg-white/40 transition-colors duration-500">

                <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-pink-400/20 rounded-full animate-bounce delay-700">
                        <Gift className="w-10 h-10 text-pink-500" />
                    </div>
                    <h2 className="font-serif text-4xl text-center text-pink-600 drop-shadow-sm">{t.gifts.title}</h2>
                    <p className="text-pink-800/80 text-center font-medium italic">{t.gifts.card2Desc}</p>
                </div>

                {/* PayPal Gift */}
                <div className="text-center space-y-6">
                    <div className="p-6 bg-white/50 rounded-3xl border border-pink-200 shadow-sm">
                        <p className="text-pink-900 font-semibold mb-2">PayPal Email:</p>
                        <p className="text-xl md:text-2xl font-mono text-pink-600 select-all bg-white/60 py-2 px-4 rounded-xl border border-pink-100 mb-4 inline-block">
                            medspa123ae@gmail.com
                        </p>

                        <a
                            href="https://www.paypal.com/myaccount/transfer/homepage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-4 bg-[#0070BA] hover:bg-[#005ea6] text-white rounded-2xl font-bold transition-all shadow-md hover:scale-[1.02]"
                        >
                            {t.gifts.card1Desc}
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
