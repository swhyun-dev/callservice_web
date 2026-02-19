import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/adminAuth";
import LogoutButton from "@/components/admin/LogoutButton";
import "./admin.css";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    if (!(await isAdminAuthed())) redirect("/admin/login");

    return (
        <div className="admin-root min-h-dvh">
            <div className="mx-auto max-w-6xl px-4 py-6">

                {/* Top Bar */}
                <div className="admin-card mb-6 rounded-3xl px-5 py-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <div className="text-lg font-extrabold tracking-tight">
                                콜서비스 관리자
                            </div>
                            <div className="admin-muted mt-1 text-sm">
                                매장/페이지 데이터를 관리합니다.
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Link
                                href="/admin"
                                className="admin-btn-outline rounded-2xl px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                            >
                                대시보드
                            </Link>
                            <Link
                                href="/admin/stores"
                                className="admin-btn-outline rounded-2xl px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                            >
                                매장 관리
                            </Link>
                            <Link
                                href="/admin/pages"
                                className="admin-btn-outline rounded-2xl px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                            >
                                페이지 관리
                            </Link>

                            {/* ✅ 로그아웃 */}
                            <LogoutButton />
                        </div>
                    </div>
                </div>

                {children}

                <div className="admin-muted mt-10 text-center text-xs">
                    © CallService Admin
                </div>
            </div>
        </div>
    );
}