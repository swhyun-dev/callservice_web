// src/components/stores/StoreFilterBarCarrot.tsx
"use client";

export type FilterState = {
    addr1: string;
    addr2: string;
    category: string;
    q: string;
};

function cx(...arr: Array<string | false | undefined | null>) {
    return arr.filter(Boolean).join(" ");
}

export default function StoreFilterBarCarrot(props: {
    value: FilterState;
    onChangeAction: (next: FilterState) => void;
    onSearchAction: () => void;
    addr1Options: string[];
    addr2Options: string[];
    categoryOptions: string[];
    loading?: boolean;
}) {
    const { value, onChangeAction, onSearchAction, addr1Options, addr2Options, categoryOptions } =
        props;

    return (
        <div className="sticky top-0 z-30 -mx-4 border-b bg-white/95 px-4 py-3 backdrop-blur">
            <div className="space-y-4">
                <section>
                    <div className="mb-2 text-sm font-semibold text-gray-900">광역시/도</div>
                    <div className="flex flex-wrap gap-2">
                        {addr1Options.map((a1) => {
                            const active = value.addr1 === a1;
                            return (
                                <button
                                    key={a1}
                                    type="button"
                                    disabled={props.loading}
                                    onClick={() =>
                                        onChangeAction({
                                            ...value,
                                            addr1: a1,
                                            addr2: "",
                                            category: "",
                                        })
                                    }
                                    className={cx(
                                        "rounded-full border px-4 py-2 text-sm font-semibold transition",
                                        active
                                            ? "border-gray-900 bg-gray-900 text-white"
                                            : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                                    )}
                                >
                                    {a1}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {value.addr1 !== "전체" && (
                    <section>
                        <div className="mb-2 text-sm font-semibold text-gray-900">시/군/구</div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                disabled={props.loading}
                                onClick={() =>
                                    onChangeAction({
                                        ...value,
                                        addr2: "",
                                        category: "",
                                    })
                                }
                                className={cx(
                                    "rounded-full border px-4 py-2 text-sm font-semibold transition",
                                    value.addr2 === ""
                                        ? "border-gray-900 bg-gray-900 text-white"
                                        : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                                )}
                            >
                                전체
                            </button>

                            {addr2Options.map((a2) => {
                                const active = value.addr2 === a2;
                                return (
                                    <button
                                        key={a2}
                                        type="button"
                                        disabled={props.loading}
                                        onClick={() =>
                                            onChangeAction({
                                                ...value,
                                                addr2: a2,
                                                category: "",
                                            })
                                        }
                                        className={cx(
                                            "rounded-full border px-4 py-2 text-sm font-semibold transition",
                                            active
                                                ? "border-gray-900 bg-gray-900 text-white"
                                                : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                                        )}
                                    >
                                        {a2}
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                )}

                {categoryOptions.length > 0 && (
                    <section>
                        <div className="mb-2 text-sm font-semibold text-gray-900">업종</div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                disabled={props.loading}
                                onClick={() =>
                                    onChangeAction({
                                        ...value,
                                        category: "",
                                    })
                                }
                                className={cx(
                                    "rounded-full border px-4 py-2 text-sm font-semibold transition",
                                    value.category === ""
                                        ? "border-gray-900 bg-gray-900 text-white"
                                        : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                                )}
                            >
                                전체
                            </button>

                            {categoryOptions.map((c) => {
                                const active = value.category === c;
                                return (
                                    <button
                                        key={c}
                                        type="button"
                                        disabled={props.loading}
                                        onClick={() =>
                                            onChangeAction({
                                                ...value,
                                                category: c,
                                            })
                                        }
                                        className={cx(
                                            "rounded-full border px-4 py-2 text-sm font-semibold transition",
                                            active
                                                ? "border-gray-900 bg-gray-900 text-white"
                                                : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                                        )}
                                    >
                                        {c}
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                )}

                <div className="flex items-center justify-end">
                    <button
                        type="button"
                        disabled={props.loading}
                        onClick={onSearchAction}
                        className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:opacity-50"
                    >
                        검색하기
                    </button>
                </div>
            </div>
        </div>
    );
}