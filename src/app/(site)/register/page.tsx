// src/app/(site)/register/page.tsx
export const dynamic = "force-dynamic";

export default function RegisterPage() {
    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">매장등록</h1>
                <p className="mt-2 text-sm text-gray-500">
                    콜서비스에 매장 정보를 등록하거나 수정하고 싶으신 경우 아래 안내에 따라 문의해 주세요.
                </p>

                <div className="mt-8 space-y-8 text-sm leading-7 text-gray-700">
                    <section>
                        <h2 className="text-base font-semibold text-gray-900">등록 안내</h2>
                        <p className="mt-2">
                            신규 매장 등록, 기존 매장 정보 수정, 노출 관련 문의는 고객센터를 통해 접수할 수
                            있습니다. 접수 후 담당자가 확인하여 순차적으로 안내드립니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">등록 가능 항목</h2>
                        <div className="mt-2 space-y-1">
                            <div>1. 매장명</div>
                            <div>2. 연락처</div>
                            <div>3. 주소</div>
                            <div>4. 업종/서비스 유형</div>
                            <div>5. 대표 이미지 및 소개 문구</div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">접수 방법</h2>
                        <p className="mt-2">
                            자세한 등록 문의는 고객센터 페이지를 이용하시거나 대표번호 1588-3353으로 문의해
                            주세요.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">유의사항</h2>
                        <p className="mt-2">
                            등록 요청 내용은 운영 정책에 따라 검토 후 반영되며, 허위 또는 부정확한 정보는
                            등록이 제한되거나 수정 요청될 수 있습니다.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}