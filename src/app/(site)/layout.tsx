import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import "../globals.css";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-dvh bg-gray-50 text-gray-900">
            <TopNav />

            <main className="mx-auto w-full max-w-6xl px-4 py-6">
                {children}
            </main>

            <Footer />
        </div>
    );
}