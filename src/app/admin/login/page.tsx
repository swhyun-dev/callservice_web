"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [pw, setPw] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function submit() {
        setErr(null);
        setLoading(true);
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: pw }),
            });
            if (!res.ok) {
                setErr("비밀번호가 올바르지 않습니다.");
                return;
            }
            router.replace("/admin");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-dvh bg-gray-50">
            <div className="mx-auto max-w-md px-4 py-16">
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="text-xl font-bold">관리자 로그인</div>
                    <div className="mt-2 text-sm text-gray-600">
                        관리자 비밀번호를 입력하세요.
                    </div>

                    <input
                        type="password"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        placeholder="비밀번호"
                        className="mt-5 w-full rounded-2xl border px-4 py-3"
                    />

                    {err && <div className="mt-3 text-sm text-red-600">{err}</div>}

                    <button
                        onClick={submit}
                        disabled={loading || !pw}
                        className="mt-4 w-full rounded-2xl bg-gray-900 py-3 text-sm font-semibold text-white disabled:opacity-50"
                    >
                        {loading ? "로그인 중…" : "로그인"}
                    </button>
                </div>
            </div>
        </div>
    );
}