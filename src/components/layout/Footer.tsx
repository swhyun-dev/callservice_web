// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-14 bg-[#1f232a] text-white">
            <div className="mx-auto max-w-6xl px-4 py-10 text-center">
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
                    <Link href="/about" className="transition hover:opacity-80">
                        회사소개
                    </Link>
                    <span className="text-white/40">|</span>
                    <Link href="/terms" className="transition hover:opacity-80">
                        이용약관
                    </Link>
                    <span className="text-white/40">|</span>
                    <Link href="/support" className="transition hover:opacity-80">
                        고객센터
                    </Link>
                    <span className="text-white/40">|</span>
                    <button type="button" className="transition hover:opacity-80">
                        광고안내
                    </button>
                </div>

                <div className="mt-6 space-y-1 text-sm leading-6 text-white/70">
                    <div>콜서비스</div>
                    <div>고객센터 : 1588-3353</div>
                    <div>주소 : 인천광역시 남동구 청능대로 389번길 47</div>
                    <div>통신판매업신고증 제 2023-인천남동구-0118호</div>
                </div>

                <div className="mt-6 text-sm text-white/55">
                    Copyright© {year} CALLSERVICE All Rights reserved.
                </div>
            </div>
        </footer>
    );
}