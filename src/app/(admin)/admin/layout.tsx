import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/adminAuth";
import LogoutButton from "@/components/admin/LogoutButton";
import "./admin.css";

const NAV_ITEMS = [
    { href: "/admin", label: "대시보드" },
    { href: "/admin/stores", label: "매장 관리" },
    { href: "/admin/pages", label: "페이지 관리" },
];

export default async function AdminLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    if (!(await isAdminAuthed())) redirect("/admin/login");

    return (
        <div className="admin-root">
            <div className="admin-shell">
                <div className="admin-topbar mb-6 rounded-[28px] px-5 py-5">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <div className="admin-badge">ADMIN / CALLSERVICE</div>
                                <div className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                                    콜서비스 관리자
                                </div>
                                <div className="admin-muted mt-2 text-sm">
                                    매장 / 페이지 / 운영 데이터를 한 곳에서 관리합니다.
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <LogoutButton />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {NAV_ITEMS.map((item) => (
                                <Link key={item.href} href={item.href} className="admin-nav-link">
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {children}

                <div className="admin-footer-note mt-10 text-center text-xs">
                    © CallService Admin / 운영자 전용 관리 화면
                </div>
            </div>
        </div>
    );
}