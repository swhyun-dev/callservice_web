"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type FilterState = {
    addr1: string;     // "전체" 포함
    addr2: string;     // "" 가능
    category: string;  // "" = 전체
    q: string;
};

function cx(...arr: Array<string | false | undefined | null>) {
    return arr.filter(Boolean).join(" ");
}

function useOnClickOutside(
    ref: React.RefObject<HTMLElement | null>,
    onCloseAction: () => void
) {
    useEffect(() => {
        function onDown(e: MouseEvent) {
            if (!ref.current) return;
            if (ref.current.contains(e.target as Node)) return;
            onCloseAction();
        }
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [ref, onCloseAction]);
}

type DropProps = {
    label: string;
    valueText: string;
    disabled?: boolean;
    items: Array<{ key: string; label: string }>;
    activeKey: string;
    onSelectAction: (key: string) => void;
};

function DropdownPill({
                          label,
                          valueText,
                          disabled,
                          items,
                          activeKey,
                          onSelectAction,
                      }: DropProps) {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(wrapRef, () => setOpen(false));

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <div className="relative" ref={wrapRef}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((v) => !v)}
                className={cx(
                    "inline-flex items-center gap-2 rounded-full border bg-white px-3 py-2",
                    "text-sm font-semibold text-gray-900 shadow-sm transition",
                    "hover:bg-gray-50",
                    disabled ? "opacity-50" : ""
                )}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="text-xs text-gray-500">{label}</span>
                <span className="max-w-[34vw] truncate">{valueText}</span>
                <span className={cx("text-gray-400 transition", open ? "rotate-180" : "")}>
          ▾
        </span>
            </button>

            {open && !disabled && (
                <>
                    {/* 뒤 배경 비침 방지 + 클릭 닫기 */}
                    <div
                        className="fixed inset-0 z-40 bg-black/20"
                        onClick={() => setOpen(false)}
                        aria-hidden="true"
                    />

                    <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-[min(92vw,360px)]">
                        <div className="overflow-hidden rounded-3xl border bg-white shadow-xl">
                            <div className="flex items-center justify-between border-b px-4 py-3">
                                <div className="text-sm font-semibold text-gray-900">{label} 선택</div>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                                >
                                    닫기
                                </button>
                            </div>

                            <div className="max-h-[52vh] overflow-y-auto p-3">
                                <div className="grid grid-cols-2 gap-2">
                                    {items.map((it) => {
                                        const active = it.key === activeKey;
                                        return (
                                            <button
                                                key={it.key}
                                                type="button"
                                                onClick={() => {
                                                    onSelectAction(it.key);
                                                    setOpen(false);
                                                }}
                                                className={cx(
                                                    "rounded-2xl px-3 py-2 text-xs font-semibold transition",
                                                    active
                                                        ? "bg-gray-900 text-white"
                                                        : "border bg-white text-gray-700 hover:bg-gray-50"
                                                )}
                                            >
                                                {it.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 border-l border-t bg-white" />
                    </div>
                </>
            )}
        </div>
    );
}

export default function StoreFilterBarCarrot(props: {
    value: FilterState;
    onChangeAction: (next: FilterState) => void; // ✅ 핵심 변경
    addr1Options: string[];
    addr2Options: string[];
    categoryOptions: string[];
    loading?: boolean;
}) {
    const { value, onChangeAction } = props;

    const canPickAddr2 = value.addr1 !== "전체";

    const addr1Items = useMemo(
        () => props.addr1Options.map((a) => ({ key: a, label: a })),
        [props.addr1Options]
    );

    const addr2Items = useMemo(() => {
        const base = [{ key: "", label: "전체(2차)" }];
        return base.concat(props.addr2Options.map((a) => ({ key: a, label: a })));
    }, [props.addr2Options]);

    const addr1Label = value.addr1 === "전체" ? "전체" : value.addr1;
    const addr2Label = !canPickAddr2 ? "1차 선택" : value.addr2 ? value.addr2 : "전체(2차)";

    return (
        <div className="sticky top-0 z-30 -mx-4 border-b bg-white/95 px-4 py-3 backdrop-blur">
            {/* 1행: 지역 드롭다운 2개 */}
            <div className="flex items-center gap-2">
                <DropdownPill
                    label="지역(1차)"
                    valueText={addr1Label}
                    disabled={props.loading}
                    items={addr1Items}
                    activeKey={value.addr1}
                    onSelectAction={(a1) => {
                        onChangeAction({ ...value, addr1: a1, addr2: "", category: "" });
                    }}
                />

                <DropdownPill
                    label="지역(2차)"
                    valueText={addr2Label}
                    disabled={props.loading || !canPickAddr2}
                    items={addr2Items}
                    activeKey={value.addr2}
                    onSelectAction={(a2) => {
                        onChangeAction({ ...value, addr2: a2, category: "" });
                    }}
                />

                <div className="ml-auto text-xs text-gray-500">
                    {props.loading ? "불러오는 중…" : ""}
                </div>
            </div>

            {/* 2행: 업종 태그 (1차 지역 선택 후에만 표시) */}
            {value.addr1 !== "전체" && (
                <div className="mt-3">
                    <div
                        className={cx(
                            "flex gap-2 overflow-x-auto pb-1",
                            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        )}
                    >
                        <button
                            type="button"
                            disabled={props.loading}
                            onClick={() => onChangeAction({ ...value, category: "" })}
                            className={cx(
                                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
                                value.category === ""
                                    ? "bg-gray-900 text-white"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            )}
                        >
                            전체
                        </button>

                        {props.categoryOptions.map((c) => {
                            const active = value.category === c;
                            return (
                                <button
                                    key={c}
                                    type="button"
                                    disabled={props.loading}
                                    onClick={() => onChangeAction({ ...value, category: c })}
                                    className={cx(
                                        "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
                                        active
                                            ? "bg-gray-900 text-white"
                                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    )}
                                >
                                    {c}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}