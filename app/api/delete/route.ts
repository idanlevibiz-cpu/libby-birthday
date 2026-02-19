import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

const DELETE_PASSWORD = "7789";

export async function POST(req: Request) {
    try {
        const { url, password } = await req.json();

        if (!url) {
            return NextResponse.json({ success: false, error: "No URL provided" }, { status: 400 });
        }

        if (password !== DELETE_PASSWORD) {
            return NextResponse.json({ success: false, error: "Incorrect password" }, { status: 403 });
        }

        // Delete from Vercel Blob
        await del(url);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
    }
}
