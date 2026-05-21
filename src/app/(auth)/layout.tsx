import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-green-700 hover:text-green-900 text-sm font-medium transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Về trang chủ
        </Link>
      </div>

      {/* Centered form */}
      <div className="flex-1 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
