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
        <div className="fixed bottom-6 right-6 z-[60] animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <div className="bg-white/80 backdrop-blur-2xl p-4 rounded-[32px] shadow-2xl border border-white/60 flex items-center gap-4 transition-all hover:scale-105 active:scale-95 group">

                {/* Hidden Audio Element */}
                <audio ref={audioRef} src="/happy-birthday-eden.mp3" loop playsInline />

                {/* Animated Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${isAudioPlaying ? 'bg-pink-500 animate-pulse' : 'bg-gray-200'}`}>
                    <Music className={`w-6 h-6 ${isAudioPlaying ? 'text-white' : 'text-gray-400'}`} />
                </div>

                <div className="flex flex-col gap-1 pr-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-pink-400">
                        {isAudioPlaying ? "Now Playing" : "Tap for Music"}
                    </span>

                    <button
                        onClick={togglePlay}
                        className="flex items-center gap-2 bg-pink-100/50 hover:bg-pink-100 px-3 py-1.5 rounded-full transition-colors"
                    >
                        {isAudioPlaying ? (
                            <>
                                <Pause className="w-4 h-4 text-pink-600 fill-pink-600" />
                                <span className="text-xs font-bold text-pink-700">Pause</span>
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4 text-pink-600 fill-pink-600 ml-0.5" />
                                <span className="text-xs font-bold text-pink-700">Play Song</span>
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}
