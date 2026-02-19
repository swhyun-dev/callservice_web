"use client";

import { useState } from "react";
import Link from "next/link";

type ImportError = {
    row: number;
    message: string;
};

type ImportResult = {
    ok: boolean;
    total: number;
    success: number;
    fail: number;
    errors: ImportError[];
};

type ColumnSpec = {
    key: string;
    required: boolean;
    type: string;
    example: string;
    desc: string;
};

const columns: ColumnSpec[] = [
    { key: "name", required: true, type: "문자", example: "강남 콜서비스", desc: "매장명" },
    { key: "category", required: true, type: "문자", example: "대리운전", desc: "업종" },
    { key: "phone", required: true, type: "문자", example: "02-1234-5678", desc: "전화번호" },
    { key: "addr1", required: true, type: "문자", example: "서울", desc: "1차 지역(예: 서울/경기/부산…)" },
    { key: "addr2", required: false, type: "문자", example: "강남구", desc: "2차 지역(구/시/군 등)" },
    { key: "addressDetail", required: false, type: "문자", example: "테헤란로 123", desc: "상세 주소" },
    { key: "lat", required: false, type: "숫자", example: "37.498095", desc: "위도(없으면 빈칸)" },
    { key: "lng", required: false, type: "숫자", example: "127.02761", desc: "경도(없으면 빈칸)" },
    { key: "description", required: false, type: "문자", example: "강남 지역 전문", desc: "소개글" },
    {
        key: "thumbPath",
        required: false,
        type: "문자(경로)",
        example: "/images/stores/store1.jpg",
        desc: "이미지 파일 경로(서버에 미리 업로드된 경로). URL도 가능",
    },
];

export default function AdminStoreImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ImportResult | null>(null);
    const [err, setErr] = useState<string | null>(null);

    async function upload() {
        setErr(null);
        setResult(null);

        if (!file) {
            setErr("엑셀 파일을 선택하세요.");
            return;
        }

        setLoading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);

            const res = await fetch("/api/admin-stores/import-excel", {
                method: "POST",
                body: fd,
            });

            const json: unknown = await res.json();

            // 에러 메시지 추출(unknown 안전 처리)
            if (!res.ok) {
                const msg =
                    typeof json === "object" && json !== null && "message" in json
                        ? String((json as { message?: unknown }).message ?? "업로드 실패")
                        : "업로드 실패";
                throw new Error(msg);
            }

            // 성공 응답 타입 가드(최소 보장)
            if (
                typeof json !== "object" ||
                json === null ||
                !("total" in json) ||
                !("success" in json) ||
                !("fail" in json)
            ) {
                throw new Error("서버 응답 형식이 올바르지 않습니다.");
            }

            const safe = json as ImportResult;
            // errors가 없으면 빈 배열로 보정
            safe.errors = Array.isArray(safe.errors) ? safe.errors : [];
            setResult(safe);
        } catch (e: unknown) {
            setErr(e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <div className="admin-card rounded-3xl p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-lg font-bold">엑셀로 매장 일괄 등록</div>
                        <div className="admin-muted mt-1 text-sm">
                            템플릿을 다운받아 작성 후 업로드하세요. 이미지 컬럼은 “파일 업로드”가 아니라{" "}
                            <span className="font-mono">thumbPath</span>에 “경로 문자열”만 입력합니다.
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href="/api/admin-stores/import-template"
                            className="admin-btn-outline rounded-2xl px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                        >
                            템플릿 다운로드
                        </a>

                        <Link
                            href="/admin/stores"
                            className="admin-btn-outline rounded-2xl px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                        >
                            ← 목록으로
                        </Link>
                    </div>
                </div>

                {/* 컬럼 설명 테이블 */}
                <div className="mt-6 overflow-hidden rounded-3xl border bg-white">
                    <div className="border-b bg-gray-50 px-4 py-3">
                        <div className="text-sm font-semibold">엑셀 컬럼 설명</div>
                        <div className="text-xs text-gray-500">첫 행(헤더)은 반드시 아래 key와 동일해야 합니다.</div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[860px] text-left text-sm">
                            <thead className="border-b bg-white">
                            <tr className="text-xs text-gray-600">
                                <th className="px-4 py-3">컬럼(key)</th>
                                <th className="px-4 py-3">필수</th>
                                <th className="px-4 py-3">타입</th>
                                <th className="px-4 py-3">예시</th>
                                <th className="px-4 py-3">설명</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y">
                            {columns.map((c) => (
                                <tr key={c.key}>
                                    <td className="px-4 py-3 font-mono text-[13px]">{c.key}</td>
                                    <td className="px-4 py-3">
                                        {c.required ? (
                                            <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">
                          필수
                        </span>
                                        ) : (
                                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">
                          선택
                        </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-xs text-gray-700">{c.type}</td>
                                    <td className="px-4 py-3 font-mono text-xs text-gray-800">{c.example}</td>
                                    <td className="px-4 py-3 text-xs text-gray-700">{c.desc}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 업로드 */}
                <div className="mt-6 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <input type="file" accept=".xlsx,.xls" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                        <button
                            onClick={upload}
                            disabled={loading || !file}
                            className="admin-btn rounded-2xl px-4 py-2 text-sm font-semibold disabled:opacity-50"
                        >
                            {loading ? "업로드/등록 중…" : "업로드 후 등록"}
                        </button>
                    </div>

                    {err && <div className="text-sm text-red-600">{err}</div>}

                    {result && (
                        <div className="mt-2 rounded-2xl border bg-white p-4 text-sm">
                            <div className="font-semibold">처리 결과</div>
                            <div className="admin-muted mt-1">
                                총 {result.total}행 / 성공 {result.success} / 실패 {result.fail}
                            </div>

                            {result.errors?.length ? (
                                <div className="mt-3 space-y-2">
                                    <div className="font-semibold">실패 상세</div>
                                    <ul className="list-disc pl-5">
                                        {result.errors.slice(0, 50).map((x: ImportError, i: number) => (
                                            <li key={i}>
                                                {x.row}행: {x.message}
                                            </li>
                                        ))}
                                    </ul>
                                    {result.errors.length > 50 && (
                                        <div className="admin-muted text-xs">(일부만 표시했습니다)</div>
                                    )}
                                </div>
                            ) : (
                                <div className="mt-3 text-sm text-green-700">모든 행이 정상 등록되었습니다.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* 하단 도움말 */}
            <div className="admin-card rounded-3xl p-6 shadow-sm">
                <div className="text-sm font-semibold">이미지 경로 입력 예</div>
                <div className="admin-muted mt-2 text-sm leading-6">
                    - 서버에 <span className="font-mono">public/images/stores</span> 폴더가 있다면
                    <br />
                    - 엑셀의 <span className="font-mono">thumbPath</span>에{" "}
                    <span className="font-mono">/images/stores/파일명.jpg</span> 형태로 입력하면 됩니다.
                </div>
            </div>
        </div>
    );
}