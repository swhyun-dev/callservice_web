"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

function toLabel(slug: string) {
    if (slug === "about") return "회사소개";
    if (slug === "support") return "고객센터";
    return slug;
}

export default function AdminPageEdit() {
    const router = useRouter();
    const params = useParams<{ slug: string }>();
    const slug = String(params.slug || "");

    const label = useMemo(() => toLabel(slug), [slug]);

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const [form, setForm] = useState({
        title: "",
        content: "",
        isActive: true,
    });

    function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
        setForm((p) => ({ ...p, [k]: v }));
    }

    async function load() {
        setErr(null);
        setLoading(true);
        try {
            const res = await fetch(`/api/admin-pages/${slug}`, { cache: "no-store" });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.message || "불러오기 실패");
            setForm({
                title: json.item.title || "",
                content: json.item.content || "",
                isActive: Boolean(json.item.isActive),
            });
        } catch (e: any) {
            setErr(e?.message || "에러");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!slug) return;
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    async function save() {
        setErr(null);
        setLoading(true);
        try {
            const res = await fetch(`/api/admin-pages/${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.message || "저장 실패");
            router.replace("/admin/pages");
        } catch (e: any) {
            setErr(e?.message || "에러");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-lg font-bold">{label} 편집</div>
                        <div className="mt-1 text-sm text-gray-600">
                            slug: <span className="font-mono">{slug}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-2xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                        >
                            취소
                        </button>
                        <button
                            type="button"
                            onClick={save}
                            disabled={loading}
                            className="rounded-2xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                        >
                            {loading ? "저장 중…" : "저장"}
                        </button>
                    </div>
                </div>

                {err && <div className="mt-3 text-sm text-red-600">{err}</div>}

                <div className="mt-6 grid gap-3">
                    <label className="space-y-1">
                        <div className="text-xs text-gray-600">제목</div>
                        <input
                            value={form.title}
                            onChange={(e) => set("title", e.target.value)}
                            className="w-full rounded-2xl border px-4 py-3 text-sm"
                            placeholder="예) 회사소개"
                        />
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={(e) => set("isActive", e.target.checked)}
                        />
                        <span className="text-sm">페이지 노출(활성)</span>
                    </label>

                    <div className="grid gap-3 lg:grid-cols-2">
                        <label className="space-y-1">
                            <div className="text-xs text-gray-600">내용(HTML)</div>
                            <textarea
                                value={form.content}
                                onChange={(e) => set("content", e.target.value)}
                                className="min-h-[320px] w-full rounded-2xl border px-4 py-3 text-sm font-mono"
                                placeholder={`<p>${label} 내용을 입력하세요.</p>`}
                            />
                            <div className="text-[11px] text-gray-500">
                                HTML을 그대로 저장합니다. (p, br, strong, a 등 사용 가능)
                            </div>
                        </label>

                        <div className="space-y-1">
                            <div className="text-xs text-gray-600">미리보기</div>
                            <div className="min-h-[320px] rounded-2xl border bg-white p-4">
                                <div className="text-lg font-bold">{form.title || label}</div>
                                <div
                                    className="prose prose-sm mt-4 max-w-none"
                                    dangerouslySetInnerHTML={{ __html: form.content || "" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}