"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AdminStoreEditPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = Number(params.id);

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const [form, setForm] = useState({
        isActive: true,
        name: "",
        category: "",
        phone: "",
        addr1: "",
        addr2: "",
        addressDetail: "",
        lat: "",
        lng: "",
        thumbUrl: "",
        description: "",
    });

    function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
        setForm((p) => ({ ...p, [k]: v }));
    }

    async function load() {
        setErr(null);
        setLoading(true);
        try {
            const res = await fetch(`/api/admin-stores/${id}`, { cache: "no-store" });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.message || "불러오기 실패");

            const it = json.item;
            setForm({
                isActive: Boolean(it.isActive),
                name: it.name || "",
                category: it.category || "",
                phone: it.phone || "",
                addr1: it.addr1 || "",
                addr2: it.addr2 || "",
                addressDetail: it.addressDetail || "",
                lat: it.lat == null ? "" : String(it.lat),
                lng: it.lng == null ? "" : String(it.lng),
                thumbUrl: it.thumbUrl || "",
                description: it.description || "",
            });
        } catch (e: any) {
            setErr(e?.message || "에러");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!Number.isFinite(id)) return;
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    async function submit() {
        setErr(null);
        setLoading(true);
        try {
            const res = await fetch(`/api/admin-stores/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.message || "저장 실패");
            router.replace("/admin/stores");
        } catch (e: any) {
            setErr(e?.message || "에러");
        } finally {
            setLoading(false);
        }
    }

    async function remove() {
        if (!confirm("정말 삭제할까요?")) return;
        setLoading(true);
        try {
            await fetch(`/api/admin-stores/${id}`, { method: "DELETE" });
            router.replace("/admin/stores");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="text-lg font-bold">매장 수정</div>
                    <button
                        type="button"
                        onClick={remove}
                        className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-50"
                    >
                        삭제
                    </button>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <label className="space-y-1">
                        <div className="text-xs text-gray-600">매장명*</div>
                        <input className="w-full rounded-2xl border px-4 py-3 text-sm"
                               value={form.name} onChange={(e) => set("name", e.target.value)} />
                    </label>

                    <label className="space-y-1">
                        <div className="text-xs text-gray-600">업종*</div>
                        <input className="w-full rounded-2xl border px-4 py-3 text-sm"
                               value={form.category} onChange={(e) => set("category", e.target.value)} />
                    </label>

                    <label className="space-y-1">
                        <div className="text-xs text-gray-600">전화번호*</div>
                        <input className="w-full rounded-2xl border px-4 py-3 text-sm"
                               value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                    </label>

                    <label className="space-y-1">
                        <div className="text-xs text-gray-600">1차 지역*</div>
                        <input className="w-full rounded-2xl border px-4 py-3 text-sm"
                               value={form.addr1} onChange={(e) => set("addr1", e.target.value)} />
                    </label>

                    <label className="space-y-1">
                        <div className="text-xs text-gray-600">2차 지역</div>
                        <input className="w-full rounded-2xl border px-4 py-3 text-sm"
                               value={form.addr2} onChange={(e) => set("addr2", e.target.value)} />
                    </label>

                    <label className="space-y-1 md:col-span-2">
                        <div className="text-xs text-gray-600">상세 주소</div>
                        <input className="w-full rounded-2xl border px-4 py-3 text-sm"
                               value={form.addressDetail} onChange={(e) => set("addressDetail", e.target.value)} />
                    </label>

                    <label className="space-y-1">
                        <div className="text-xs text-gray-600">위도(lat)</div>
                        <input className="w-full rounded-2xl border px-4 py-3 text-sm"
                               value={form.lat} onChange={(e) => set("lat", e.target.value)} />
                    </label>

                    <label className="space-y-1">
                        <div className="text-xs text-gray-600">경도(lng)</div>
                        <input className="w-full rounded-2xl border px-4 py-3 text-sm"
                               value={form.lng} onChange={(e) => set("lng", e.target.value)} />
                    </label>

                    <label className="space-y-1 md:col-span-2">
                        <div className="text-xs text-gray-600">썸네일 이미지 URL</div>
                        <input className="w-full rounded-2xl border px-4 py-3 text-sm"
                               value={form.thumbUrl} onChange={(e) => set("thumbUrl", e.target.value)} />
                    </label>

                    <label className="space-y-1 md:col-span-2">
                        <div className="text-xs text-gray-600">소개글</div>
                        <textarea className="w-full rounded-2xl border px-4 py-3 text-sm"
                                  rows={4}
                                  value={form.description}
                                  onChange={(e) => set("description", e.target.value)}
                        />
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={(e) => set("isActive", e.target.checked)}
                        />
                        <span className="text-sm">활성</span>
                    </label>
                </div>

                {err && <div className="mt-3 text-sm text-red-600">{err}</div>}

                <div className="mt-6 flex gap-2">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-2xl border bg-white px-4 py-3 text-sm font-semibold hover:bg-gray-50"
                    >
                        취소
                    </button>
                    <button
                        type="button"
                        onClick={submit}
                        disabled={loading}
                        className="rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
                    >
                        {loading ? "저장 중…" : "저장"}
                    </button>
                </div>
            </div>
        </div>
    );
}