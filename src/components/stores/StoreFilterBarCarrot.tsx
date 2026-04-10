// src/components/stores/StoreFilterBarCarrot.tsx
"use client";

import { ChevronDown, Search, X, ArrowLeft, Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export type FilterState = {
    addr1: string;
    addr2: string;
    category: string;
    q: string;
};

type Props = {
    value: FilterState;
    onChangeAction: (next: FilterState) => void;
    onSearchAction: () => void;
    addr1Options: string[];
    addr2Options: string[];
    categoryOptions: string[];
    loading?: boolean;
};

type SheetType = "addr1" | "addr2" | "category" | null;

const RECENT_KEY = "callservice_recent_searches";
const MAX_RECENT = 8;

function cx(...arr: Array<string | false | undefined | null>) {
    return arr.filter(Boolean).join(" ");
}

function FilterButton(props: {
    text: string;
    active?: boolean;
    disabled?: boolean;
    onPress: () => void;
}) {
    return (
        <button
            type="button"
            disabled={props.disabled}
            onClick={props.onPress}
            className={cx(
                "w-full h-12 rounded-[22px] px-4 transition",
                "flex items-center justify-between",
                "select-none cursor-pointer pointer-events-auto touch-manipulation",
                "border shadow-[0_2px_8px_rgba(15,23,42,0.08)]",
                props.disabled
                    ? "border-gray-200 bg-gray-100 text-gray-400"
                    : props.active
                        ? "border-gray-900 bg-gray-900 text-white shadow-[0_6px_16px_rgba(17,24,39,0.18)]"
                        : "border-gray-300 bg-white text-gray-900 active:scale-[0.99]"
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
        >
            <span className="min-w-0 whitespace-nowrap text-sm font-semibold pointer-events-none">
                {props.text}
            </span>
            <ChevronDown
                className={cx(
                    "ml-2 h-4 w-4 shrink-0 pointer-events-none",
                    props.disabled ? "text-gray-300" : props.active ? "text-white/80" : "text-gray-400"
                )}
            />
        </button>
    );
}

function readRecentSearches(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(RECENT_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
    } catch {
        return [];
    }
}

function writeRecentSearches(items: string[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(items));
}

export default function StoreFilterBarCarrot(props: Props) {
    const { value, onChangeAction, addr1Options, addr2Options, categoryOptions } = props;

    const [openSheet, setOpenSheet] = useState<SheetType>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState(value.q);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    useEffect(() => {
        const opened = openSheet !== null || searchOpen;
        if (!opened) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpenSheet(null);
                setSearchOpen(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [openSheet, searchOpen]);

    useEffect(() => {
        setRecentSearches(readRecentSearches());

        const openFromTopNav = () => {
            setSearchText(value.q);
            setRecentSearches(readRecentSearches());
            setSearchOpen(true);
        };

        window.addEventListener("open-store-search", openFromTopNav);
        return () => window.removeEventListener("open-store-search", openFromTopNav);
    }, [value.q]);

    const currentOptions = useMemo(() => {
        if (openSheet === "addr1") return addr1Options;
        if (openSheet === "addr2") return ["전체", ...addr2Options];
        if (openSheet === "category") return ["전체", ...categoryOptions];
        return [];
    }, [openSheet, addr1Options, addr2Options, categoryOptions]);

    function saveRecent(keyword: string) {
        const trimmed = keyword.trim();
        if (!trimmed) return;

        const next = [trimmed, ...recentSearches.filter((v) => v !== trimmed)].slice(0, MAX_RECENT);
        setRecentSearches(next);
        writeRecentSearches(next);
    }

    function removeRecent(keyword: string) {
        const next = recentSearches.filter((v) => v !== keyword);
        setRecentSearches(next);
        writeRecentSearches(next);
    }

    function clearRecent() {
        setRecentSearches([]);
        writeRecentSearches([]);
    }

    function handleSelect(type: Exclude<SheetType, null>, selected: string) {
        let next: FilterState = value;

        if (type === "addr1") {
            next = {
                ...value,
                addr1: selected,
                addr2: "",
                category: "",
            };
        }

        if (type === "addr2") {
            next = {
                ...value,
                addr2: selected === "전체" ? "" : selected,
            };
        }

        if (type === "category") {
            next = {
                ...value,
                category: selected === "전체" ? "" : selected,
            };
        }

        setOpenSheet(null);
        onChangeAction(next);
    }

    function submitKeywordSearch(keyword?: string) {
        const finalKeyword = (keyword ?? searchText).trim();

        const next = {
            ...value,
            q: finalKeyword,
        };

        if (finalKeyword) {
            saveRecent(finalKeyword);
        }

        setSearchText(finalKeyword);
        setSearchOpen(false);
        onChangeAction(next);
    }

    const addr1Active = value.addr1 !== "전체";
    const addr2Active = value.addr2 !== "";
    const categoryActive = value.category !== "";

    const addr1Text = value.addr1 === "전체" ? "광역시/도" : value.addr1;
    const addr2Text = value.addr1 === "전체" ? "시/군/구" : value.addr2 || "시/군/구";
    const categoryText = value.category || "업종";

    return (
        <>
            <div className="relative z-10 -mx-4 border-b bg-white px-4 py-3">
                <div className="grid grid-cols-3 gap-2">
                    <FilterButton
                        text={addr1Text}
                        active={addr1Active}
                        disabled={props.loading}
                        onPress={() => setOpenSheet("addr1")}
                    />
                    <FilterButton
                        text={addr2Text}
                        active={addr2Active}
                        disabled={props.loading || value.addr1 === "전체"}
                        onPress={() => setOpenSheet("addr2")}
                    />
                    <FilterButton
                        text={categoryText}
                        active={categoryActive}
                        disabled={props.loading}
                        onPress={() => setOpenSheet("category")}
                    />
                </div>
            </div>

            {openSheet && (
                <div className="fixed inset-0 z-[80]">
                    <button
                        type="button"
                        aria-label="필터 닫기"
                        className="absolute inset-0 bg-black/35"
                        onClick={() => setOpenSheet(null)}
                    />

                    <div className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-white shadow-2xl">
                        <div className="mx-auto max-w-6xl px-4 pb-6 pt-4">
                            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-gray-200" />

                            <div className="flex items-center justify-between">
                                <div className="text-base font-bold text-gray-900">
                                    {openSheet === "addr1" && "광역시/도 선택"}
                                    {openSheet === "addr2" && "시/군/구 선택"}
                                    {openSheet === "category" && "업종 선택"}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setOpenSheet(null)}
                                    className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white text-gray-700"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mt-4 grid max-h-[55vh] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
                                {currentOptions.map((item) => {
                                    const normalized =
                                        item === "전체" && openSheet !== "addr1" ? "" : item;

                                    const active =
                                        openSheet === "addr1"
                                            ? value.addr1 === item
                                            : openSheet === "addr2"
                                                ? value.addr2 === normalized
                                                : value.category === normalized;

                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => handleSelect(openSheet, item)}
                                            className={cx(
                                                "rounded-2xl px-4 py-3 text-sm font-semibold transition",
                                                active
                                                    ? "bg-gray-900 text-white"
                                                    : "bg-gray-100 text-gray-800"
                                            )}
                                            style={{ WebkitTapHighlightColor: "transparent" }}
                                        >
                                            {item}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {searchOpen && (
                <div className="fixed inset-0 z-[90] bg-white">
                    <div className="mx-auto max-w-6xl px-4 pt-3">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                aria-label="검색 닫기"
                                onClick={() => setSearchOpen(false)}
                                className="grid h-11 w-11 place-items-center rounded-full text-gray-800"
                            >
                                <ArrowLeft className="h-7 w-7" />
                            </button>

                            <div className="flex h-12 flex-1 items-center rounded-full bg-gray-100 px-4">
                                <input
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") submitKeywordSearch();
                                    }}
                                    placeholder="상호명, 업종으로 검색"
                                    className="w-full bg-transparent text-[17px] text-gray-900 outline-none placeholder:text-gray-400"
                                    autoFocus
                                />
                                <Search className="h-6 w-6 text-gray-400" />
                            </div>

                            <button
                                type="button"
                                onClick={() => setSearchOpen(false)}
                                className="shrink-0 text-lg font-medium text-gray-900"
                            >
                                닫기
                            </button>
                        </div>

                        <div className="mt-8">
                            <div className="flex items-center justify-between">
                                <div className="text-[17px] font-bold text-gray-900">최근 검색어</div>
                                {recentSearches.length > 0 ? (
                                    <button
                                        type="button"
                                        onClick={clearRecent}
                                        className="text-base text-gray-400"
                                    >
                                        전체 삭제
                                    </button>
                                ) : null}
                            </div>

                            {recentSearches.length > 0 ? (
                                <div className="mt-4 space-y-1">
                                    {recentSearches.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3 py-3"
                                        >
                                            <Clock3 className="h-5 w-5 shrink-0 text-gray-400" />

                                            <button
                                                type="button"
                                                onClick={() => submitKeywordSearch(item)}
                                                className="min-w-0 flex-1 text-left text-[17px] text-gray-900"
                                            >
                                                <span className="block truncate">{item}</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => removeRecent(item)}
                                                className="grid h-8 w-8 place-items-center text-gray-400"
                                                aria-label={`${item} 삭제`}
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-6 rounded-2xl bg-gray-50 px-4 py-5 text-sm text-gray-400">
                                    최근 검색어가 없습니다.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}