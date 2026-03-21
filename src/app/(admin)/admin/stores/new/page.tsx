"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { ChangeEvent, useMemo, useState } from "react";
import { ImagePlus, Loader2, MapPinned, Save, Upload } from "lucide-react";

declare global {
    interface Window {
        daum?: {
            Postcode: new (options: {
                oncomplete: (data: {
                    zonecode: string;
                    roadAddress: string;
                    jibunAddress: string;
                    address: string;
                }) => void;
            }) => {
                open: () => void;
            };
        };
    }
}

type StoreForm = {
    isActive: boolean;
    name: string;
    category: string;
    phone: string;
    zipCode: string;
    address: string;
    addressDetail: string;
    lat: string;
    lng: string;
    thumbUrl: string;
    description: string;
};

const initialForm: StoreForm = {
    isActive: true,
    name: "",
    category: "",
    phone: "",
    zipCode: "",
    address: "",
    addressDetail: "",
    lat: "",
    lng: "",
    thumbUrl: "",
    description: "",
};

export default function AdminStoreNewPage() {
    const router = useRouter();

    const [form, setForm] = useState<StoreForm>(initialForm);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    function set<K extends keyof StoreForm>(key: K, value: StoreForm[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    const previewUrl = useMemo(() => form.thumbUrl.trim(), [form.thumbUrl]);

    function openPostcode() {
        if (!window.daum?.Postcode) {
            alert("주소 검색 스크립트가 아직 로드되지 않았습니다.");
            return;
        }

        new window.daum.Postcode({
            oncomplete: (data) => {
                const address = data.roadAddress || data.address || data.jibunAddress || "";
                set("zipCode", data.zonecode || "");
                set("address", address);
            },
        }).open();
    }

    async function uploadFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setErr(null);
        setUploading(true);

        try {
            const fd = new FormData();
            fd.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: fd,
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json?.message || "업로드 실패");

            set("thumbUrl", json.url || "");
        } catch (e: any) {
            setErr(e?.message || "이미지 업로드 중 오류가 발생했습니다.");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    }

    async function submit() {
        setErr(null);
        setLoading(true);

        try {
            const res = await fetch("/api/admin-stores", {
                method: "POST",
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

    return (
        <>
            <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="afterInteractive" />

            <div className="space-y-6">
                <section className="admin-card rounded-[28px] p-6 md:p-7">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                                매장 등록
                            </div>
                            <div className="mt-2 text-sm leading-6 text-slate-600">
                                주소 검색 / 대표 이미지 / 노출 여부를 함께 설정할 수 있습니다.
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            대표 이미지 URL 또는 파일 업로드 지원
                        </div>
                    </div>
                </section>

                <section className="admin-card rounded-[28px] p-6 md:p-7">
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="space-y-2">
                            <div className="text-xs font-semibold text-slate-600">매장명 *</div>
                            <input
                                className="w-full px-4 py-3 text-sm"
                                value={form.name}
                                onChange={(e) => set("name", e.target.value)}
                                placeholder="예: 강남콜택시"
                            />
                        </label>

                        <label className="space-y-2">
                            <div className="text-xs font-semibold text-slate-600">업종 *</div>
                            <input
                                className="w-full px-4 py-3 text-sm"
                                value={form.category}
                                onChange={(e) => set("category", e.target.value)}
                                placeholder="예: 콜택시 / 대리운전"
                            />
                        </label>

                        <label className="space-y-2">
                            <div className="text-xs font-semibold text-slate-600">전화번호 *</div>
                            <input
                                className="w-full px-4 py-3 text-sm"
                                value={form.phone}
                                onChange={(e) => set("phone", e.target.value)}
                                placeholder="예: 02-1234-5678"
                            />
                        </label>

                        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <input
                                type="checkbox"
                                checked={form.isActive}
                                onChange={(e) => set("isActive", e.target.checked)}
                            />
                            <span className="text-sm font-medium text-slate-700">사용자 페이지에 노출</span>
                        </label>

                        <label className="space-y-2">
                            <div className="text-xs font-semibold text-slate-600">우편번호</div>
                            <div className="flex gap-2">
                                <input
                                    className="w-full px-4 py-3 text-sm"
                                    value={form.zipCode}
                                    onChange={(e) => set("zipCode", e.target.value)}
                                    placeholder="주소 검색으로 입력"
                                    readOnly
                                />
                                <button
                                    type="button"
                                    onClick={openPostcode}
                                    className="admin-btn-outline shrink-0"
                                >
                                    <MapPinned className="h-4 w-4" />
                                    <span>주소찾기</span>
                                </button>
                            </div>
                        </label>

                        <label className="space-y-2">
                            <div className="text-xs font-semibold text-slate-600">주소 *</div>
                            <input
                                className="w-full px-4 py-3 text-sm"
                                value={form.address}
                                onChange={(e) => set("address", e.target.value)}
                                placeholder="주소찾기 또는 직접 입력"
                            />
                        </label>

                        <label className="space-y-2 md:col-span-2">
                            <div className="text-xs font-semibold text-slate-600">상세주소</div>
                            <input
                                className="w-full px-4 py-3 text-sm"
                                value={form.addressDetail}
                                onChange={(e) => set("addressDetail", e.target.value)}
                                placeholder="상세 위치를 입력하세요"
                            />
                        </label>

                        <label className="space-y-2 md:col-span-2">
                            <div className="text-xs font-semibold text-slate-600">대표 이미지 URL</div>
                            <input
                                className="w-full px-4 py-3 text-sm"
                                value={form.thumbUrl}
                                onChange={(e) => set("thumbUrl", e.target.value)}
                                placeholder="https://..."
                            />
                        </label>

                        <div className="space-y-2 md:col-span-2">
                            <div className="text-xs font-semibold text-slate-600">대표 이미지 업로드</div>
                            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm font-medium text-slate-700 hover:bg-slate-100">
                                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                                <span>{uploading ? "업로드 중..." : "파일 업로드"}</span>
                                <input type="file" accept="image/*" className="hidden" onChange={uploadFile} />
                            </label>
                        </div>

                        <label className="space-y-2 md:col-span-2">
                            <div className="text-xs font-semibold text-slate-600">소개글</div>
                            <textarea
                                className="w-full px-4 py-3 text-sm"
                                rows={5}
                                value={form.description}
                                onChange={(e) => set("description", e.target.value)}
                                placeholder="매장 소개, 운영시간, 특징 등을 입력하세요"
                            />
                        </label>
                    </div>

                    {previewUrl ? (
                        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <ImagePlus className="h-4 w-4" />
                                <span>대표 이미지 미리보기</span>
                            </div>
                            <div className="overflow-hidden rounded-2xl bg-white">
                                <img
                                    src={previewUrl}
                                    alt="대표 이미지 미리보기"
                                    className="h-64 w-full object-cover"
                                />
                            </div>
                        </div>
                    ) : null}

                    {err ? (
                        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {err}
                        </div>
                    ) : null}

                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={submit}
                            disabled={loading || uploading}
                            className="admin-btn"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            <span>{loading ? "저장 중..." : "매장 등록"}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => router.back()}
                            disabled={loading}
                            className="admin-btn-outline"
                        >
                            취소
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
}