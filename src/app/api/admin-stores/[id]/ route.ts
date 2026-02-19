import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthed } from "@/lib/adminAuth";

function bad(msg: string, status = 400) {
    return NextResponse.json({ ok: false, message: msg }, { status });
}

async function getId(ctx: { params: Promise<{ id: string }> }) {
    const { id } = await ctx.params; // ✅ await
    const n = Number(id);
    return Number.isFinite(n) ? n : NaN;
}

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
    if (!(await isAdminAuthed())) return bad("Unauthorized", 401);
    const id = await getId(ctx);
    if (!Number.isFinite(id)) return bad("Invalid id");

    const store = await prisma.store.findUnique({
        where: { id },
        include: { images: { orderBy: { idx: "asc" } } },
    });
    if (!store) return bad("Not found", 404);

    return NextResponse.json({
        ok: true,
        item: {
            id: store.id,
            isActive: store.isActive,
            name: store.name,
            category: store.category,
            phone: store.phone,
            addr1: store.addr1,
            addr2: store.addr2,
            addressDetail: store.addressDetail,
            lat: store.lat,
            lng: store.lng,
            description: store.description,
            thumbUrl: store.images.find((x) => x.idx === 0)?.imageUrl || null,
        },
    });
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
    if (!(await isAdminAuthed())) return bad("Unauthorized", 401);
    const id = await getId(ctx);
    if (!Number.isFinite(id)) return bad("Invalid id");

    const body = await req.json().catch(() => null);
    if (!body) return bad("Invalid JSON");

    const name = String(body.name || "").trim();
    const category = String(body.category || "").trim();
    const phone = String(body.phone || "").trim();
    const addr1 = String(body.addr1 || "").trim();
    const addr2 = String(body.addr2 || "").trim();
    const addressDetail = String(body.addressDetail || "").trim();
    const description = String(body.description || "").trim();
    const thumbUrl = String(body.thumbUrl || "").trim();
    const isActive = Boolean(body.isActive ?? true);

    const lat = body.lat === "" || body.lat == null ? null : Number(body.lat);
    const lng = body.lng === "" || body.lng == null ? null : Number(body.lng);

    if (!name) return bad("매장명을 입력하세요.");
    if (!category) return bad("업종을 입력하세요.");
    if (!phone) return bad("전화번호를 입력하세요.");
    if (!addr1) return bad("1차 지역을 입력하세요.");

    await prisma.store.update({
        where: { id },
        data: {
            isActive,
            name,
            category,
            phone,
            addr1,
            addr2,
            addressDetail,
            lat: Number.isFinite(lat) ? lat : null,
            lng: Number.isFinite(lng) ? lng : null,
            description,
            images: thumbUrl
                ? {
                    upsert: {
                        where: { storeId_idx: { storeId: id, idx: 0 } },
                        create: { idx: 0, imageUrl: thumbUrl },
                        update: { imageUrl: thumbUrl },
                    },
                }
                : undefined,
        },
    });

    return NextResponse.json({ ok: true, id });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
    if (!(await isAdminAuthed())) return bad("Unauthorized", 401);
    const id = await getId(ctx);
    if (!Number.isFinite(id)) return bad("Invalid id");

    const body = await req.json().catch(() => null);
    if (!body) return bad("Invalid JSON");
    if (typeof body.isActive !== "boolean") return bad("isActive(boolean) required");

    await prisma.store.update({ where: { id }, data: { isActive: body.isActive } });
    return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
    if (!(await isAdminAuthed())) return bad("Unauthorized", 401);
    const id = await getId(ctx);
    if (!Number.isFinite(id)) return bad("Invalid id");

    await prisma.store.delete({ where: { id } });
    return NextResponse.json({ ok: true });
}