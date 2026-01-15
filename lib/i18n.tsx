"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en";

type Translations = {
    header: {
        brand: string;
    };
    footer: {
        developedBy: string;
    };
    landing: {
        cta: string;
    };
    eventInfo: {
        title: string;
        date: string;
        time: string;
        location: string;
        welcomeMsg: string;
    };
    rsvp: {
        title: string;
        fullName: string;
        attendance: string;
        joyful: string;
        regretful: string;
        guests: string;
        dietary: string;
        declineMessage: string;
        submit: string;
        success: string;
        error: string;
    };
    gifts: {
        title: string;
        card1Title: string;
        card1Desc: string;
        card2Title: string;
        card2Desc: string;
    };
    gallery: {
        title: string;
        upload: string;
    };
};

const translations: Record<Language, Translations> = {
    en: {
        header: {
            brand: "LIBBY'S BIRTHDAY",
        },
        footer: {
            developedBy: "Designed & Produced by Epica Events",
        },
        landing: {
            cta: "Open Invitation",
        },
        eventInfo: {
            title: "Libby is Turning 2!",
            date: "Sunday, January 18, 2026",
            time: "10:00 – 13:00",
            location: "Astralis Pool, Isla Verde",
            welcomeMsg: "Oh Two-dless! We can’t believe it, but yes, it’s true!\nJoin us for a magical celebration full of joy and sparkles.",
        },
        rsvp: {
            title: "RSVP",
            fullName: "Full Name",
            attendance: "Are you coming?",
            joyful: "I'll be there! 🎉",
            regretful: "Can't make it",
            guests: "Number of Guests",
            dietary: "Dietary Notes / Allergies",
            declineMessage: "We'll miss you! 💕",
            submit: "Confirm Attendance",
            success: "Thank you! Your response has been saved.",
            error: "Oops! Something went wrong. Please try again.",
        },
        gifts: {
            title: "Registry & Gifts",
            card1Title: "PayPal Gift",
            card1Desc: "Send a Gift with PayPal",
            card2Title: "Your Presence",
            card2Desc: "Your presence is the greatest gift 💕",
        },
        gallery: {
            title: "Gallery",
            upload: "Upload Photo",
        },
    },
};

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: Translations;
    toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang] = useState<Language>("en");

    return (
        <LanguageContext.Provider value={{ lang, setLang: () => { }, t: translations[lang], toggleLang: () => { } }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
