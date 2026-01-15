import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, guests, status, dietary } = await req.json();

        if (!name) {
            return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
        }

        const rsvpEntry = {
            id: Date.now().toString(),
            name,
            guests: guests || 1,
            status: status || "attending", // "attending" or "declined"
            dietary: dietary || "",
            timestamp: new Date().toISOString()
        };

        // Push to a list called "rsvps"
        await kv.lpush("rsvps", rsvpEntry);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("RSVP Error:", error);
        return NextResponse.json({ success: false, error: "Failed to save RSVP" }, { status: 500 });
    }
}
