"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Envelope } from "@/components/Envelope";
import { Invitation } from "@/components/Invitation";
import { MusicPlayer } from "@/components/MusicPlayer";

export default function Home() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  return (
    <main className="min-h-screen bg-cream-50 overflow-x-hidden flex flex-col">
      <Header />

      <div className="flex-1 relative">
        {!isEnvelopeOpen ? (
          <Envelope onOpen={() => setIsEnvelopeOpen(true)} />
        ) : (
          <div className="animate-in fade-in zoom-in duration-1000">
            <Invitation />
            <Footer />
          </div>
        )}
      </div>

      <MusicPlayer isPlaying={isEnvelopeOpen} />

      {!isEnvelopeOpen && <Footer />}
    </main>
  );
}
