export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthed } from "@/lib/adminAuth";

function bad(msg: string, status = 400) {
    return NextResponse.json({ ok: false, message: msg }, { status });
}

export async function GET(
    _req: Request,
    ctx: { params: Promise<{ slug: string }> } // ✅ params Promise
) {
    if (!(await isAdminAuthed())) return bad("Unauthorized", 401);

    const { slug } = await ctx.params; // ✅ await
    const s = String(slug || "").trim();
    if (!s) return bad("Invalid slug");

    const page = await prisma.page.findUnique({ where: { slug: s } });
    if (!page) return bad("Not found", 404);

    return NextResponse.json({
        ok: true,
        item: {
            slug: page.slug,
            title: page.title,
            content: page.content,
            isActive: page.isActive,
        },
    });
}

export async function PUT(
    req: Request,
    ctx: { params: Promise<{ slug: string }> } // ✅ params Promise
) {
    if (!(await isAdminAuthed())) return bad("Unauthorized", 401);

    const { slug } = await ctx.params; // ✅ await
    const s = String(slug || "").trim();
    if (!s) return bad("Invalid slug");

    const body = await req.json().catch(() => null);
    if (!body) return bad("Invalid JSON");

    const title = String(body.title || "").trim();
    const content = String(body.content || "").trim();
    const isActive = Boolean(body.isActive ?? true);

    if (!title) return bad("제목을 입력하세요.");
    if (!content) return bad("내용을 입력하세요.");

    const updated = await prisma.page.update({
        where: { slug: s },
        data: { title, content, isActive },
    });

    return NextResponse.json({ ok: true, slug: updated.slug });
}