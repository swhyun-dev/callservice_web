"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { href: string; label: string };

const nav: NavItem[] = [
    { href: "/about", label: "회사소개" },
    { href: "/", label: "매장안내" },
    { href: "/support", label: "고객센터" },
];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

export default function TopNav() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const activeHref = useMemo(() => {
        if (pathname === "/") return "/";
        if (pathname.startsWith("/stores/")) return "/";
        return pathname;
    }, [pathname]);

    useEffect(() => setOpen(false), [pathname]);

    return (
        <header className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-xl border bg-white text-sm font-semibold">
                        CS
                    </div>
                    <div className="leading-tight">
                        <div className="text-sm font-semibold">콜서비스</div>
                        <div className="text-[11px] text-gray-500">매장 안내</div>
                    </div>
                </Link>

                {/* Desktop */}
                <nav className="hidden items-center gap-2 md:flex">
                    {nav.map((it) => {
                        const active = activeHref === it.href;
                        return (
                            <Link
                                key={it.href}
                                href={it.href}
                                className={cn(
                                    "rounded-full px-4 py-2 text-sm transition",
                                    active
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                            >
                                {it.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile */}
                <button
                    type="button"
                    className="grid h-10 w-10 place-items-center rounded-xl border bg-white md:hidden"
                    aria-label="메뉴 열기"
                    onClick={() => setOpen(true)}
                >
                    <Menu className="h-5 w-5" />
                </button>
            </div>

            {/* Mobile Drawer */}
            {open && (
                <div className="md:hidden">
                    <div
                        className="fixed inset-0 z-50 bg-black/35"
                        onClick={() => setOpen(false)}
                    />
                    <div className="fixed right-0 top-0 z-50 h-full w-[78%] max-w-sm border-l bg-white p-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold">메뉴</div>
                            <button
                                type="button"
                                className="grid h-10 w-10 place-items-center rounded-xl border bg-white"
                                aria-label="메뉴 닫기"
                                onClick={() => setOpen(false)}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mt-4 space-y-2">
                            {nav.map((it) => {
                                const active = activeHref === it.href;
                                return (
                                    <Link
                                        key={it.href}
                                        href={it.href}
                                        className={cn(
                                            "block rounded-2xl border px-4 py-3 text-sm",
                                            active
                                                ? "border-gray-900 bg-gray-900 text-white"
                                                : "bg-white text-gray-800 hover:bg-gray-50"
                                        )}
                                    >
                                        {it.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mt-6 rounded-2xl border bg-gray-50 p-4 text-xs text-gray-600">
                            빠른 탐색을 위해 상단 메뉴는 항상 고정됩니다.
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}