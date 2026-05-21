'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined, LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonCustom from '@/components/ui/ButtonCustom';
import AvatarCustom from '@/components/ui/AvatarCustom';
import PopoverCustom from '@/components/ui/PopoverCustom';
import CartDropdown from '@/features/cart/components/CartDropdown';
import { selectAuthUser, selectIsAuthenticated, clearUser } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';
import { authService } from '@/features/auth/services/auth.service';
import { useCart } from '@/features/cart/hooks/useCart';

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);
  const { cartCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // backend clears cookie regardless
    } finally {
      dispatch(clearUser());
      router.push('/');
    }
  };

  return (
    <header className="bg-green-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-orange-400 font-black text-2xl">7</span>
          <span className="text-white font-bold text-lg">-Eleven Store</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-white hover:text-orange-300 transition-colors text-sm font-medium"
          >
            Trang chủ
          </Link>
          {user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="text-white hover:text-orange-300 transition-colors text-sm font-medium"
            >
              Quản trị
            </Link>
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Cart popover */}
          <PopoverCustom
            content={<CartDropdown />}
            trigger="click"
            open={cartOpen}
            onOpenChange={setCartOpen}
            placement="bottomRight"
            arrow={false}
            styles={{ body: { padding: '12px' } }}
          >
            <ButtonCustom
              type="default"
              size="middle"
              icon={<ShoppingCartOutlined />}
              className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
            >
              Giỏ hàng
              {cartCount > 0 && (
                <span className="ml-1 bg-orange-400 text-white text-xs font-bold rounded-full px-1.5 py-0.5 leading-none">
                  {cartCount}
                </span>
              )}
            </ButtonCustom>
          </PopoverCustom>

          {/* User section */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <AvatarCustom
                icon={<UserOutlined />}
                className="bg-orange-400 cursor-pointer"
                size="default"
              />
              <span className="text-sm font-medium text-white hidden sm:block">
                {user.fullName}
              </span>
              <ButtonCustom
                type="text"
                size="small"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                className="text-white! hover:text-orange-300!"
              >
                <span className="hidden sm:inline">Đăng xuất</span>
              </ButtonCustom>
            </div>
          ) : (
            <Link href="/login">
              <ButtonCustom
                type="default"
                size="middle"
                className="border-white text-white hover:bg-white! hover:text-green-700!"
              >
                Đăng nhập
              </ButtonCustom>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
