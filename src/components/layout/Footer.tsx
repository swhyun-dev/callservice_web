"use client";

import Link from "next/link";
import { Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

const quickRegions = ["서울", "경기", "인천", "부산", "대구", "제주"];
const quickCategories = ["콜택시", "대리운전", "24시간", "예약가능"];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-14 border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
                    <section>
                        <div className="flex items-center gap-3">
                            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gray-900 text-sm font-bold text-white shadow-sm">
                                CS
                            </div>
                            <div>
                                <div className="text-base font-bold tracking-tight text-gray-900">
                                    콜서비스
                                </div>
                                <div className="text-sm text-gray-500">
                                    전국 콜택시 / 대리운전 매장안내
                                </div>
                            </div>
                        </div>

                        <p className="mt-4 max-w-md text-sm leading-6 text-gray-600">
                            지역과 업종 기준으로 전국 매장 정보를 보다 쉽고 빠르게 찾을 수 있도록
                            정리한 안내 서비스입니다. 모바일에서도 가까운 매장을 편하게 찾을 수
                            있게 구성했습니다.
                        </p>

                        <div className="mt-5 space-y-2 text-sm text-gray-600">
                            <div className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                                <span>전국 지역 기반 매장 정보 제공 서비스</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <ShieldCheck className="mt-0.5 h-4 w-4 text-gray-400" />
                                <span>정확한 정보 제공을 위해 지속적으로 업데이트 중입니다.</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="text-sm font-semibold text-gray-900">바로가기</div>
                        <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
                            <Link href="/" className="transition hover:text-gray-900">
                                매장안내
                            </Link>
                            <Link href="/support" className="transition hover:text-gray-900">
                                고객센터
                            </Link>
                            <Link href="/about" className="transition hover:text-gray-900">
                                회사소개
                            </Link>
                            <button
                                type="button"
                                className="text-left transition hover:text-gray-900"
                            >
                                개인정보처리방침
                            </button>
                            <button
                                type="button"
                                className="text-left transition hover:text-gray-900"
                            >
                                이용약관
                            </button>
                        </div>
                    </section>

                    <section>
                        <div className="text-sm font-semibold text-gray-900">빠른 찾기</div>

                        <div className="mt-4">
                            <div className="text-xs font-medium text-gray-400">주요 지역</div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {quickRegions.map((region) => (
                                    <Link
                                        key={region}
                                        href={`/?addr1=${encodeURIComponent(region)}`}
                                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                                    >
                                        {region}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5">
                            <div className="text-xs font-medium text-gray-400">주요 업종</div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {quickCategories.map((category) => (
                                    <Link
                                        key={category}
                                        href={`/?category=${encodeURIComponent(category)}`}
                                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="text-sm font-semibold text-gray-900">고객 안내</div>

                        <div className="mt-4 space-y-4 text-sm text-gray-600">
                            <div className="flex items-start gap-3">
                                <Clock3 className="mt-0.5 h-4 w-4 text-gray-400" />
                                <div>
                                    <div className="font-medium text-gray-800">운영시간</div>
                                    <div className="mt-1">평일 09:00 ~ 18:00</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone className="mt-0.5 h-4 w-4 text-gray-400" />
                                <div>
                                    <div className="font-medium text-gray-800">대표 문의</div>
                                    <div className="mt-1">010-1234-5678</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-4 w-4 text-gray-400" />
                                <div>
                                    <div className="font-medium text-gray-800">이메일</div>
                                    <div className="mt-1">cs@callservice.co.kr</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 rounded-2xl bg-gray-50 p-4 text-xs leading-5 text-gray-500">
                            등록된 매장 정보가 실제와 다를 경우 고객센터를 통해 수정 요청하실 수
                            있습니다.
                        </div>
                    </section>
                </div>
            </div>

            <div className="border-t border-gray-100 bg-gray-50">
                <div className="mx-auto max-w-6xl px-4 py-5">
                    <div className="flex flex-col gap-3 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
                        <div>© {year} 콜서비스. All rights reserved.</div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span>상호: 콜서비스</span>
                            <span>대표: 홍길동</span>
                            <span>사업자등록번호: 123-45-67890</span>
                            <span>통신판매업신고: 2026-서울강남-0000</span>
                        </div>
                    </div>

                    <div className="mt-3 text-[11px] leading-5 text-gray-400">
                        본 사이트의 매장 정보 및 연락처는 운영 정책에 따라 수정될 수 있으며,
                        일부 정보는 제휴 매장 또는 등록 요청에 의해 반영될 수 있습니다.
                    </div>
                </div>
            </div>
        </footer>
    );
}