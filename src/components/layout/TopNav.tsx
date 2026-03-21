"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
    Building2,
    CarFront,
    Headset,
    Info,
    MapPinned,
    Menu,
    Phone,
    Search,
    X,
} from "lucide-react";

type NavItem = {
    href: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
};

const nav: NavItem[] = [
    { href: "/", label: "매장안내", icon: Building2 },
    { href: "/support", label: "고객센터", icon: Headset },
    { href: "/about", label: "회사소개", icon: Info },
];

const quickRegions = ["서울", "경기", "인천", "부산"];
const quickCategories = ["콜택시", "대리운전"];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function DrawerSection({
                           title,
                           children,
                       }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="space-y-3">
            <div className="px-1 text-xs font-semibold tracking-tight text-gray-400">
                {title}
            </div>
            <div className="space-y-2">{children}</div>
        </section>
    );
}

export default function TopNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const activeHref = useMemo(() => {
        if (pathname === "/") return "/";
        if (pathname.startsWith("/stores/")) return "/";
        return pathname;
    }, [pathname]);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!open) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    function goToRegion(region: string) {
        setOpen(false);
        router.push(`/?addr1=${encodeURIComponent(region)}`);
    }

    function goToCategory(category: string) {
        setOpen(false);
        router.push(`/?category=${encodeURIComponent(category)}`);
    }

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
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

                    <button
                        type="button"
                        className="grid h-11 w-11 place-items-center rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50 md:hidden"
                        aria-label="메뉴 열기"
                        aria-expanded={open}
                        onClick={() => setOpen(true)}
                    >
                        <Menu className="h-5 w-5 text-gray-900" />
                    </button>
                </div>
            </header>

            {open && (
                <div className="md:hidden">
                    <button
                        type="button"
                        aria-label="메뉴 닫기"
                        className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]"
                        onClick={() => setOpen(false)}
                    />

                    <aside className="fixed right-0 top-0 z-[60] flex h-dvh w-[84%] max-w-sm flex-col border-l border-gray-200 bg-white shadow-2xl">
                        <div className="border-b border-gray-100 px-5 pb-5 pt-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gray-900 text-sm font-bold text-white">
                                        CS
                                    </div>
                                    <div>
                                        <div className="text-base font-bold tracking-tight text-gray-900">
                                            콜서비스
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            지역과 업종으로 빠르게 찾기
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="grid h-10 w-10 place-items-center rounded-2xl border border-gray-200 bg-white"
                                    aria-label="메뉴 닫기"
                                    onClick={() => setOpen(false)}
                                >
                                    <X className="h-5 w-5 text-gray-900" />
                                </button>
                            </div>

                            <div className="mt-4 rounded-3xl bg-gray-50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 rounded-2xl bg-white p-2 shadow-sm">
                                        <Search className="h-4 w-4 text-gray-700" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            필요한 매장을 빠르게 찾으세요
                                        </div>
                                        <div className="mt-1 text-xs leading-5 text-gray-500">
                                            지역 / 업종 필터로 가까운 콜택시와 대리운전 매장을
                                            쉽게 확인할 수 있어요.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
                            <DrawerSection title="빠른 찾기 / 지역">
                                <div className="grid grid-cols-2 gap-2">
                                    {quickRegions.map((region) => (
                                        <button
                                            key={region}
                                            type="button"
                                            onClick={() => goToRegion(region)}
                                            className="flex h-12 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
                                        >
                                            <MapPinned className="h-4 w-4 text-gray-500" />
                                            <span>{region}</span>
                                        </button>
                                    ))}
                                </div>
                            </DrawerSection>

                            <DrawerSection title="빠른 찾기 / 업종">
                                <div className="grid grid-cols-1 gap-2">
                                    {quickCategories.map((category) => (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() => goToCategory(category)}
                                            className="flex h-12 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
                                        >
                                            <CarFront className="h-4 w-4 text-gray-500" />
                                            <span>{category}</span>
                                        </button>
                                    ))}
                                </div>
                            </DrawerSection>

                            <DrawerSection title="메인 메뉴">
                                <div className="space-y-2">
                                    {nav.map((it) => {
                                        const active = activeHref === it.href;
                                        const Icon = it.icon;

                                        return (
                                            <Link
                                                key={it.href}
                                                href={it.href}
                                                className={cn(
                                                    "flex min-h-[52px] items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition",
                                                    active
                                                        ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                                                        : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                                                )}
                                            >
                                                {Icon ? (
                                                    <Icon
                                                        className={cn(
                                                            "h-4 w-4",
                                                            active ? "text-white" : "text-gray-500"
                                                        )}
                                                    />
                                                ) : null}
                                                <span>{it.label}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </DrawerSection>

                            <DrawerSection title="바로 실행">
                                <a
                                    href="tel:01000000000"
                                    className="flex min-h-[52px] items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
                                >
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span>전화 문의하기</span>
                                </a>
                            </DrawerSection>
                        </div>

                        <div className="border-t border-gray-100 bg-white px-5 py-4">
                            <div className="text-xs font-medium text-gray-900">
                                콜서비스
                            </div>
                            <div className="mt-1 text-xs leading-5 text-gray-500">
                                전국 매장 정보를 보다 쉽게 찾을 수 있도록 정리한 안내 서비스입니다.
                            </div>
                        </div>
                    </aside>
                </div>
            )}
        </>
    );
}