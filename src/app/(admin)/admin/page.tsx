import Link from "next/link";

export default function AdminHomePage() {
    return (
        <div className="space-y-6">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="text-xl font-bold">대시보드</div>
                <div className="mt-2 text-sm text-gray-600">
                    매장/페이지 데이터를 관리합니다.
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Link
                        href="/admin/stores"
                        className="rounded-2xl border bg-white p-4 hover:bg-gray-50"
                    >
                        <div className="text-base font-semibold">매장 관리</div>
                        <div className="mt-1 text-sm text-gray-600">
                            목록/등록/수정/활성화 관리
                        </div>
                    </Link>

                    <Link
                        href="/admin/pages"
                        className="rounded-2xl border bg-white p-4 hover:bg-gray-50"
                    >
                        <div className="text-base font-semibold">회사소개/고객센터</div>
                        <div className="mt-1 text-sm text-gray-600">
                            about/support 페이지 편집
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}