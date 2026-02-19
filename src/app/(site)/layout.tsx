import TopNav from "@/components/layout/TopNav";
import "../globals.css";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-dvh bg-gray-50">
            <TopNav />
            <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>

            <footer className="border-t bg-white">
                <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-gray-500">
                    © {new Date().getFullYear()} 콜서비스. All rights reserved.
                </div>
            </footer>
        </div>
    );
}