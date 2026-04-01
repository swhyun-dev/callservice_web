// src/components/layout/TopNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Headset, Home, Info } from "lucide-react";

type NavItem = {
    href: string;
    label: string;
};

const nav: NavItem[] = [
    { href: "/", label: "매장안내" },
    { href: "/support", label: "고객센터" },
    { href: "/about", label: "회사소개" },
];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export default function TopNav() {
    const pathname = usePathname();

    const activeHref = useMemo(() => {
        if (pathname === "/") return "/";
        if (pathname.startsWith("/stores/")) return "/";
        return pathname;
    }, [pathname]);

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-700 text-sm font-bold text-white shadow-sm">
                        CS
                    </div>

                    <div className="leading-tight">
                        <div className="text-[15px] font-bold tracking-tight text-gray-900">
                            콜서비스
                        </div>
                        <div className="text-[11px] text-gray-500">
                            전국 콜택시 / 대리운전 매장안내
                        </div>
                    </div>
                </Link>

                <nav className="hidden items-center gap-2 md:flex">
                    {nav.map((it) => {
                        const active = activeHref === it.href;
                        return (
                            <Link
                                key={it.href}
                                href={it.href}
                                className={cn(
                                    "rounded-full px-4 py-2 text-sm font-medium transition",
                                    active
                                        ? "bg-gray-900 text-white shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                {it.label}
                            </Link>
                        );
                    })}
                </nav>

                <Link
                    href="/"
                    aria-label="홈으로 이동"
                    className="grid h-11 w-11 place-items-center rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50 md:hidden"
                >
                    <Home className="h-5 w-5 text-gray-900" />
                </Link>
            </div>

            <div className="border-t border-gray-100 bg-white md:hidden">
                <div className="mx-auto flex max-w-6xl items-center justify-around px-4 py-2">
                    <Link
                        href="/"
                        className={cn(
                            "flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium",
                            activeHref === "/" ? "text-gray-900" : "text-gray-500"
                        )}
                    >
                        <Home className="h-4 w-4" />
                        <span>매장안내</span>
                    </Link>

                    <Link
                        href="/support"
                        className={cn(
                            "flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium",
                            activeHref === "/support" ? "text-gray-900" : "text-gray-500"
                        )}
                    >
                        <Headset className="h-4 w-4" />
                        <span>고객센터</span>
                    </Link>

                    <Link
                        href="/about"
                        className={cn(
                            "flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium",
                            activeHref === "/about" ? "text-gray-900" : "text-gray-500"
                        )}
                    >
                        <Info className="h-4 w-4" />
                        <span>회사소개</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}