import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET() {
    if (!(await isAdminAuthed())) {
        return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    // ✅ 헤더 + 샘플 2~3행
    const data = [
        {
            name: "강남 콜서비스",
            category: "대리운전",
            phone: "02-1234-5678",
            addr1: "서울",
            addr2: "강남구",
            addressDetail: "테헤란로 123",
            lat: 37.498095,
            lng: 127.02761,
            description: "강남 지역 전문 콜서비스입니다.",
            thumbPath: "/images/stores/store1.jpg",
        },
        {
            name: "분당 콜서비스",
            category: "콜택시",
            phone: "031-345-6789",
            addr1: "경기",
            addr2: "성남시",
            addressDetail: "분당로 87",
            lat: 37.378225,
            lng: 127.115,
            description: "분당 전 지역 24시간 운영",
            thumbPath: "/images/stores/store2.jpg",
        },
    ];

    // ✅ 컬럼 순서 고정
    const header = [
        "name",
        "category",
        "phone",
        "addr1",
        "addr2",
        "addressDetail",
        "lat",
        "lng",
        "description",
        "thumbPath",
    ];

    const ws = XLSX.utils.json_to_sheet(data, { header });
    // 첫 행이 헤더로 들어가도록 보장
    XLSX.utils.sheet_add_aoa(ws, [header], { origin: "A1" });

    // 컬럼 너비(가독성)
    ws["!cols"] = [
        { wch: 18 }, // name
        { wch: 12 }, // category
        { wch: 16 }, // phone
        { wch: 8 },  // addr1
        { wch: 10 }, // addr2
        { wch: 22 }, // addressDetail
        { wch: 10 }, // lat
        { wch: 10 }, // lng
        { wch: 30 }, // description
        { wch: 26 }, // thumbPath
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "stores");

    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    return new NextResponse(buf, {
        status: 200,
        headers: {
            "Content-Type":
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": 'attachment; filename="store_import_template.xlsx"',
            "Cache-Control": "no-store",
        },
    });
}