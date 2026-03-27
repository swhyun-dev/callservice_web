export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/db";

export default async function SupportPage() {
    const page = await prisma.page.findFirst({ where: { slug: "support", isActive: true } });

    return (
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h1 className="text-xl font-semibold text-gray-900">{page?.title ?? "고객센터"}</h1>
            <div className="mt-4 prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: page?.content ?? "<p>내용을 준비중입니다.</p>" }} />
            </div>
        </div>
    );
}