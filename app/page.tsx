"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Envelope } from "@/components/Envelope";
import { Invitation } from "@/components/Invitation";
import { MusicPlayer } from "@/components/MusicPlayer";

export default function Home() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // REPLACE THIS WITH THE USER'S YOUTUBE LINK
  const youtubeLink = "https://www.youtube.com/watch?v=XqZsoesa55w";

  return (
    <main className="min-h-screen bg-cream-50 overflow-x-hidden flex flex-col">
      <Header />

      <MusicPlayer isPlaying={isEnvelopeOpen} videoUrl={youtubeLink} />

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

      {!isEnvelopeOpen && <Footer />}
    </main>
  );
}
