import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthed } from "@/lib/adminAuth";

function bad(msg: string, status = 400) {
    return NextResponse.json({ ok: false, message: msg }, { status });
}

export async function GET(req: Request) {
    if (!isAdminAuthed()) return bad("Unauthorized", 401);

    const url = new URL(req.url);
    const q = (url.searchParams.get("q") || "").trim();
    const addr1 = (url.searchParams.get("addr1") || "").trim();
    const isActive = url.searchParams.get("isActive"); // "1" | "0" | null

    const where: any = {};
    if (isActive === "1") where.isActive = true;
    if (isActive === "0") where.isActive = false;
    if (addr1) where.addr1 = addr1;

    if (q) {
        where.OR = [
            { name: { contains: q, mode: "insensitive" } },
            { category: { contains: q, mode: "insensitive" } },
            { phone: { contains: q } },
            { addr1: { contains: q, mode: "insensitive" } },
            { addr2: { contains: q, mode: "insensitive" } },
            { addressDetail: { contains: q, mode: "insensitive" } },
        ];
    }

    const items = await prisma.store.findMany({
        where,
        orderBy: { id: "desc" },
        include: { images: { orderBy: { idx: "asc" }, take: 1 } },
        take: 200,
    });

    return NextResponse.json({
        ok: true,
        items: items.map((s) => ({
            id: s.id,
            isActive: s.isActive,
            name: s.name,
            category: s.category,
            phone: s.phone,
            addr1: s.addr1,
            addr2: s.addr2,
            addressDetail: s.addressDetail,
            lat: s.lat,
            lng: s.lng,
            description: s.description,
            thumbUrl: s.images[0]?.imageUrl || null,
            updatedAt: s.updatedAt,
            createdAt: s.createdAt,
        })),
    });
}

export async function POST(req: Request) {
    if (!isAdminAuthed()) return bad("Unauthorized", 401);

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

    const created = await prisma.store.create({
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
                ? { create: [{ idx: 0, imageUrl: thumbUrl }] }
                : undefined,
        },
    });

    return NextResponse.json({ ok: true, id: created.id });
}