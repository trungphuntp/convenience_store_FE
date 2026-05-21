'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppstoreOutlined,
  TagsOutlined,
  OrderedListOutlined,
  HomeOutlined,
} from '@ant-design/icons';

const NAV = [
  { href: '/admin/products',   label: 'Sản phẩm',  icon: <AppstoreOutlined /> },
  { href: '/admin/categories', label: 'Danh mục',  icon: <TagsOutlined /> },
  { href: '/admin/orders',     label: 'Đơn hàng',  icon: <OrderedListOutlined /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-green-800 min-h-screen flex flex-col shrink-0">
      {/* Brand */}
      <div className="px-5 py-4 border-b border-green-700">
        <p className="text-xs text-green-400 uppercase tracking-widest mb-0.5">Quản trị</p>
        <div className="flex items-center gap-1">
          <span className="text-orange-400 font-black text-xl">7</span>
          <span className="text-white font-bold text-base">-Eleven</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
                active
                  ? 'bg-green-600 text-white border-r-2 border-orange-400'
                  : 'text-green-200 hover:bg-green-700 hover:text-white'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-green-700">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg bg-green-700 text-green-100 hover:bg-green-600 hover:text-white transition-colors"
        >
          <HomeOutlined />
          Về trang chủ
        </Link>
      </div>
    </aside>
  );
}
