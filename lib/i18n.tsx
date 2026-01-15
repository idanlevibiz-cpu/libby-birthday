"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es";

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
        whatsappBtn: string;
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
            title: "Join the Party (RSVP)",
            fullName: "Guest Name",
            attendance: "Will you come?",
            joyful: "I'll be there! (Accept)",
            regretful: "Can't make it (Decline)",
            guests: "Number of Guests",
            dietary: "Dietary Notes",
            declineMessage: "We'll miss you! Check out the gift registry below.",
            whatsappBtn: "RSVP on WhatsApp",
            submit: "Send RSVP",
            success: "Yay! You're on the list!",
            error: "Oops! Something went wrong. Try again.",
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
    es: {
        header: {
            brand: "CUMPLEAÑOS DE LIBBY",
        },
        footer: {
            developedBy: "Diseñado y Producido por Epica Events",
        },
        landing: {
            cta: "Abrir Invitación",
        },
        eventInfo: {
            title: "¡Libby Cumple 2!",
            date: "Domingo, 18 de Enero, 2026",
            time: "10:00 – 13:00",
            location: "Piscina Astralis, Isla Verde",
            welcomeMsg: "¡Oh Two-dless! No podemos creerlo, pero sí, ¡es verdad!\nÚnete a nosotros para una celebración mágica llena de alegría y brillos.",
        },
        rsvp: {
            title: "Únete a la Fiesta (RSVP)",
            fullName: "Nombre del Invitado",
            attendance: "¿Vendrás?",
            joyful: "¡Ahí estaré! (Aceptar)",
            regretful: "No podré ir (Declinar)",
            guests: "Número de Invitados",
            dietary: "Notas Dietéticas",
            declineMessage: "¡Te extrañaremos! Mira la lista de regalos abajo.",
            whatsappBtn: "RSVP por WhatsApp",
            submit: "Enviar RSVP",
            success: "¡Yay! Estás en la lista.",
            error: "¡Ups! Algo salió mal. Intenta de nuevo.",
        },
        gifts: {
            title: "Registro y Regalos",
            card1Title: "Regalo PayPal",
            card1Desc: "Enviar un regalo con PayPal",
            card2Title: "Tu Presencia",
            card2Desc: "Tu presencia es el mejor regalo 💕",
        },
        gallery: {
            title: "Galería",
            upload: "Subir Foto",
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
    const [lang, setLang] = useState<Language>("en");

    // Persist language selection
    useEffect(() => {
        const savedLang = localStorage.getItem("epica-lang") as Language;
        if (savedLang) {
            setLang(savedLang);
        }
    }, []);

    const toggleLang = () => {
        const newLang = lang === "en" ? "es" : "en";
        setLang(newLang);
        localStorage.setItem("epica-lang", newLang);
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], toggleLang }}>
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
