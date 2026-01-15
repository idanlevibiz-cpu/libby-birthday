"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { Loader2, ImageIcon, Camera, X, Trash2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Gallery() {
    const { t } = useLanguage();
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

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

    const handleDelete = async (url: string) => {
        const password = prompt("אנא הזן סיסמה למחיקה:");
        if (!password) return;

        setDeleting(url);
        try {
            const res = await fetch("/api/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, password }),
            });
            if (res.ok) {
                fetchImages();
            } else {
                const data = await res.json();
                alert(data.error || "המחיקה נכשלה");
            }
        } catch (e) {
            console.error("Delete failed", e);
            alert("שגיאה בחיבור לשרת");
        } finally {
            setDeleting(null);
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
                        className="aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-white/50 relative group"
                    >
                        <img
                            src={img}
                            alt={`Gallery ${idx}`}
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                                onClick={() => setSelectedImage(img)}
                                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                            >
                                <Maximize2 className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => handleDelete(img)}
                                disabled={deleting === img}
                                className="p-3 bg-red-500/80 backdrop-blur-md rounded-full text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                                {deleting === img ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <Trash2 className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            src={selectedImage}
                            alt="Enlarged gallery"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
