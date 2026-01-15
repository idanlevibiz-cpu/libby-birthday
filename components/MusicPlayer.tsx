import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

interface MusicPlayerProps {
    isPlaying: boolean;
    videoUrl?: string;
}

export function MusicPlayer({ isPlaying, videoUrl }: MusicPlayerProps) {
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : "F_fO2YI4g64";
    };

    const videoId = videoUrl ? getYouTubeId(videoUrl) : "F_fO2YI4g64";

    // Load YouTube API
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player('youtube-player', {
                videoId: videoId,
                playerVars: {
                    autoplay: 1,
                    mute: 1,
                    playsinline: 1,
                    loop: 1,
                    playlist: videoId,
                    controls: 0,
                    enablejsapi: 1
                },
                events: {
                    onReady: (event: any) => {
                        if (isPlaying) {
                            event.target.playVideo();
                        }
                    }
                }
            });
        };
    }, []);

    // Sync play state
    useEffect(() => {
        if (isPlaying && playerRef.current?.playVideo) {
            playerRef.current.playVideo();
            setHasInteracted(true);
        }
    }, [isPlaying]);

    const toggleMute = () => {
        if (!playerRef.current) return;

        if (isMuted) {
            playerRef.current.unMute();
            playerRef.current.setVolume(100);
            playerRef.current.playVideo();
            setIsMuted(false);
        } else {
            playerRef.current.mute();
            setIsMuted(true);
        }
    };

    return (
        <>
            {/* PLAYER CONTAINER */}
            <div className="fixed top-0 left-0 w-0 h-0 overflow-hidden pointer-events-none -z-50 opacity-0">
                <div id="youtube-player" />
            </div>

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
