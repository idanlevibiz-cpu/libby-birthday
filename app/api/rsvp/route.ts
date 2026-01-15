import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Check if KV is configured
        if (!process.env.KV_REST_API_URL) {
            return NextResponse.json({
                success: false,
                error: "Database not connected. Please go to Vercel -> Storage -> Connect KV."
            }, { status: 500 });
        }

        const { name, guests, status, dietary } = await req.json();

        if (!name) {
            return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
        }

        const rsvpEntry = {
            id: Date.now().toString(),
            name,
            guests: status === 'attending' ? (guests || 1) : 0,
            status: status || "attending",
            dietary: dietary || "",
            timestamp: new Date().toISOString()
        };

        // Push to a list called "rsvps"
        await kv.lpush("rsvps", JSON.stringify(rsvpEntry));

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("RSVP Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to save RSVP"
        }, { status: 500 });
    }
}
