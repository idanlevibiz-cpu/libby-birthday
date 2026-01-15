import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const RSVP_FILE = path.join(DATA_DIR, "rsvp.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Load existing RSVPs
        let rsvps = [];
        if (fs.existsSync(RSVP_FILE)) {
            const data = fs.readFileSync(RSVP_FILE, "utf-8");
            rsvps = JSON.parse(data);
        }

        // Add new entry
        const newRsvp = {
            ...body,
            id: Date.now(),
            timestamp: new Date().toISOString(),
        };
        rsvps.push(newRsvp);

        // Save back
        fs.writeFileSync(RSVP_FILE, JSON.stringify(rsvps, null, 2));

        return NextResponse.json({ success: true, rsvp: newRsvp });
    } catch (error) {
        console.error("RSVP Error:", error);
        return NextResponse.json({ success: false, error: "Failed to save RSVP" }, { status: 500 });
    }
}
