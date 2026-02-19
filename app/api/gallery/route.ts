import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // List all blobs (images)
        const { blobs } = await list();

        // Filter and map to URLs
        const images = blobs
            .filter(blob => /\.(jpg|jpeg|png|webp|gif)$/i.test(blob.pathname))
            .map(blob => blob.url);

        return NextResponse.json({ images });
    } catch (error) {
        console.error("Gallery Fetch Error:", error);
        return NextResponse.json({ images: [] });
    }
}
