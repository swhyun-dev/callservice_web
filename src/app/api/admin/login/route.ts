import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/adminAuth";

export async function POST(req: Request) {
    const { password } = await req.json().catch(() => ({ password: "" }));
    const adminPw = process.env.ADMIN_PASSWORD || "";

    if (!adminPw || password !== adminPw) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }

    await setAdminSession();
    return NextResponse.json({ ok: true });
}