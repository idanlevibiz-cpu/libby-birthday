"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { Loader2, ImageIcon, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Gallery() {
    const { t } = useLanguage();
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    const fetchImages = async () => {
        try {
            const res = await fetch("/api/gallery");
            const data = await res.json();
            setImages(data.images);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                fetchImages();
            }
        } catch (e) {
            console.error("Upload failed", e);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col items-center gap-3 mb-8">
                <div className="p-4 bg-pink-400/20 rounded-full">
                    <ImageIcon className="w-10 h-10 text-pink-500" />
                </div>
                <h2 className="font-serif text-4xl text-center text-pink-600 drop-shadow-sm">{t.gallery.title}</h2>

                {/* Upload Section */}
                <div className="mt-4 p-6 bg-white/40 rounded-3xl border-2 border-dashed border-pink-300 text-center w-full max-w-sm">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                        id="file-upload"
                        className="hidden"
                    />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center gap-2 group"
                    >
                        <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                            {uploading ? (
                                <Loader2 className="w-6 h-6 text-pink-500 animate-spin" />
                            ) : (
                                <Camera className="w-6 h-6 text-pink-500" />
                            )}
                        </div>
                        <span className="text-pink-700 font-bold uppercase tracking-wide text-sm group-hover:text-pink-600">
                            {uploading ? "Uploading..." : t.gallery.upload}
                        </span>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {images.length === 0 && (
                    <div className="col-span-full py-12 text-center text-pink-900/40 italic text-sm border-2 border-dashed border-pink-200 rounded-3xl bg-white/30">
                        Photos coming soon...
                    </div>
                )}
                {images.map((img, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white/50"
                    >
                        <img
                            src={img}
                            alt={`Gallery ${idx}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
