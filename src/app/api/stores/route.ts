import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client"; // ✅ 추가

function parseIntSafe(v: string | null, def: number) {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : def;
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const addr1 = url.searchParams.get("addr1") || "전체";
    const addr2 = url.searchParams.get("addr2") || "";
    const category = (url.searchParams.get("category") || "").trim(); // ✅ 추가
    const q = (url.searchParams.get("q") || "").trim();

    const page = parseIntSafe(url.searchParams.get("page"), 1);
    const pageSize = Math.min(parseIntSafe(url.searchParams.get("pageSize"), 20), 50);

    const where: Prisma.StoreWhereInput = { isActive: true };

    if (addr1 && addr1 !== "전체") where.addr1 = addr1;
    if (addr2) where.addr2 = addr2;
    if (category) where.category = category; // ✅ 추가

    if (q) {
        where.OR = [
            { name: { contains: q, mode: "insensitive" } },
            { category: { contains: q, mode: "insensitive" } },
            { phone: { contains: q } },
            { addressDetail: { contains: q, mode: "insensitive" } },
        ];
    }

    const [total, items] = await Promise.all([
        prisma.store.count({ where }),
        prisma.store.findMany({
            where,
            orderBy: { id: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
            include: {
                images: { orderBy: { idx: "asc" }, take: 1 },
            },
        }),
    ]);

    return NextResponse.json({
        page,
        pageSize,
        total,
        items: items.map((s: (typeof items)[number]) => ({
            id: s.id,
            name: s.name,
            category: s.category,
            phone: s.phone,
            addr1: s.addr1,
            addr2: s.addr2,
            addressDetail: s.addressDetail,
            lat: s.lat,
            lng: s.lng,
            thumbUrl: s.images[0]?.imageUrl || null,
        })),
    });
}