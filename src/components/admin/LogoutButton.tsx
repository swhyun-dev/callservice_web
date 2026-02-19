"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    async function logout() {
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
    }

    return (
        <button
            type="button"
            onClick={logout}
            className="admin-btn-outline rounded-2xl px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
            로그아웃
        </button>
    );
}