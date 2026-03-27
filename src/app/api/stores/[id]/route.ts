export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function bad(msg: string, status = 400) {
    return NextResponse.json({ ok: false, message: msg }, { status });
}

export async function GET(
    _req: Request,
    ctx: { params: Promise<{ id: string }> } // ✅ params Promise
) {
    const { id } = await ctx.params; // ✅ await
    const storeId = Number(id);
    if (!Number.isFinite(storeId)) return bad("Invalid id");

    const store = await prisma.store.findUnique({
        where: { id: storeId },
        include: { images: { orderBy: { idx: "asc" } } },
    });

    if (!store || !store.isActive) return bad("Not found", 404);

    return NextResponse.json({
        ok: true,
        item: {
            id: store.id,
            name: store.name,
            category: store.category,
            phone: store.phone,
            addr1: store.addr1,
            addr2: store.addr2,
            addressDetail: store.addressDetail,
            lat: store.lat,
            lng: store.lng,
            description: store.description,
            images: store.images.map((x) => ({ idx: x.idx, imageUrl: x.imageUrl })),
        },
    });
}