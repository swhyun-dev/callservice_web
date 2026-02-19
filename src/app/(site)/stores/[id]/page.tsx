import { prisma } from "@/lib/db";
import Link from "next/link";

function buildNaverMapUrl({
                              name,
                              lat,
                              lng,
                              address,
                          }: {
    name: string;
    lat: number | null;
    lng: number | null;
    address: string;
}) {
    if (lat != null && lng != null) {
        return `https://map.naver.com/?lng=${lng}&lat=${lat}&title=${encodeURIComponent(
            name
        )}`;
    }
    return `https://map.naver.com/v5/search/${encodeURIComponent(
        `${name} ${address}`
    )}`;
}

function telHref(phone: string) {
    return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

// ✅ 핵심: params가 Promise일 수 있으므로 await로 풀기
export default async function StoreDetailPage({
                                                  params,
                                              }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params; // ✅ 여기!
    const storeId = Number(id);

    if (!Number.isFinite(storeId)) {
        return (
            <div className="rounded-3xl border bg-white p-8">
                <div className="text-sm text-gray-700">잘못된 접근입니다.</div>
                <Link href="/" className="mt-4 inline-block text-sm underline">
                    매장안내로 돌아가기
                </Link>
            </div>
        );
    }

    const store = await prisma.store.findFirst({
        where: { id: storeId, isActive: true },
        include: { images: { orderBy: { idx: "asc" } } },
    });

    if (!store) {
        return (
            <div className="rounded-3xl border bg-white p-8">
                <div className="text-base font-semibold text-gray-900">
                    매장을 찾을 수 없습니다.
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    삭제되었거나 비활성화된 매장일 수 있어요.
                </div>
                <Link href="/" className="mt-4 inline-block text-sm underline">
                    매장안내로 돌아가기
                </Link>
            </div>
        );
    }

    const fullAddress = `${store.addr1} ${store.addr2} ${store.addressDetail}`.trim();
    const mapUrl = buildNaverMapUrl({
        name: store.name,
        lat: store.lat,
        lng: store.lng,
        address: fullAddress,
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Link href="/" className="text-sm text-gray-600 hover:underline">
                    ← 매장 목록
                </Link>
                <span className="rounded-full bg-gray-900 px-3 py-1 text-xs text-white">
          {store.category}
        </span>
            </div>

            <section className="overflow-hidden rounded-3xl border bg-white shadow-sm">
                <div className="aspect-[16/10] w-full bg-gray-100">
                    {store.images[0] ? (
                        <img
                            src={store.images[0].imageUrl}
                            alt={store.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="grid h-full place-items-center text-gray-400">
                            이미지 없음
                        </div>
                    )}
                </div>

                <div className="space-y-5 p-6">
                    <h1 className="text-xl font-bold text-gray-900">{store.name}</h1>

                    <div className="space-y-3 rounded-2xl bg-gray-50 p-4 text-sm">
                        <div>
                            <div className="text-xs text-gray-500">주소</div>
                            <div className="mt-1 text-gray-900">{fullAddress}</div>
                        </div>

                        <div>
                            <div className="text-xs text-gray-500">전화번호</div>
                            <div className="mt-1 font-medium text-gray-900">{store.phone}</div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <a
                            href={mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 rounded-full bg-gray-900 py-3 text-center text-sm font-semibold text-white hover:bg-black"
                        >
                            네이버지도 보기
                        </a>

                        <a
                            href={telHref(store.phone)}
                            className="flex-1 rounded-full border bg-white py-3 text-center text-sm font-semibold text-gray-900 hover:bg-gray-100"
                        >
                            전화걸기
                        </a>
                    </div>

                    {store.description && (
                        <div>
                            <div className="text-sm font-semibold text-gray-900">매장 소개</div>
                            <p className="mt-2 whitespace-pre-line text-sm text-gray-700">
                                {store.description}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {store.images.length > 1 && (
                <section className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="mb-3 text-sm font-semibold text-gray-900">추가 이미지</div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {store.images.slice(1).map((img) => (
                            <div
                                key={img.id}
                                className="aspect-square overflow-hidden rounded-2xl border bg-gray-100"
                            >
                                <img
                                    src={img.imageUrl}
                                    alt={`${store.name} 추가 이미지`}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}