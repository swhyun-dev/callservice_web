// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-14 bg-[#23272f] text-white">
            <div className="mx-auto max-w-6xl px-4 py-10 text-center">
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-white">
                    <Link href="/about" className="transition hover:opacity-80">
                        회사소개
                    </Link>
                    <span className="text-white/50">|</span>
                    <Link href="/terms" className="transition hover:opacity-80">
                        이용약관
                    </Link>
                    <span className="text-white/50">|</span>
                    <Link href="/support" className="transition hover:opacity-80">
                        고객센터
                    </Link>
                    <span className="text-white/50">|</span>
                    <Link href="/register" className="transition hover:opacity-80">
                        매장등록
                    </Link>
                </div>

                <div className="mt-5 space-y-1 text-sm leading-6 text-white/70">
                    <div>콜서비스 | 사업자등록번호 : 576-06-02206</div>
                    <div>전화 : 1588-3353 | 팩스 : 050-5558-1114</div>
                    <div>주소 : 인천광역시 남동구 청능대로 389번길 47</div>
                    <div>통신판매업신고증 제 2023-인천남동구-0118호</div>
                </div>

                <div className="mt-4 text-sm text-white/70">
                    Copyrighⓒ 2026 CALL SERVICE All Rights reserved.
                </div>
            </div>
        </footer>
    );
}