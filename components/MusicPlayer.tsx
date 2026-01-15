"use client";

import { useEffect, useRef } from "react";

interface MusicPlayerProps {
    isPlaying: boolean;
    videoUrl?: string; // e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ
}

export function MusicPlayer({ isPlaying, videoUrl }: MusicPlayerProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Get YouTube ID from URL
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = videoUrl ? getYouTubeId(videoUrl) : "F_fO2YI4g64";

    return (
        <div
            className="fixed top-0 left-0 w-[1px] h-[1px] opacity-0 pointer-events-none -z-50 overflow-hidden"
            aria-hidden="true"
        >
            {isPlaying && videoId && (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&mute=0&playsinline=1`}
                    allow="autoplay; encrypted-media"
                    title="Background Music"
                    width="1"
                    height="1"
                />
            )}
        </div>
    );
}
