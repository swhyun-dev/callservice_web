"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function FloatingAddButton({
                                              href = "/admin/stores/new",
                                              label = "매장 등록",
                                          }: {
    href?: string;
    label?: string;
}) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(href)}
            className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-2
        rounded-full px-5 py-4
        bg-gradient-to-br from-blue-600 to-blue-500
        text-white font-bold
        shadow-lg
        hover:scale-105 hover:shadow-xl
        active:scale-95
        transition
      "
        >
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">{label}</span>
        </button>
    );
}