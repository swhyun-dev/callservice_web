// src/components/layout/TopNav.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

export default function TopNav() {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="relative mx-auto flex h-16 max-w-6xl items-center px-4">

                {/* 검색 버튼 */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <button
                        type="button"
                        aria-label="검색 열기"
                        onClick={() => window.dispatchEvent(new Event("open-store-search"))}
                        className="grid h-11 w-11 place-items-center rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
                    >
                        <Search className="h-5 w-5 text-gray-900" />
                    </button>
                </div>

                {/* 중앙 로고 */}
                <div className="mx-auto">
                    <Link href="/" className="flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="CALLSERVICE"
                            width={260}
                            height={60}
                            priority
                            className="object-contain"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}