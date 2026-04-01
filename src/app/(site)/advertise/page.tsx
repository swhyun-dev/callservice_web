// src/app/(site)/advertise/page.tsx
export const dynamic = "force-dynamic";

export default function AdvertisePage() {
    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    광고안내
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    콜서비스는 전국 매장 정보를 찾는 이용자에게 다양한 매장을 효과적으로 소개할 수 있는
                    광고/홍보 공간을 운영합니다.
                </p>

                <div className="mt-8 space-y-8 text-sm leading-7 text-gray-700">
                    <section>
                        <h2 className="text-base font-semibold text-gray-900">광고 안내</h2>
                        <p className="mt-2">
                            브랜드/매장/서비스 홍보를 원하시는 경우 콜서비스 고객센터를 통해 광고 문의를
                            접수하실 수 있습니다. 업종 및 지역 특성에 맞춘 노출 방식은 별도 협의를 통해
                            안내드립니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">가능한 광고 유형</h2>
                        <div className="mt-2 space-y-1">
                            <div>1. 메인/목록 영역 노출</div>
                            <div>2. 지역 기반 홍보 노출</div>
                            <div>3. 제휴/브랜드 소개 페이지 연결</div>
                            <div>4. 기타 맞춤형 프로모션 진행</div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">문의 방법</h2>
                        <p className="mt-2">
                            광고 집행 관련 문의는 고객센터 페이지 또는 대표 연락처를 통해 접수해 주세요.
                            접수 후 담당자가 확인하여 순차적으로 안내드립니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">유의사항</h2>
                        <p className="mt-2">
                            광고 내용은 서비스 운영 정책에 따라 제한되거나 조정될 수 있으며, 허위/과장성
                            내용 또는 운영 목적에 부적합한 광고는 진행이 제한될 수 있습니다.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}