import { useState, useEffect, useRef } from "react";
import { Music, Play, Radio, Volume2 } from "lucide-react";

interface MusicPlayerProps {
    isPlaying: boolean;
    videoUrl?: string; // e.g. https://www.youtube.com/watch?v=F_fO2YI4g64
}

export function MusicPlayer({ isPlaying, videoUrl }: MusicPlayerProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [useBackup, setUseBackup] = useState(false);
    const [isBackupPlaying, setIsBackupPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Get YouTube ID
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);
        return (match && match[2].length === 11) ? match[2] : "wz-kLp6Ww7k";
    };

    const videoId = videoUrl ? getYouTubeId(videoUrl) : "wz-kLp6Ww7k";

    // Only show the player after the envelope is opened
    useEffect(() => {
        if (isPlaying) {
            setIsVisible(true);
        }
    }, [isPlaying]);

    const toggleBackup = () => {
        if (useBackup) {
            audioRef.current?.pause();
            setIsBackupPlaying(false);
            setUseBackup(false);
        } else {
            setUseBackup(true);
        }
    };

    const playBackup = () => {
        if (audioRef.current) {
            if (isBackupPlaying) {
                audioRef.current.pause();
                setIsBackupPlaying(false);
            } else {
                audioRef.current.play();
                setIsBackupPlaying(true);
            }
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[60] animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <div className="bg-white/70 backdrop-blur-2xl p-4 rounded-[32px] shadow-2xl border border-white/60 flex flex-col gap-3 w-[180px] md:w-[220px] group transition-all">

                {/* Header with Toggle */}
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-pink-500 rounded-lg flex items-center justify-center shadow-sm">
                            <Music className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-pink-600">Music</span>
                    </div>
                    <button
                        onClick={toggleBackup}
                        className={`text-[9px] font-bold px-2 py-1 rounded-full transition-colors ${useBackup ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-500'}`}
                        title="Switch to backup audio if YouTube fails"
                    >
                        {useBackup ? "YouTube" : "Backup"}
                    </button>
                </div>

                {/* THE MINI PLAYER AREA */}
                {!useBackup ? (
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/5 border border-pink-100/50 shadow-inner">
                        <iframe
                            key={videoId}
                            title="Background Music"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&mute=0&playsinline=1&modestbranding=1&rel=0`}
                            className="absolute inset-0 w-full h-full"
                            allow="autoplay; encrypted-media; picture-in-picture"
                        />
                    </div>
                ) : (
                    <div className="aspect-video rounded-2xl bg-pink-50 border border-pink-100 flex flex-col items-center justify-center gap-2">
                        <audio ref={audioRef} src="/party-birthday.mp3" loop />
                        <button
                            onClick={playBackup}
                            className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-pink-200 active:scale-90 transition-transform"
                        >
                            {isBackupPlaying ? <Volume2 className="w-6 h-6 animate-pulse" /> : <Play className="w-6 h-6 fill-white ml-1" />}
                        </button>
                        <span className="text-[8px] font-black text-pink-400 uppercase tracking-widest">Backup Player</span>
                    </div>
                )}

                {/* Helpful Tip */}
                <div className="flex items-center gap-2 px-1">
                    <Radio className={`w-3 h-3 ${isBackupPlaying || !useBackup ? 'text-green-500 animate-pulse' : 'text-gray-300'}`} />
                    <span className="text-[9px] font-bold text-pink-900/40 uppercase tracking-tighter">
                        {useBackup ? (isBackupPlaying ? "Playing Backup..." : "Press Play") : "Tap Play on Video"}
                    </span>
                </div>
            </div>
        </div>
    );
}
