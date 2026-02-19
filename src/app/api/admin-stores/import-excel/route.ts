import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/db";
import { isAdminAuthed } from "@/lib/adminAuth";

function bad(message: string, status = 400) {
    return NextResponse.json({ ok: false, message }, { status });
}

function s(v: any) {
    return String(v ?? "").trim();
}
function n(v: any) {
    const t = String(v ?? "").trim();
    if (!t) return null;
    const num = Number(t);
    return Number.isFinite(num) ? num : null;
}

export async function POST(req: Request) {
    if (!(await isAdminAuthed())) return bad("Unauthorized", 401);

    const form = await req.formData().catch(() => null);
    if (!form) return bad("Invalid form-data");

    const file = form.get("file");
    if (!file || !(file instanceof Blob)) return bad("file is required");

    const buf = Buffer.from(await file.arrayBuffer());

    let workbook: XLSX.WorkBook;
    try {
        workbook = XLSX.read(buf, { type: "buffer" });
    } catch {
        return bad("엑셀 파일을 읽을 수 없습니다. (.xlsx/.xls 확인)");
    }

    const sheetName = workbook.SheetNames[0];
    if (!sheetName) return bad("시트가 비어 있습니다.");

    const ws = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<Record<string, any>>(ws, { defval: "" });

    if (!rows.length) return bad("엑셀에 데이터가 없습니다.");

    const errors: Array<{ row: number; message: string }> = [];
    let success = 0;

    // 성능: 너무 큰 파일 방지 (원하면 조정)
    if (rows.length > 2000) {
        return bad("한 번에 최대 2000행까지 업로드 가능합니다.");
    }

    // 트랜잭션으로 묶기 (중간 실패가 있어도 개별 row는 계속 진행하도록 설계)
    for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const rowNo = i + 2; // 헤더 1행 + 데이터 시작 2행 기준

        const name = s(r.name);
        const category = s(r.category);
        const phone = s(r.phone);
        const addr1 = s(r.addr1);

        const addr2 = s(r.addr2);
        const addressDetail = s(r.addressDetail);
        const lat = n(r.lat);
        const lng = n(r.lng);
        const description = s(r.description);
        const thumbPath = s(r.thumbPath);

        if (!name || !category || !phone || !addr1) {
            errors.push({
                row: rowNo,
                message: "필수값 누락(name/category/phone/addr1)",
            });
            continue;
        }

        try {
            await prisma.$transaction(async (tx) => {
                const created = await tx.store.create({
                    data: {
                        isActive: true,
                        name,
                        category,
                        phone,
                        addr1,
                        addr2,
                        addressDetail,
                        lat,
                        lng,
                        description,
                    },
                });

                // thumbPath 있으면 idx=0 이미지 등록
                if (thumbPath) {
                    await tx.storeImage.create({
                        data: {
                            storeId: created.id,
                            idx: 0,
                            imageUrl: thumbPath, // ✅ 엑셀에 있는 경로 문자열 그대로
                        },
                    });
                }
            });

            success++;
        } catch (e: any) {
            errors.push({
                row: rowNo,
                message: e?.message || "DB 등록 실패",
            });
        }
    }

    return NextResponse.json({
        ok: true,
        total: rows.length,
        success,
        fail: errors.length,
        errors,
    });
}