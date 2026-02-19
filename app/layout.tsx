import type { Metadata } from "next";
import { Baloo_2, Poppins } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "¡Mia Cumple 2!",
  description: "¡Oh Two-dless! No podemos creerlo, pero sí, ¡es verdad!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${baloo.variable} ${poppins.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
