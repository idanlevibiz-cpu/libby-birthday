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
        amazonWishlist: string;
        giftTiers: {
            t20: string;
            t30: string;
            t40: string;
        };
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
            amazonWishlist: "Amazon Wishlist",
            giftTiers: {
                t20: "A toy for Libby (and 5 minutes of peace for us!) 🧸",
                t30: "A stylish dress from Zara (fashion first!) 👗",
                t40: "Parent's Survival Kit (Coffee + Wine + Earplugs) ☕🍷",
            },
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
            title: "RSVP",
            fullName: "Nombre Completo",
            attendance: "¿Vendrás?",
            joyful: "¡Ahí estaré! 🎉",
            regretful: "No podré ir",
            guests: "Número de Invitados",
            dietary: "Notas Dietéticas / Alergias",
            declineMessage: "¡Te extrañaremos! 💕",
            submit: "Confirmar Asistencia",
            success: "¡Gracias! Tu respuesta ha sido guardada.",
            error: "¡Ups! Algo salió mal. Por favor, intenta de nuevo.",
        },
        gifts: {
            title: "Registro y Regalos",
            card1Title: "Regalo PayPal",
            card1Desc: "Enviar un regalo con PayPal",
            card2Title: "Tu Presencia",
            card2Desc: "Tu presencia es el mejor regalo 💕",
            amazonWishlist: "Lista de Deseos Amazon",
            giftTiers: {
                t20: "Un juguete para Libby (¡y 5 minutos de paz!) 🧸",
                t30: "Un vestido de Zara (¡la moda es lo primero!) 👗",
                t40: "Kit de Supervivencia (Café + Vino + Tapones) ☕🍷",
            },
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
