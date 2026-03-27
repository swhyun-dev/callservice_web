"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useMemo, useState } from "react";
import StoreCard from "@/components/stores/StoreCard";
import StoreListItem from "@/components/stores/StoreListItem";
import StoreFilterBarCarrot, { FilterState } from "@/components/stores/StoreFilterBarCarrot";

type StoreItem = {
    id: number;
    name: string;
    category: string;
    phone: string;
    addr1: string;
    addr2: string;
    addressDetail: string;
    thumbUrl: string | null;
};

type ApiResp = {
    page: number;
    pageSize: number;
    total: number;
    items: StoreItem[];
};

const ADDR1 = [
    "전체",
    "서울",
    "경기",
    "인천",
    "강원",
    "대전",
    "세종",
    "충북",
    "충남",
    "광주",
    "전북",
    "전남",
    "대구",
    "경북",
    "부산",
    "울산",
    "경남",
    "제주",
];

function buildQuery(state: FilterState, page: number) {
    const sp = new URLSearchParams();
    if (state.addr1 && state.addr1 !== "전체") sp.set("addr1", state.addr1);
    if (state.addr2) sp.set("addr2", state.addr2);
    if (state.category) sp.set("category", state.category);
    if (state.q.trim()) sp.set("q", state.q.trim());
    if (page > 1) sp.set("page", String(page));
    sp.set("pageSize", "24");
    return sp.toString();
}

export default function HomePage() {
    const [filter, setFilter] = useState<FilterState>({
        addr1: "전체",
        addr2: "",
        category: "",
        q: "",
    });

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ApiResp | null>(null);

    // URL → state 초기화
    useEffect(() => {
        const sp = new URLSearchParams(window.location.search);
        const addr1 = sp.get("addr1") || "전체";
        const addr2 = sp.get("addr2") || "";
        const category = sp.get("category") || "";
        const q = sp.get("q") || "";
        setFilter({ addr1, addr2, category, q });
    }, []);

    // state → URL
    useEffect(() => {
        const sp = new URLSearchParams();
        if (filter.addr1 && filter.addr1 !== "전체") sp.set("addr1", filter.addr1);
        if (filter.addr2) sp.set("addr2", filter.addr2);
        if (filter.category) sp.set("category", filter.category);
        if (filter.q.trim()) sp.set("q", filter.q.trim());
        const qs = sp.toString();
        window.history.replaceState(null, "", qs ? `/?${qs}` : "/");
    }, [filter]);

    // fetch
    useEffect(() => {
        let dead = false;
        async function run() {
            setLoading(true);
            try {
                const qs = buildQuery(filter, page);
                const res = await fetch(`/api/stores?${qs}`, { cache: "no-store" });
                const json = (await res.json()) as ApiResp;
                if (!dead) setData(json);
            } finally {
                if (!dead) setLoading(false);
            }
        }
        run();
        return () => {
            dead = true;
        };
    }, [filter, page]);

    // 2차 옵션(현재 결과 기반)
    const addr2Options = useMemo(() => {
        if (!data?.items?.length) return [];
        if (filter.addr1 === "전체") return [];
        const set = new Set<string>();
        for (const it of data.items) {
            if (it.addr1 === filter.addr1 && it.addr2) set.add(it.addr2);
        }
        return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
    }, [data, filter.addr1]);

    // 업종 옵션(현재 결과 기반)
    const categoryOptions = useMemo(() => {
        if (!data?.items?.length) return [];
        if (filter.addr1 === "전체") return [];
        const set = new Set<string>();
        for (const it of data.items) {
            if (filter.addr1 !== "전체" && it.addr1 !== filter.addr1) continue;
            if (filter.addr2 && it.addr2 !== filter.addr2) continue;
            if (it.category) set.add(it.category);
        }
        return Array.from(set).sort((a, b) => a.localeCompare(b, "ko"));
    }, [data, filter.addr1, filter.addr2]);

    return (
        <div className="space-y-4">
            {/* ✅ 지역 드롭다운 + 업종 태그 */}
            <StoreFilterBarCarrot
                value={filter}
                onChangeAction={setFilter}
                addr1Options={ADDR1}
                addr2Options={addr2Options}
                categoryOptions={categoryOptions}
                loading={loading}
            />

            {/* 결과 표시 */}
            <div className="px-4 text-xs text-gray-500">
                {loading ? "불러오는 중…" : `검색 결과 ${data?.total ?? 0}개`}
            </div>

            {/* ✅ 모바일: 당근형 1열 리스트 */}
            <div className="md:hidden">
                <div className="bg-white">
                    {data?.items?.map((s) => (
                        <StoreListItem key={s.id} {...s} />
                    ))}
                </div>
            </div>

            {/* ✅ PC: 카드 그리드 */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
                {data?.items?.map((s) => (
                    <StoreCard key={s.id} {...s} />
                ))}
            </div>

            {/* 페이지네이션 */}
            <div className="flex items-center justify-center gap-2 py-6">
                <button
                    type="button"
                    disabled={loading || page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="rounded-full border bg-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
                >
                    이전
                </button>
                <div className="text-sm text-gray-600">페이지 {page}</div>
                <button
                    type="button"
                    disabled={loading || (data ? page * data.pageSize >= data.total : true)}
                    onClick={() => setPage((p) => p + 1)}
                    className="rounded-full border bg-white px-4 py-2 text-sm font-semibold disabled:opacity-50"
                >
                    다음
                </button>
            </div>
        </div>
    );
}