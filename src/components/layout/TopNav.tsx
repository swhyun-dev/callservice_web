// src/components/layout/TopNav.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function TopNav() {
    const pathname = usePathname();
    const router = useRouter();

    const isStoreDetail = /^\/stores\/\d+$/.test(pathname);

    function handleLogoClick() {
        window.dispatchEvent(new Event("reset-store-filters"));
    }

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="relative mx-auto flex h-16 max-w-6xl items-center px-4">
                {isStoreDetail ? (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <button
                            type="button"
                            aria-label="뒤로가기"
                            onClick={() => router.back()}
                            className="grid h-11 w-11 place-items-center rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-900" />
                        </button>
                    </div>
                ) : null}

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

                <div className="mx-auto">
                    <Link href="/" className="block" onClick={handleLogoClick}>
                        <div className="relative h-10 w-[220px] overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="CALLSERVICE"
                                fill
                                priority
                                className="object-contain scale-[1.9]"
                                style={{ objectPosition: "center center" }}
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}