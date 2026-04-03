// src/components/stores/StoreFilterBarCarrot.tsx
"use client";

import { ChevronDown, Search, X } from "lucide-react";
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

function cx(...arr: Array<string | false | undefined | null>) {
    return arr.filter(Boolean).join(" ");
}

function FilterButton(props: {
    valueText: string;
    disabled?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            disabled={props.disabled}
            onClick={props.onClick}
            className={cx(
                "relative z-10 w-full min-w-0 h-11 rounded-full border px-3 shadow-sm transition",
                "flex items-center justify-between bg-white text-left touch-manipulation select-none",
                props.disabled
                    ? "border-gray-200 bg-gray-100 text-gray-400"
                    : "border-gray-300 text-gray-900 active:scale-[0.99]"
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
        >
            <span className="min-w-0 flex-1 truncate text-sm font-semibold pointer-events-none">
                {props.valueText}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-400 pointer-events-none" />
        </button>
    );
}

export default function StoreFilterBarCarrot(props: Props) {
    const { value, onChangeAction, onSearchAction, addr1Options, addr2Options, categoryOptions } =
        props;

    const [openSheet, setOpenSheet] = useState<SheetType>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState(value.q);

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
        const openFromTopNav = () => {
            setSearchText(value.q);
            setSearchOpen(true);
        };

        window.addEventListener("open-store-search", openFromTopNav);
        return () => window.removeEventListener("open-store-search", openFromTopNav);
    }, [value.q]);

    const addr2Disabled = value.addr1 === "전체";

    const currentOptions = useMemo(() => {
        if (openSheet === "addr1") return addr1Options;
        if (openSheet === "addr2") return ["전체", ...addr2Options];
        if (openSheet === "category") return ["전체", ...categoryOptions];
        return [];
    }, [openSheet, addr1Options, addr2Options, categoryOptions]);

    function handleSelect(type: Exclude<SheetType, null>, selected: string) {
        if (type === "addr1") {
            onChangeAction({
                ...value,
                addr1: selected,
                addr2: "",
                category: "",
            });
        }

        if (type === "addr2") {
            onChangeAction({
                ...value,
                addr2: selected === "전체" ? "" : selected,
            });
        }

        if (type === "category") {
            onChangeAction({
                ...value,
                category: selected === "전체" ? "" : selected,
            });
        }

        setOpenSheet(null);
        onSearchAction();
    }

    function submitKeywordSearch() {
        onChangeAction({
            ...value,
            q: searchText.trim(),
        });
        setSearchOpen(false);
        onSearchAction();
    }

    const addr1Text = value.addr1 === "전체" ? "광역시/도" : value.addr1;
    const addr2Text = addr2Disabled ? "시/군/구" : value.addr2 || "시/군/구";
    const categoryText = value.category || "업종";

    return (
        <>
            <div className="sticky top-[64px] z-30 isolate -mx-4 border-b bg-white/95 px-4 py-2 backdrop-blur">
                <div className="grid grid-cols-3 gap-2">
                    <FilterButton
                        valueText={addr1Text}
                        disabled={props.loading}
                        onClick={() => setOpenSheet("addr1")}
                    />

                    <FilterButton
                        valueText={addr2Text}
                        disabled={props.loading || addr2Disabled}
                        onClick={() => setOpenSheet("addr2")}
                    />

                    <FilterButton
                        valueText={categoryText}
                        disabled={props.loading}
                        onClick={() => setOpenSheet("category")}
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
                                                "rounded-2xl px-4 py-3 text-sm font-semibold transition touch-manipulation",
                                                active
                                                    ? "bg-gray-900 text-white"
                                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 active:scale-[0.99]"
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
                <div className="fixed inset-0 z-[90]">
                    <button
                        type="button"
                        aria-label="검색 팝업 닫기"
                        className="absolute inset-0 bg-black/45"
                        onClick={() => setSearchOpen(false)}
                    />

                    <div className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-white shadow-2xl">
                        <div className="mx-auto max-w-6xl px-4 pb-6 pt-4">
                            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-gray-200" />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Search className="h-5 w-5 text-gray-700" />
                                    <div>
                                        <div className="text-base font-bold text-gray-900">매장 검색</div>
                                        <div className="mt-1 text-sm text-gray-500">
                                            상호명, 업종 등으로 검색할 수 있습니다.
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    aria-label="닫기"
                                    onClick={() => setSearchOpen(false)}
                                    className="grid h-10 w-10 place-items-center rounded-full border border-gray-200 bg-white text-gray-700"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="mt-5">
                                <input
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") submitKeywordSearch();
                                    }}
                                    placeholder="예: 홍대 콜서비스 / 대리운전 / 콜택시"
                                    className="h-12 w-full rounded-2xl border border-gray-300 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900"
                                    autoFocus
                                />
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchText("");
                                        onChangeAction({
                                            ...value,
                                            q: "",
                                        });
                                        setSearchOpen(false);
                                        onSearchAction();
                                    }}
                                    className="flex-1 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800"
                                >
                                    초기화
                                </button>

                                <button
                                    type="button"
                                    onClick={submitKeywordSearch}
                                    className="flex-1 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white"
                                >
                                    검색하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}