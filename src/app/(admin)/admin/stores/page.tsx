"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type StoreRow = {
    id: number;
    isActive: boolean;
    name: string;
    category: string;
    phone: string;
    addr1: string;
    addr2: string;
    addressDetail: string;
    thumbUrl: string | null;
};

const ADDR1 = [
    "", "서울","경기","인천","강원","대전","세종","충북","충남","광주","전북","전남","대구","경북","부산","울산","경남","제주",
];

export default function AdminStoresPage() {
    const [q, setQ] = useState("");
    const [addr1, setAddr1] = useState("");
    const [active, setActive] = useState<"" | "1" | "0">("");
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<StoreRow[]>([]);
    const [err, setErr] = useState<string | null>(null);

    const qs = useMemo(() => {
        const sp = new URLSearchParams();
        if (q.trim()) sp.set("q", q.trim());
        if (addr1) sp.set("addr1", addr1);
        if (active) sp.set("isActive", active);
        return sp.toString();
    }, [q, addr1, active]);

    async function load() {
        setErr(null);
        setLoading(true);
        try {
            const res = await fetch(`/api/admin-stores?${qs}`, { cache: "no-store" });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.message || "불러오기 실패");
            setItems(json.items || []);
        } catch (e: any) {
            setErr(e?.message || "에러");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qs]);

    async function toggleActive(id: number, isActive: boolean) {
        await fetch(`/api/admin-stores/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive }),
        });
        load();
    }

    return (
        <div className="space-y-4">
            <div className="rounded-3xl border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <div className="text-lg font-bold">매장 관리</div>
                        <div className="mt-1 text-sm text-gray-600">
                            검색/등록/수정/활성화 관리
                        </div>
                    </div>
                    <Link
                        href="/admin/stores/new"
                        className="admin-btn rounded-2xl px-4 py-2 text-sm font-semibold"
                    >
                        + 매장 등록
                    </Link>
                    <Link
                        href="/admin/stores/import"
                        className="admin-btn-outline rounded-2xl px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                    >
                        엑셀 등록
                    </Link>
                </div>

                <div className="mt-4 grid gap-2 md:grid-cols-4">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="검색(이름/업종/주소/전화)"
                        className="rounded-2xl border px-4 py-3 text-sm"
                    />

                    <select
                        value={addr1}
                        onChange={(e) => setAddr1(e.target.value)}
                        className="rounded-2xl border bg-white px-4 py-3 text-sm"
                    >
                        {ADDR1.map((v) => (
                            <option key={v} value={v}>
                                {v ? v : "전체 지역"}
                            </option>
                        ))}
                    </select>

                    <select
                        value={active}
                        onChange={(e) => setActive(e.target.value as any)}
                        className="rounded-2xl border bg-white px-4 py-3 text-sm"
                    >
                        <option value="">전체 상태</option>
                        <option value="1">활성</option>
                        <option value="0">비활성</option>
                    </select>

                    <button
                        type="button"
                        onClick={load}
                        className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold hover:bg-gray-50"
                    >
                        {loading ? "불러오는 중…" : "새로고침"}
                    </button>
                </div>

                {err && <div className="mt-3 text-sm text-red-600">{err}</div>}
            </div>

            <div className="rounded-3xl border bg-white shadow-sm">
                <div className="divide-y">
                    {items.map((s) => (
                        <div key={s.id} className="flex items-center gap-4 p-4">
                            <div className="h-14 w-14 overflow-hidden rounded-2xl bg-gray-100">
                                {s.thumbUrl ? (
                                    <img src={s.thumbUrl} alt={s.name} className="h-full w-full object-cover" />
                                ) : null}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <div className="truncate text-sm font-semibold">{s.name}</div>
                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700">
                    {s.category}
                  </span>
                                    {!s.isActive && (
                                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] text-red-700">
                      비활성
                    </span>
                                    )}
                                </div>
                                <div className="mt-1 line-clamp-1 text-xs text-gray-600">
                                    {s.addr1} {s.addr2} {s.addressDetail}
                                </div>
                                <div className="mt-1 text-xs text-gray-800">{s.phone}</div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/src/app/admin/stores/${s.id}/edit`}
                                    className="rounded-full border bg-white px-3 py-2 text-xs font-semibold hover:bg-gray-50"
                                >
                                    수정
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => toggleActive(s.id, !s.isActive)}
                                    className="rounded-full bg-gray-900 px-3 py-2 text-xs font-semibold text-white"
                                >
                                    {s.isActive ? "비활성" : "활성"}
                                </button>
                            </div>
                        </div>
                    ))}

                    {!loading && items.length === 0 && (
                        <div className="p-8 text-center text-sm text-gray-500">
                            데이터가 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}