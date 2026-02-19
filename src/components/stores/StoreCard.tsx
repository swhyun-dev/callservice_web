import Link from "next/link";

function formatPhone(phone: string) {
    return phone.replace(/\s+/g, " ").trim();
}

export default function StoreCard(props: {
    id: number;
    name: string;
    category: string;
    phone: string;
    addr1: string;
    addr2: string;
    addressDetail: string;
    thumbUrl: string | null;
}) {
    const fullAddr = `${props.addr1} ${props.addr2} ${props.addressDetail}`.trim();

    return (
        <Link
            href={`/stores/${props.id}`}
            prefetch // ✅ 상세 페이지 미리 로드(체감 UX 좋아짐)
            className="group block overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                {props.thumbUrl ? (
                    <img
                        src={props.thumbUrl}
                        alt={props.name}
                        className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                        loading="lazy"
                    />
                ) : (
                    <div className="grid h-full w-full place-items-center text-xs text-gray-500">
                        이미지 없음
                    </div>
                )}
            </div>

            <div className="p-3 sm:p-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-base font-semibold text-gray-900">{props.name}</div>
                        <div className="mt-1 inline-flex rounded-full bg-gray-100 px-2 py-1 text-[11px] text-gray-700">
                            {props.category}
                        </div>
                    </div>

                    <div className="text-[11px] text-gray-500">상세 보기 →</div>
                </div>

                <div className="mt-3 space-y-1.5 text-sm text-gray-700">
                    <div className="line-clamp-2">{fullAddr}</div>
                    <div className="font-medium text-gray-900">{formatPhone(props.phone)}</div>
                </div>
            </div>
        </Link>
    );
}