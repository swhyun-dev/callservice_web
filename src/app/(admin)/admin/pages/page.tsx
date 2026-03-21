import Link from "next/link";

const ITEMS = [
    {
        slug: "about",
        label: "회사소개",
        desc: "서비스 소개 / 운영 목적 / 안내 문구를 관리합니다.",
    },
    {
        slug: "support",
        label: "고객센터",
        desc: "문의 방법 / 운영시간 / 안내 내용을 관리합니다.",
    },
];

export default function AdminPagesIndex() {
    return (
        <div className="space-y-6">
            <section className="admin-card rounded-[28px] p-6 md:p-7">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                            페이지 관리
                        </div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">
                            사용자에게 노출되는 정적 페이지를 수정합니다.
                        </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                        about / support 페이지 편집 가능
                    </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {ITEMS.map((it) => (
                        <Link
                            key={it.slug}
                            href={`/admin/pages/${it.slug}/edit`}
                            className="admin-feature-card"
                        >
                            <div className="admin-feature-icon">
                                {it.slug === "about" ? "ℹ️" : "📞"}
                            </div>

                            <div className="mt-4 text-lg font-bold tracking-tight text-slate-900">
                                {it.label}
                            </div>

                            <div className="mt-2 text-sm leading-6 text-slate-600">
                                {it.desc}
                            </div>

                            <div className="mt-4 text-xs font-semibold text-slate-500">
                                slug / <span className="font-mono">{it.slug}</span>
                            </div>

                            <div className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                                수정하기
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}