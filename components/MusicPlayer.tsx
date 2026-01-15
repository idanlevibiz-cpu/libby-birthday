import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
    isPlaying: boolean;
    videoUrl?: string; // Kept for compatibility but unused
}

export function MusicPlayer({ isPlaying }: MusicPlayerProps) {
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Sync play state with envelope interaction
    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => {
                console.log("Autoplay blocked, waiting for user interaction");
            });
            setHasInteracted(true);
        }
    }, [isPlaying]);

    const toggleMute = () => {
        if (!audioRef.current) return;

        if (isMuted) {
            audioRef.current.muted = false;
            audioRef.current.play().catch(console.error);
            setIsMuted(false);
        } else {
            audioRef.current.muted = true;
            setIsMuted(true);
        }
    };

    return (
        <>
            {/* LOCAL AUDIO PLAYER */}
            <audio
                ref={audioRef}
                src="/happy-birthday.mp3"
                loop
                muted={isMuted}
                playsInline
                className="hidden"
            />

            {/* FLOATING CONTROL */}
            {hasInteracted && (
                <button
                    onClick={toggleMute}
                    className="fixed bottom-6 right-6 z-[60] p-4 bg-white/60 backdrop-blur-md rounded-full text-pink-500 shadow-lg border border-white/40 hover:scale-110 active:scale-95 transition-all animate-in fade-in slide-in-from-bottom-4 duration-1000"
                >
                    {isMuted ? (
                        <div className="flex items-center gap-2 pr-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">Tap for Music</span>
                            <VolumeX className="w-6 h-6" />
                        </div>
                    ) : (
                        <Volume2 className="w-6 h-6 animate-pulse" />
                    )}
                </button>
            )}
        </>
    );
}
