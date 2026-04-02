// src/components/layout/TopNav.tsx
"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function TopNav() {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="relative mx-auto flex h-16 max-w-6xl items-center px-4">
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Link
                        href="/"
                        aria-label="홈으로 이동"
                        className="grid h-11 w-11 place-items-center rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
                    >
                        <Home className="h-5 w-5 text-gray-900" />
                    </Link>
                </div>

                <div className="mx-auto">
                    <Link href="/" className="flex items-center gap-3 text-center">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-700 text-sm font-bold text-white shadow-sm">
                            CS
                        </div>

                        <div className="leading-tight text-left">
                            <div className="text-[15px] font-bold tracking-tight text-gray-900">
                                콜서비스
                            </div>
                            <div className="text-[11px] text-gray-500">
                                전국 매장 정보를 한눈에 찾는 매장안내 서비스
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}