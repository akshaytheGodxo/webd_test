import { createClient } from "@/lib/client";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const supabase = createClient();
        const { data, error } = await supabase.from("Test Table").select("*");
        if (error) {
            console.error("Error fetching data:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch(err) {
        console.error("Unexpected error:", err);
        return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
    }
}