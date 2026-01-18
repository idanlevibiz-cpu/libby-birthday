import { useState, useEffect, useRef } from "react";
import { Music, Play, Pause, Volume2 } from "lucide-react";

interface MusicPlayerProps {
    isPlaying: boolean;
    videoUrl?: string; // Unused now, kept for prop compatibility
}

export function MusicPlayer({ isPlaying }: MusicPlayerProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Only show the player after the envelope is opened
    useEffect(() => {
        if (isPlaying) {
            setIsVisible(true);
            // Attempt autoplay since it was triggered by a user gesture (opening envelope)
            const timeoutId = setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play()
                        .then(() => setIsAudioPlaying(true))
                        .catch(e => console.log("Autoplay prevented or failed, user will need to click play:", e));
                }
            }, 1000); // Small delay for the animation
            return () => clearTimeout(timeoutId);
        }
    }, [isPlaying]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isAudioPlaying) {
            audioRef.current.pause();
            setIsAudioPlaying(false);
        } else {
            audioRef.current.play().catch(e => console.error("Playback failed:", e));
            setIsAudioPlaying(true);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-[60] animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <div className="bg-white/80 backdrop-blur-2xl p-2.5 rounded-[24px] shadow-xl border border-white/60 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group">

                {/* Hidden Audio Element */}
                <audio ref={audioRef} src="/happy-birthday-eden.mp3" loop playsInline />

                {/* Animated Icon */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${isAudioPlaying ? 'bg-pink-500 animate-pulse' : 'bg-gray-200'}`}>
                    <Music className={`w-4.5 h-4.5 ${isAudioPlaying ? 'text-white' : 'text-gray-400'}`} />
                </div>

                <div className="flex flex-col gap-0.5 pr-1">
                    <span className="text-[8px] font-black uppercase tracking-widest text-pink-400 leading-tight">
                        {isAudioPlaying ? "Now Playing" : "Tap for Music"}
                    </span>

                    <button
                        onClick={togglePlay}
                        className="flex items-center gap-1.5 bg-pink-100/50 hover:bg-pink-100 px-2.5 py-1 rounded-full transition-colors"
                    >
                        {isAudioPlaying ? (
                            <>
                                <Pause className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
                                <span className="text-[10px] font-bold text-pink-700">Pause</span>
                            </>
                        ) : (
                            <>
                                <Play className="w-3.5 h-3.5 text-pink-600 fill-pink-600 ml-0.5" />
                                <span className="text-[10px] font-bold text-pink-700">Play Song</span>
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}
