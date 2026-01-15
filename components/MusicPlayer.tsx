import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
    isPlaying: boolean;
    videoUrl?: string;
}

export function MusicPlayer({ isPlaying, videoUrl }: MusicPlayerProps) {
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : "F_fO2YI4g64";
    };

    const videoId = videoUrl ? getYouTubeId(videoUrl) : "F_fO2YI4g64";

    // Track when the envelope opens to try and trigger audio
    useEffect(() => {
        if (isPlaying) {
            setHasInteracted(true);
        }
    }, [isPlaying]);

    return (
        <>
            {/* HIDDEN PLAYER */}
            <div
                className="fixed top-0 left-0 w-[1px] h-[1px] opacity-0 pointer-events-none -z-50 overflow-hidden"
                aria-hidden="true"
            >
                {hasInteracted && !isMuted && (
                    <iframe
                        key={`${videoId}-${isMuted}`}
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&mute=0&playsinline=1&enablejsapi=1`}
                        allow="autoplay; encrypted-media"
                        title="Background Music"
                        width="1"
                        height="1"
                    />
                )}
            </div>

            {/* FLOATING CONTROL */}
            {hasInteracted && (
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="fixed bottom-6 right-6 z-[60] p-4 bg-white/60 backdrop-blur-md rounded-full text-pink-500 shadow-lg border border-white/40 hover:scale-110 active:scale-95 transition-all animate-in fade-in slide-in-from-bottom-4 duration-1000"
                    aria-label={isMuted ? "Play Music" : "Mute Music"}
                >
                    {isMuted ? (
                        <VolumeX className="w-6 h-6" />
                    ) : (
                        <Volume2 className="w-6 h-6 animate-pulse" />
                    )}
                </button>
            )}
        </>
    );
}
