import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const password = searchParams.get("password");

        if (password !== "7789") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const rsvps = await kv.lrange("rsvps", 0, -1);

        const stats = {
            totalGuests: 0,
            attending: 0,
            declined: 0,
            guestList: rsvps
        };

        rsvps.forEach((rsvp: any) => {
            if (rsvp.status === "attending") {
                stats.attending++;
                stats.totalGuests += (rsvp.guests || 1);
            } else {
                stats.declined++;
            }
        });

        return NextResponse.json(stats);
    } catch (error) {
        console.error("Stats Error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
