import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/adminAuth";

const ALLOWED_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
]);

const MAX_SIZE = 5 * 1024 * 1024;

function bad(message: string, status = 400) {
    return NextResponse.json({ ok: false, message }, { status });
}

function extFromFile(file: File) {
    const original = file.name || "";
    const ext = path.extname(original).toLowerCase();
    if (ext) return ext;

    switch (file.type) {
        case "image/jpeg":
            return ".jpg";
        case "image/png":
            return ".png";
        case "image/webp":
            return ".webp";
        case "image/gif":
            return ".gif";
        default:
            return "";
    }
}

export async function POST(req: Request) {
    if (!(await isAdminAuthed())) return bad("Unauthorized", 401);

    const formData = await req.formData().catch(() => null);
    if (!formData) return bad("잘못된 요청입니다.");

    const file = formData.get("file");
    if (!(file instanceof File)) return bad("파일이 없습니다.");

    if (!ALLOWED_TYPES.has(file.type)) {
        return bad("jpg/png/webp/gif 파일만 업로드할 수 있습니다.");
    }

    if (file.size > MAX_SIZE) {
        return bad("파일 크기는 5MB 이하만 가능합니다.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", "stores");
    await mkdir(uploadDir, { recursive: true });

    const safeExt = extFromFile(file) || ".jpg";
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2, 10)}${safeExt}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({
        ok: true,
        url: `/uploads/stores/${fileName}`,
    });
}