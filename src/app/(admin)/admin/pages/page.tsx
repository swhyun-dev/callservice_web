import Link from "next/link";

const ITEMS = [
    { slug: "about", label: "회사소개" },
    { slug: "support", label: "고객센터" },
];

export default function AdminPagesIndex() {
    return (
        <div className="space-y-4">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="text-lg font-bold">페이지 관리</div>
                <div className="mt-2 text-sm text-gray-600">
                    회사소개/고객센터 내용을 수정합니다.
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {ITEMS.map((it) => (
                        <Link
                            key={it.slug}
                            href={`/admin/pages/${it.slug}/edit`}
                            className="rounded-2xl border bg-white p-4 hover:bg-gray-50"
                        >
                            <div className="text-base font-semibold">{it.label}</div>
                            <div className="mt-1 text-sm text-gray-600">
                                slug: <span className="font-mono">{it.slug}</span>
                            </div>
                            <div className="mt-3 text-xs text-gray-500">수정하기 →</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}