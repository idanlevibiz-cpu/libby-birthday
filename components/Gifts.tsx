"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Heart, Gift, Sparkles, Coffee, ShoppingBag, ToyBrick } from 'lucide-react';

export function Gifts() {
    const { t } = useLanguage();
    const [selectedTier, setSelectedTier] = useState<'t20' | 't30' | 't40'>('t20');

    const tiers = [
        { id: 't20', amount: 20, icon: <ToyBrick className="w-5 h-5" />, label: t.gifts.giftTiers.t20 },
        { id: 't30', amount: 30, icon: <ShoppingBag className="w-5 h-5" />, label: t.gifts.giftTiers.t30 },
        { id: 't40', amount: 40, icon: <Coffee className="w-5 h-5" />, label: t.gifts.giftTiers.t40 },
    ] as const;

    return (
        <section id="gifts" className="py-20 px-4 bg-white/50">
            <div className="max-w-xl mx-auto text-center">
                <div className="inline-flex items-center justify-center p-3 bg-pink-50 rounded-full mb-6">
                    <Gift className="w-8 h-8 text-pink-500" />
                </div>

                <h2 className="text-4xl font-serif text-gray-800 mb-6 drop-shadow-sm italic">
                    {t.gifts.title}
                </h2>

                <p className="text-gray-600 mb-12 text-lg">
                    {t.gifts.card2Desc}
                </p>

                <div className="bg-white/80 backdrop-blur-sm rounded-[40px] p-8 md:p-12 shadow-2xl border border-pink-100 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-200 via-pink-400 to-pink-200" />

                    {/* Amount Selection */}
                    <div className="mb-10 grid grid-cols-3 gap-4">
                        {tiers.map((tier) => (
                            <button
                                key={tier.id}
                                onClick={() => setSelectedTier(tier.id)}
                                className={`flex flex-col items-center p-5 rounded-3xl transition-all duration-500 border-2 ${selectedTier === tier.id
                                    ? 'bg-pink-50 border-pink-400 scale-105 shadow-lg'
                                    : 'bg-white border-pink-50 hover:border-pink-200 grayscale-[0.5] hover:grayscale-0'
                                    }`}
                            >
                                <span className="text-2xl font-black text-pink-600 mb-2">${tier.amount}</span>
                                <div className={`p-3 rounded-2xl transition-colors duration-500 ${selectedTier === tier.id ? 'bg-pink-200 text-pink-600' : 'bg-gray-100 text-gray-400'}`}>
                                    {tier.icon}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Fun Description */}
                    <div className="min-h-[100px] flex items-center justify-center p-6 bg-gradient-to-br from-pink-50/50 to-white rounded-3xl mb-10 border border-pink-50 shadow-inner relative" key={selectedTier}>
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-pink-100 text-pink-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                            Your gift will buy
                        </div>
                        <p className="text-gray-700 italic font-serif text-xl animate-in fade-in zoom-in duration-500 leading-relaxed">
                            {tiers.find(t => t.id === selectedTier)?.label}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="relative group/ath w-full sm:w-auto">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText('9392190742');
                                    alert(t.common.copied);
                                }}
                                className="group/btn relative w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-orange-500 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-orange-600 transition-all duration-300 shadow-xl hover:shadow-orange-200 hover:-translate-y-1 active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
                                <Heart className="w-6 h-6 fill-white animate-pulse" />
                                <span className="relative z-10">{t.gifts.card1Desc}</span>
                            </button>
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/ath:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] px-3 py-1 rounded-full whitespace-nowrap pointer-events-none">
                                {t.gifts.athNumber} (Click to copy)
                            </div>
                        </div>

                        <a
                            href="https://www.amazon.com/hz/wishlist/ls/F2R4TAMCCYP4?ref_=wl_share"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/amazon relative w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-white border-2 border-orange-200 text-gray-800 px-10 py-5 rounded-3xl font-black text-lg hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-orange-100 hover:-translate-y-1 active:scale-95 overflow-hidden"
                        >
                            <ShoppingBag className="w-6 h-6 text-orange-500" />
                            <span className="relative z-10">{t.gifts.amazonWishlist}</span>
                            <Sparkles className="w-5 h-5 text-orange-300 opacity-0 group-hover:amazon:opacity-100 transition-opacity" />
                        </a>
                    </div>

                    <div className="mt-8 pt-8 border-t border-pink-50 flex items-center justify-center gap-3 text-gray-400">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full text-pink-500 font-bold">
                                ATH Móvil: {t.gifts.athNumber}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
}
