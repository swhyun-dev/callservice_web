import Link from "next/link";

function formatPhone(phone: string) {
    return phone.replace(/\s+/g, " ").trim();
}

export default function StoreListItem(props: {
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
            className="block border-b bg-white px-4 py-4 hover:bg-gray-50"
        >
            <div className="flex gap-3">
                {/* 왼쪽 이미지 */}
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                    {props.thumbUrl ? (
                        <img
                            src={props.thumbUrl}
                            alt={props.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="grid h-full w-full place-items-center text-[11px] text-gray-500">
                            이미지 없음
                        </div>
                    )}
                </div>

                {/* 오른쪽 정보 */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <div className="truncate text-[15px] font-semibold text-gray-900">
                                {props.name}
                            </div>
                            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700">
                  {props.category}
                </span>
                            </div>
                        </div>
                        <div className="text-xs text-gray-400">›</div>
                    </div>

                    <div className="mt-2 line-clamp-1 text-sm text-gray-700">{fullAddr}</div>
                    <div className="mt-1 text-sm font-medium text-gray-900">
                        {formatPhone(props.phone)}
                    </div>
                </div>
            </div>
        </Link>
    );
}