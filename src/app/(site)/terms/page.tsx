// src/app/(site)/terms/page.tsx
export const dynamic = "force-dynamic";

export default function TermsPage() {
    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    이용약관
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    본 약관은 콜서비스 웹사이트 이용과 관련된 기본적인 권리, 의무 및 책임사항을
                    규정합니다.
                </p>

                <div className="mt-8 space-y-6 text-sm leading-7 text-gray-700">
                    <section>
                        <h2 className="text-base font-semibold text-gray-900">제1조 목적</h2>
                        <p className="mt-2">
                            이 약관은 콜서비스가 제공하는 매장안내 서비스의 이용과 관련하여 회사와
                            이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">제2조 용어의 정의</h2>
                        <p className="mt-2">
                            1. “서비스”란 회사가 제공하는 전국 매장 정보 조회 및 관련 부가 기능을
                            의미합니다.
                            <br />
                            2. “이용자”란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 모든
                            방문자 및 회원을 의미합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">제3조 약관의 효력 및 변경</h2>
                        <p className="mt-2">
                            회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할
                            수 있으며, 변경된 약관은 웹사이트에 공지함으로써 효력이 발생합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">제4조 서비스의 제공</h2>
                        <p className="mt-2">
                            회사는 다음과 같은 서비스를 제공합니다.
                            <br />
                            1. 지역별 매장 정보 제공
                            <br />
                            2. 매장 상세 정보 및 연락처 안내
                            <br />
                            3. 기타 회사가 정하는 부가 서비스
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">제5조 서비스 이용 제한</h2>
                        <p className="mt-2">
                            회사는 시스템 점검, 장애, 천재지변 등 불가피한 사유가 있는 경우 서비스
                            제공을 일시적으로 제한하거나 중단할 수 있습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">제6조 이용자의 의무</h2>
                        <p className="mt-2">
                            이용자는 서비스를 이용함에 있어 관련 법령, 본 약관, 공지사항 등을
                            준수하여야 하며, 다음 행위를 하여서는 안 됩니다.
                            <br />
                            1. 서비스 운영을 방해하는 행위
                            <br />
                            2. 허위 정보 입력 및 부정확한 정보 유포
                            <br />
                            3. 회사 및 제3자의 권리를 침해하는 행위
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">제7조 면책사항</h2>
                        <p className="mt-2">
                            회사는 매장 정보의 최신성 및 정확성을 유지하기 위해 노력하나, 제휴처 또는
                            외부 제공 정보의 변경으로 인해 일부 정보가 실제와 다를 수 있으며, 이에 대해
                            관련 법령이 허용하는 범위 내에서 책임을 제한할 수 있습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-semibold text-gray-900">제8조 문의</h2>
                        <p className="mt-2">
                            서비스 이용과 관련한 문의사항은 고객센터 페이지를 통해 접수할 수 있습니다.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}