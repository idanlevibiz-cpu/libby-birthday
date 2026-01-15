"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle, Ticket } from "lucide-react";

export function Rsvp() {
    const { t } = useLanguage();
    const [name, setName] = useState("");
    const [guests, setGuests] = useState(1);

    const [submitting, setSubmitting] = useState(false);

    const handleWhatsApp = async () => {
        if (!name) return;
        setSubmitting(true);

        // 1. Log to database
        try {
            await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, guests }),
            });
        } catch (e) {
            console.error("Failed to log RSVP:", e);
        }

        // 2. Open WhatsApp
        const text = `Hi! This is ${name}. We would love to come to Libby's 2nd Birthday! 🎉\nGuests: ${guests}`;
        const encodedText = encodeURIComponent(text);
        // REPLACE THIS NUMBER WITH YOUR OWN
        const phoneNumber = "972543470057";

        setSubmitting(false);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, "_blank");
    };

    return (
        <div className="w-full">
            <div className="bg-white/30 backdrop-blur-xl p-8 md:p-10 rounded-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border border-white/40 space-y-8">
                <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-pink-400/20 rounded-full">
                        <Ticket className="w-10 h-10 text-pink-500" />
                    </div>
                    <h2 className="font-serif text-4xl text-center text-pink-600 drop-shadow-sm">{t.rsvp.title}</h2>
                    <p className="text-pink-800/80 text-center max-w-md mx-auto">
                        Please RSVP directly via WhatsApp!
                    </p>
                </div>

                <div className="space-y-6 max-w-sm mx-auto">
                    {/* Name */}
                    <div className="space-y-2 text-left">
                        <label className="block text-sm font-bold text-pink-700 uppercase tracking-widest pl-1">
                            {t.rsvp.fullName}
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-white/30 text-pink-900 placeholder-pink-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 outline-none transition-all"
                            placeholder="Minnie Mouse..."
                        />
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="block text-sm font-bold text-pink-700 uppercase tracking-widest pl-1">
                            {t.rsvp.guests}
                        </label>
                        <div className="flex items-center gap-4 bg-white/40 p-2 rounded-2xl border border-white/30 w-fit mx-auto">
                            <button
                                type="button"
                                onClick={() => setGuests(Math.max(1, guests - 1))}
                                className="w-10 h-10 rounded-xl bg-white/40 text-pink-700 flex items-center justify-center font-bold hover:bg-white/60 transition-colors"
                            >
                                -
                            </button>
                            <span className="text-xl font-bold text-pink-900 w-8 text-center">{guests}</span>
                            <button
                                type="button"
                                onClick={() => setGuests(Math.min(10, guests + 1))}
                                className="w-10 h-10 rounded-xl bg-white/40 text-pink-700 flex items-center justify-center font-bold hover:bg-white/60 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleWhatsApp}
                        disabled={!name || submitting}
                        className="w-full py-5 bg-[#25D366] text-white rounded-2xl font-black uppercase tracking-widest shadow-lg hover:shadow-green-400/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                    >
                        {submitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.913.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-2.846-.828-.9-.37-1.469-.791-1.551-.893-.085-.104-.666-.889-.666-1.696 0-.806.417-1.206.568-1.372.152-.167.333-.208.441-.208.109 0 .216.001.312.005.101.003.237.018.369.349.143.354.49 1.206.536 1.294.045.087.075.187.014.307-.061.121-.091.192-.18.297-.089.104-.187.218-.27.297-.089.083-.178.175.051.571.229.395 1.055 1.488 2.269 1.93.125.045.197.042.27.021s.754-.78.966-1.071c.211-.292.422-.244.705-.14 0 0 1.275.603 1.487.708.211.104.348.156.402.247.054.093.054.542-.09 1.349z" /></svg>
                        )}
                        {t.rsvp.whatsappBtn}
                    </button>
                </div>
            </div>
        </div>
    );
}
