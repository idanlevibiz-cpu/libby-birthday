import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const password = searchParams.get("password");

        if (password !== "7789") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!process.env.KV_REST_API_URL) {
            return NextResponse.json({ error: "Database not connected" }, { status: 500 });
        }

        const rawRsvps = await kv.lrange("rsvps", 0, -1);

        // Parse strings back to objects
        const rsvps = rawRsvps.map((item: any) => {
            try {
                return typeof item === 'string' ? JSON.parse(item) : item;
            } catch (e) {
                return item;
            }
        });

        const stats = {
            totalGuests: 0,
            attending: 0,
            declined: 0,
            guestList: rsvps
        };

        rsvps.forEach((rsvp: any) => {
            if (rsvp && rsvp.status === "attending") {
                stats.attending++;
                stats.totalGuests += (Number(rsvp.guests) || 0);
            } else if (rsvp && rsvp.status === "declined") {
                stats.declined++;
            }
        });

        return NextResponse.json(stats);
    } catch (error) {
        console.error("Stats Error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
