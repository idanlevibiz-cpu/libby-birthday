"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Loader2, CheckCircle, PartyPopper, Frown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rsvp() {
    const { t } = useLanguage();
    const [name, setName] = useState("");
    const [guests, setGuests] = useState(1);
    const [status, setStatus] = useState<"attending" | "declined">("attending");
    const [dietary, setDietary] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (!name) return;
        setSubmitting(true);

        try {
            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, guests: status === 'attending' ? guests : 0, status, dietary }),
            });
            if (res.ok) {
                setSubmitted(true);
            } else {
                const data = await res.json();
                alert(t.rsvp.error + (data.error ? ": " + data.error : ""));
            }
        } catch (e) {
            console.error("Failed to submit RSVP:", e);
            alert(t.rsvp.error);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[40px] shadow-xl border border-white/50 text-center space-y-4 animate-in fade-in zoom-in duration-700">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-500">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-serif text-pink-600">{t.rsvp.success}</h3>
                <p className="text-pink-800 font-medium">
                    {status === 'attending' ? "See you soon! ✨" : "We'll miss you! 💕"}
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="bg-white/30 backdrop-blur-xl p-8 md:p-10 rounded-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border border-white/40 space-y-8">
                <div className="flex flex-col items-center gap-3">
                    <h2 className="font-serif text-4xl text-center text-pink-600 drop-shadow-sm">{t.rsvp.title}</h2>
                </div>

                <div className="space-y-6 max-w-sm mx-auto">
                    {/* Status Selection */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setStatus("attending")}
                            className={`flex-1 py-4 rounded-2xl font-bold flex flex-col items-center gap-1 transition-all border-2 ${status === "attending"
                                ? "bg-pink-500 text-white border-pink-400 shadow-md ring-2 ring-pink-200"
                                : "bg-white/40 text-pink-700 border-white/60 hover:bg-white/60"
                                }`}
                        >
                            <PartyPopper className={`w-6 h-6 ${status === "attending" ? "text-white" : "text-pink-400"}`} />
                            <span className="text-xs uppercase tracking-wider">{t.rsvp.joyful}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setStatus("declined")}
                            className={`flex-1 py-4 rounded-2xl font-bold flex flex-col items-center gap-1 transition-all border-2 ${status === "declined"
                                ? "bg-gray-500 text-white border-gray-400 shadow-md ring-2 ring-gray-200"
                                : "bg-white/40 text-pink-700 border-white/60 hover:bg-white/60"
                                }`}
                        >
                            <Frown className={`w-6 h-6 ${status === "declined" ? "text-white" : "text-gray-400"}`} />
                            <span className="text-xs uppercase tracking-wider">{t.rsvp.regretful}</span>
                        </button>
                    </div>

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
                            className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-white/30 text-pink-900 placeholder-pink-300 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 outline-none transition-all shadow-inner"
                            placeholder="Your name..."
                        />
                    </div>

                    {status === "attending" && (
                        <>
                            <div className="space-y-2 text-left animate-in fade-in slide-in-from-top-2 duration-500">
                                <label className="block text-sm font-bold text-pink-700 uppercase tracking-widest pl-1">
                                    {t.rsvp.guests}
                                </label>
                                <div className="flex items-center gap-4 bg-white/40 p-2 rounded-2xl border border-white/30 w-fit">
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

                            <div className="space-y-2 text-left animate-in fade-in slide-in-from-top-2 duration-500">
                                <label className="block text-sm font-bold text-pink-700 uppercase tracking-widest pl-1">
                                    {t.rsvp.dietary}
                                </label>
                                <textarea
                                    value={dietary}
                                    onChange={(e) => setDietary(e.target.value)}
                                    className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-white/30 text-pink-900 placeholder-pink-300 focus:border-pink-400 outline-none transition-all shadow-inner resize-none h-24"
                                    placeholder="Any allergies or requests?"
                                />
                            </div>
                        </>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={!name || submitting}
                        className="w-full py-5 bg-pink-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg hover:shadow-pink-400/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                    >
                        {submitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            t.rsvp.submit
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
