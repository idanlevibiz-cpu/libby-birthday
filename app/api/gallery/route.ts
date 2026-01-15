import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        if (!fs.existsSync(uploadDir)) {
            return NextResponse.json({ images: [] });
        }

        const files = fs.readdirSync(uploadDir);
        const images = files
            .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
            .map(file => `/uploads/${file}`);

        return NextResponse.json({ images });
    } catch (error) {
        console.error("Gallery Fetch Error:", error);
        return NextResponse.json({ images: [] });
    }
}
