import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const SECRET = process.env.ADMIN_SESSION_SECRET || "dev-secret-change-me";

function sign(value: string) {
    return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export async function setAdminSession() {
    const store = await cookies(); // ✅ await
    const payload = `ok.${Date.now()}`;
    const sig = sign(payload);

    store.set(COOKIE_NAME, `${payload}.${sig}`, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // secure: process.env.NODE_ENV === "production",
    });
}

export async function clearAdminSession() {
    const store = await cookies(); // ✅ await
    store.set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export async function isAdminAuthed(): Promise<boolean> {
    const store = await cookies(); // ✅ await
    const v = store.get(COOKIE_NAME)?.value;
    if (!v) return false;

    const parts = v.split(".");
    if (parts.length < 3) return false;

    const payload = parts.slice(0, 2).join(".");
    const sig = parts.slice(2).join(".");
    return sign(payload) === sig;
}