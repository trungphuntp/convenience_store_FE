import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlobalLoading from '@/components/ui/GlobalLoading';
import AuthInitializer from '@/components/layout/AuthInitializer';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AuthInitializer />
      <GlobalLoading />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
