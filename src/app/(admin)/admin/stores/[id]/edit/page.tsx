export const dynamic = 'force-dynamic';
import Link from "next/link";
import { prisma } from "@/lib/db";
import {
    MapPin,
    Pencil,
    Phone,
    Plus,
    Store,
    Upload,
} from "lucide-react";

export const dynamic = "force-dynamic";

function formatAddress(
    zipCode: string | null,
    address: string | null,
    addressDetail: string | null
) {
    return [zipCode, address, addressDetail].filter(Boolean).join(" / ");
}

export default async function AdminStoresPage() {
    const stores = await prisma.store.findMany({
        orderBy: { id: "desc" },
        include: {
            images: {
                orderBy: { idx: "asc" },
                take: 1,
            },
        },
    });

    const totalCount = stores.length;
    const activeCount = stores.filter((store) => store.isActive).length;
    const inactiveCount = totalCount - activeCount;

    return (
        <>
            <div className="space-y-6">
                <section className="admin-card rounded-[28px] p-6 md:p-7">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="text-2xl font-extrabold tracking-tight text-slate-900">
                                매장 관리
                            </div>
                            <div className="mt-2 text-sm leading-6 text-slate-600">
                                등록된 매장 정보를 확인하고 수정할 수 있습니다. 신규 매장 등록은
                                우측 하단의 플로팅 + 버튼으로 빠르게 이동할 수 있습니다.
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Link href="/admin/stores/import" className="admin-btn-outline">
                                <Upload className="h-4 w-4" />
                                <span>엑셀 업로드</span>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div className="admin-stat-card">
                            <div className="admin-stat-label">전체 매장</div>
                            <div className="admin-stat-value">{totalCount}</div>
                            <div className="admin-stat-desc">현재 등록된 전체 매장 수</div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="admin-stat-label">활성 매장</div>
                            <div className="admin-stat-value">{activeCount}</div>
                            <div className="admin-stat-desc">사용자 페이지에 노출 중인 매장</div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="admin-stat-label">비활성 매장</div>
                            <div className="admin-stat-value">{inactiveCount}</div>
                            <div className="admin-stat-desc">숨김 또는 점검 상태의 매장</div>
                        </div>
                    </div>
                </section>

                <section className="admin-card rounded-[28px] p-6 md:p-7">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="admin-section-title">매장 목록</div>
                            <div className="admin-section-desc">
                                최근 등록 순으로 정렬되어 있습니다.
                            </div>
                        </div>

                        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            총 <span className="font-bold text-slate-900">{totalCount}</span>개
                        </div>
                    </div>

                    {stores.length === 0 ? (
                        <div className="mt-6 rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                                <Store className="h-6 w-6 text-slate-400" />
                            </div>
                            <div className="mt-4 text-lg font-bold text-slate-900">
                                등록된 매장이 없습니다
                            </div>
                            <div className="mt-2 text-sm text-slate-600">
                                우측 하단의 + 버튼을 눌러 첫 매장을 등록해보세요.
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 grid gap-4">
                            {stores.map((store) => {
                                const thumb = store.images[0]?.imageUrl ?? null;
                                const fullAddress = formatAddress(
                                    store.addr2,
                                    store.addr1,
                                    store.addressDetail
                                );

                                return (
                                    <div
                                        key={store.id}
                                        className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            <div className="h-44 w-full shrink-0 bg-slate-100 md:h-auto md:w-56">
                                                {thumb ? (
                                                    <img
                                                        src={thumb}
                                                        alt={store.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full min-h-44 items-center justify-center text-sm font-medium text-slate-400">
                                                        이미지 없음
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-1 flex-col p-5 md:p-6">
                                                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                                    <div className="min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2">
                              <span
                                  className={
                                      store.isActive ? "admin-badge" : "admin-btn-soft"
                                  }
                              >
                                {store.isActive ? "노출중" : "비활성"}
                              </span>

                                                            {store.category ? (
                                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                  {store.category}
                                </span>
                                                            ) : null}
                                                        </div>

                                                        <div className="mt-3 text-xl font-extrabold tracking-tight text-slate-900">
                                                            {store.name}
                                                        </div>

                                                        <div className="mt-4 space-y-2 text-sm text-slate-600">
                                                            <div className="flex items-start gap-2">
                                                                <Phone className="mt-0.5 h-4 w-4 text-slate-400" />
                                                                <span>{store.phone || "-"}</span>
                                                            </div>

                                                            <div className="flex items-start gap-2">
                                                                <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
                                                                <span>{fullAddress || "-"}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2">
                                                        <Link
                                                            href={`/admin/stores/${store.id}/edit`}
                                                            className="admin-btn-outline"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                            <span>수정</span>
                                                        </Link>
                                                    </div>
                                                </div>

                                                <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:grid-cols-4">
                                                    <div>
                                                        <div className="font-semibold text-slate-700">매장 ID</div>
                                                        <div className="mt-1">{store.id}</div>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-700">우편번호</div>
                                                        <div className="mt-1">{store.addr2 || "-"}</div>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-700">주소</div>
                                                        <div className="mt-1 break-all">{store.addr1 || "-"}</div>
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-700">상세주소</div>
                                                        <div className="mt-1 break-all">
                                                            {store.addressDetail || "-"}
                                                        </div>
                                                    </div>
                                                </div>

                                                {store.description ? (
                                                    <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
                                                        {store.description}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>

            <Link
                href="/admin/stores/new"
                aria-label="매장 등록"
                title="매장 등록"
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
                <Plus className="h-6 w-6" />
            </Link>
        </>
    );
}