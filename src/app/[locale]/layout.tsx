import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

interface AppLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AppLayout({ children, params }: AppLayoutProps) {
  await params; // Ensure params are resolved even though we don't use locale here

  return (
    <div data-wrapper="" className="border-grid flex flex-1 flex-col">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}