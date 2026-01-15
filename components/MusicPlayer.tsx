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

    const videoId = videoUrl ? getYouTubeId(videoUrl) : "dQw4w9WgXcQ"; // Default placeholder if none provided

    if (!isPlaying || !videoId) return null;

    return (
        <div className="fixed opacity-0 pointer-events-none -z-50 w-0 h-0 overflow-hidden">
            <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0`}
                allow="autoplay"
                title="Background Music"
            />
        </div>
    );
}
