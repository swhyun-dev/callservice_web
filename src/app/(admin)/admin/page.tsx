import Link from "next/link";

const stats = [
    { label: "관리 메뉴", value: "2", desc: "매장 관리 / 페이지 관리" },
    { label: "운영 상태", value: "ON", desc: "관리자 인증 및 편집 기능 사용 가능" },
    { label: "현재 단계", value: "MVP", desc: "출시 전 운영 UI 정리 단계" },
];

const shortcuts = [
    {
        href: "/admin/stores",
        icon: "🏪",
        title: "매장 관리",
        desc: "매장 목록 조회 / 등록 / 수정 / 삭제 / 활성화 상태를 관리합니다.",
        cta: "매장 관리로 이동",
    },
    {
        href: "/admin/pages",
        icon: "📝",
        title: "페이지 관리",
        desc: "회사소개 / 고객센터 등 사용자에게 노출되는 정적 페이지를 편집합니다.",
        cta: "페이지 관리로 이동",
    },
];

const guides = [
    {
        title: "운영 전 점검",
        desc: "대표 연락처 / 회사소개 / 고객센터 문구 / 노출 정보가 최신인지 확인하세요.",
    },
    {
        title: "매장 데이터 관리",
        desc: "매장 등록 후에는 주소 / 전화번호 / 업종 정보가 올바른지 한 번 더 점검하세요.",
    },
    {
        title: "배포 전 체크",
        desc: "관리자 비밀번호 / 세션 시크릿 / 운영 환경변수는 반드시 실제 값으로 교체하세요.",
    },
];

export default function AdminHomePage() {
    return (
        <div className="space-y-6">
            <section className="admin-card rounded-[28px] p-6 md:p-7">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                            운영 대시보드
                        </div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">
                            콜서비스 관리자 화면입니다. 매장 정보와 사용자 노출 페이지를
                            관리하고, 운영 전 필수 점검 항목을 빠르게 확인할 수 있습니다.
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Link href="/admin/stores" className="admin-btn">
                                매장 관리 바로가기
                            </Link>
                            <Link href="/admin/pages" className="admin-btn-outline">
                                페이지 관리 바로가기
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[24px] bg-slate-50 p-4 text-sm text-slate-600 lg:max-w-sm">
                        <div className="font-bold text-slate-900">빠른 작업 안내</div>
                        <div className="mt-2 leading-6">
                            신규 매장 등록, 엑셀 업로드, 회사소개 / 고객센터 편집 같은 주요
                            작업을 이 화면에서 바로 시작할 수 있도록 구성했습니다.
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.label} className="admin-stat-card">
                        <div className="admin-stat-label">{item.label}</div>
                        <div className="admin-stat-value">{item.value}</div>
                        <div className="admin-stat-desc">{item.desc}</div>
                    </div>
                ))}
            </section>

            <section className="admin-card rounded-[28px] p-6 md:p-7">
                <div className="admin-section-title">주요 관리 메뉴</div>
                <div className="admin-section-desc">
                    운영자가 가장 자주 사용하는 기능을 빠르게 접근할 수 있도록 정리했습니다.
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {shortcuts.map((item) => (
                        <Link key={item.href} href={item.href} className="admin-feature-card">
                            <div className="admin-feature-icon">{item.icon}</div>
                            <div className="mt-4 text-lg font-bold tracking-tight text-slate-900">
                                {item.title}
                            </div>
                            <div className="mt-2 text-sm leading-6 text-slate-600">
                                {item.desc}
                            </div>
                            <div className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                                {item.cta}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="admin-card rounded-[28px] p-6 md:p-7">
                    <div className="admin-section-title">운영 체크리스트</div>
                    <div className="admin-section-desc">
                        배포 전 / 운영 중 자주 확인하는 항목입니다.
                    </div>

                    <div className="admin-list mt-6">
                        {guides.map((item) => (
                            <div key={item.title} className="admin-list-item">
                                <div className="admin-list-dot" />
                                <div>
                                    <div className="text-sm font-bold text-slate-900">{item.title}</div>
                                    <div className="mt-1 text-sm leading-6 text-slate-600">
                                        {item.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-card-soft rounded-[28px] p-6 md:p-7">
                    <div className="admin-section-title">관리 팁</div>
                    <div className="admin-section-desc">
                        실운영에서 자주 필요한 포인트입니다.
                    </div>

                    <div className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                            매장 데이터 수정 후에는 사용자 페이지에서 실제 노출 상태를 한 번
                            확인하는 것이 좋습니다.
                        </div>
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                            페이지 관리 문구는 너무 길지 않게 유지하고, 연락처 / 운영시간은
                            footer와 맞춰두면 신뢰도가 높아집니다.
                        </div>
                        <div className="rounded-2xl bg-white p-4 shadow-sm">
                            엑셀 업로드 기능을 자주 사용할 예정이라면 중복 처리 기준도 다음
                            단계에서 같이 보완하는 것이 좋습니다.
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}