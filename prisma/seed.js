import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
    }),
});

async function main() {
    /* ---------------------------
       Page (회사소개 / 고객센터)
    --------------------------- */
    // 회사소개
    await prisma.page.upsert({
        where: { slug: "about" },
        update: {
            title: "회사소개",
            content: `
      <div class="cs-page">
        <p class="cs-lead">콜서비스는 전국 매장을 한 곳에서 쉽고 빠르게 찾을 수 있도록 연결합니다.</p>

        <div class="cs-grid">
          <div class="cs-card">
            <h3>우리가 해결하는 문제</h3>
            <ul>
              <li>지역별/업종별 매장을 찾기 어려움</li>
              <li>전화/지도 연결이 번거로움</li>
              <li>정보가 흩어져 최신성이 떨어짐</li>
            </ul>
          </div>

          <div class="cs-card">
            <h3>콜서비스의 기준</h3>
            <ul>
              <li><b>간결함</b>: 필요한 정보만 빠르게</li>
              <li><b>정확함</b>: 관리자 검수/업데이트</li>
              <li><b>편리함</b>: 지도/전화 원클릭</li>
            </ul>
          </div>

          <div class="cs-card">
            <h3>운영 원칙</h3>
            <ul>
              <li>불필요한 광고/과장 최소화</li>
              <li>정보 변경은 빠르게 반영</li>
              <li>사용자 피드백 우선</li>
            </ul>
          </div>
        </div>

        <div class="cs-cta">
          <div>
            <div class="cs-cta-title">매장을 등록하고 싶으신가요?</div>
            <div class="cs-cta-desc">고객센터로 문의 주시면 안내해드릴게요.</div>
          </div>
          <a class="cs-btn" href="/support">고객센터 이동</a>
        </div>
      </div>
    `,
            isActive: true,
        },
        create: {
            slug: "about",
            title: "회사소개",
            content: `
      <div class="cs-page">
        <p class="cs-lead">콜서비스는 전국 매장을 한 곳에서 쉽고 빠르게 찾을 수 있도록 연결합니다.</p>

        <div class="cs-grid">
          <div class="cs-card">
            <h3>우리가 해결하는 문제</h3>
            <ul>
              <li>지역별/업종별 매장을 찾기 어려움</li>
              <li>전화/지도 연결이 번거로움</li>
              <li>정보가 흩어져 최신성이 떨어짐</li>
            </ul>
          </div>

          <div class="cs-card">
            <h3>콜서비스의 기준</h3>
            <ul>
              <li><b>간결함</b>: 필요한 정보만 빠르게</li>
              <li><b>정확함</b>: 관리자 검수/업데이트</li>
              <li><b>편리함</b>: 지도/전화 원클릭</li>
            </ul>
          </div>

          <div class="cs-card">
            <h3>운영 원칙</h3>
            <ul>
              <li>불필요한 광고/과장 최소화</li>
              <li>정보 변경은 빠르게 반영</li>
              <li>사용자 피드백 우선</li>
            </ul>
          </div>
        </div>

        <div class="cs-cta">
          <div>
            <div class="cs-cta-title">매장을 등록하고 싶으신가요?</div>
            <div class="cs-cta-desc">고객센터로 문의 주시면 안내해드릴게요.</div>
          </div>
          <a class="cs-btn" href="/support">고객센터 이동</a>
        </div>
      </div>
    `,
            isActive: true,
        },
    });

// 고객센터
    await prisma.page.upsert({
        where: { slug: "support" },
        update: {
            title: "고객센터",
            content: `
      <div class="cs-page">
        <div class="cs-support-head">
          <div>
            <div class="cs-kicker">빠르게 도와드릴게요</div>
            <h2 class="cs-title">콜서비스 고객센터</h2>
            <p class="cs-sub">
              운영시간 내에는 최대한 빠르게 답변드립니다. (평일 09:00~18:00 / 점심 12:00~13:00)
            </p>
          </div>

          <div class="cs-support-box">
            <div class="cs-support-label">대표번호</div>
            <div class="cs-support-phone">1588-0000</div>
            <a class="cs-btn" href="tel:15880000">전화걸기</a>
          </div>
        </div>

        <div class="cs-grid">
          <div class="cs-card">
            <h3>자주 묻는 문의</h3>
            <ul>
              <li>매장 정보 수정/삭제 요청</li>
              <li>매장 신규 등록 문의</li>
              <li>공지/소식 제보</li>
            </ul>
          </div>

          <div class="cs-card">
            <h3>매장 등록 안내</h3>
            <ul>
              <li>상호명 / 업종 / 주소 / 전화번호</li>
              <li>대표 이미지 1장</li>
              <li>소개글(선택)</li>
            </ul>
          </div>

          <div class="cs-card">
            <h3>답변 방식</h3>
            <ul>
              <li>전화: 즉시 응대</li>
              <li>운영시간 외: 다음 영업일 순차 처리</li>
            </ul>
          </div>
        </div>

        <div class="cs-note">
          <b>참고</b> 개인정보/민감정보는 전화로 안내 부탁드립니다.
        </div>
      </div>
    `,
            isActive: true,
        },
        create: {
            slug: "support",
            title: "고객센터",
            content: `
      <div class="cs-page"> ... (위와 동일) ... </div>
    `,
            isActive: true,
        },
    });

    /* ---------------------------
       Store 샘플 데이터
    --------------------------- */
    const stores = [
        {
            name: "강남 콜서비스",
            category: "대리운전",
            phone: "02-1234-5678",
            addr1: "서울",
            addr2: "강남구",
            addressDetail: "테헤란로 123",
            lat: 37.498095,
            lng: 127.02761,
            description: "강남 지역 전문 콜서비스입니다.",
            thumbUrl: "https://picsum.photos/seed/store1/800/500",
        },
        {
            name: "홍대 콜서비스",
            category: "콜택시",
            phone: "02-2345-6789",
            addr1: "서울",
            addr2: "마포구",
            addressDetail: "홍익로 55",
            lat: 37.556791,
            lng: 126.92302,
            description: "홍대/합정 빠른 배차",
            thumbUrl: "https://picsum.photos/seed/store2/800/500",
        },
        {
            name: "분당 콜서비스",
            category: "대리운전",
            phone: "031-345-6789",
            addr1: "경기",
            addr2: "성남시",
            addressDetail: "분당로 87",
            lat: 37.378225,
            lng: 127.115,
            description: "분당 전 지역 24시간 운영",
            thumbUrl: "https://picsum.photos/seed/store3/800/500",
        },
        {
            name: "수원 콜서비스",
            category: "콜택시",
            phone: "031-456-7890",
            addr1: "경기",
            addr2: "수원시",
            addressDetail: "영통로 12",
            lat: 37.251,
            lng: 127.071,
            description: "수원시 믿을 수 있는 콜서비스",
            thumbUrl: "https://picsum.photos/seed/store4/800/500",
        },
        {
            name: "해운대 콜서비스",
            category: "대리운전",
            phone: "051-123-4567",
            addr1: "부산",
            addr2: "해운대구",
            addressDetail: "해운대해변로 99",
            lat: 35.158698,
            lng: 129.160384,
            description: "해운대 관광지 전문 콜서비스",
            thumbUrl: "https://picsum.photos/seed/store5/800/500",
        },
        {
            name: "서면 콜서비스",
            category: "콜택시",
            phone: "051-234-5678",
            addr1: "부산",
            addr2: "부산진구",
            addressDetail: "중앙대로 711",
            lat: 35.1579,
            lng: 129.0596,
            description: "서면 중심 빠른 배차",
            thumbUrl: "https://picsum.photos/seed/store6/800/500",
        },
    ];

    // 중복 실행 방지(옵션): 같은 name+addressDetail이면 스킵
    for (const s of stores) {
        const exists = await prisma.store.findFirst({
            where: {
                name: s.name,
                addr1: s.addr1,
                addr2: s.addr2,
                addressDetail: s.addressDetail,
            },
            select: { id: true },
        });

        if (exists) continue;

        await prisma.store.create({
            data: {
                isActive: true,
                name: s.name,
                category: s.category,
                phone: s.phone,
                addr1: s.addr1,
                addr2: s.addr2,
                addressDetail: s.addressDetail,
                lat: s.lat,
                lng: s.lng,
                description: s.description,
                images: {
                    create: [{ idx: 0, imageUrl: s.thumbUrl }],
                },
            },
        });
    }
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });