import { useState, useEffect } from "react";
import { Music, Play } from "lucide-react";

interface MusicPlayerProps {
    isPlaying: boolean;
    videoUrl?: string; // e.g. https://www.youtube.com/watch?v=F_fO2YI4g64
}

export function MusicPlayer({ isPlaying, videoUrl }: MusicPlayerProps) {
    const [isVisible, setIsVisible] = useState(false);

    // Get YouTube ID
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);
        return (match && match[2].length === 11) ? match[2] : "F_fO2YI4g64";
    };

    const videoId = videoUrl ? getYouTubeId(videoUrl) : "F_fO2YI4g64";

    // Only show the player after the envelope is opened
    useEffect(() => {
        if (isPlaying) {
            setIsVisible(true);
        }
    }, [isPlaying]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[60] animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <div className="bg-white/60 backdrop-blur-xl p-3 rounded-[24px] shadow-2xl border border-white/60 flex flex-col gap-2 w-[160px] md:w-[200px] group transition-all hover:scale-105 active:scale-95">
                {/* Header/Indicator */}
                <div className="flex items-center gap-2 px-1">
                    <div className="w-5 h-5 bg-pink-500 rounded-lg flex items-center justify-center">
                        <Music className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-pink-600">Now Playing</span>
                </div>

                {/* THE MINI PLAYER */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black/5 border border-pink-100/50">
                    <iframe
                        title="Background Music"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&mute=0&playsinline=1&modestbranding=1&rel=0`}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* Helpful Tip */}
                <div className="flex items-center gap-1.5 px-1 animate-pulse">
                    <Play className="w-2.5 h-2.5 text-pink-400 fill-pink-400" />
                    <span className="text-[8px] font-bold text-pink-400 uppercase tracking-tighter">Tap Play for Music</span>
                </div>
            </div>
        </div>
    );
}
