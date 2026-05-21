'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { authService } from '@/features/auth/services/auth.service';
import { setUser } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store';
import FormCustom, { FormItemCustom, useFormCustom } from '@/components/ui/FormCustom';
import InputCustom, { InputPasswordCustom } from '@/components/ui/InputCustom';
import ButtonCustom from '@/components/ui/ButtonCustom';
import DividerCustom from '@/components/ui/DividerCustom';
import type { LoginRequest } from '@/features/auth/types/auth.type';

const GOOGLE_OAUTH_URL = 'http://localhost:8080/oauth2/authorization/google';

export default function LoginPage() {
  const [form] = useFormCustom<LoginRequest>();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const res = await authService.login(values);
      dispatch(setUser(res.data));
      toast.success('Đăng nhập thành công!');
      router.push('/');
    } catch {
      // interceptor already toasted the BE error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center justify-center gap-1 mb-2 hover:opacity-80 transition-opacity">
          <span className="text-orange-400 font-black text-4xl">7</span>
          <span className="text-green-700 font-bold text-2xl">-Eleven Store</span>
        </Link>
        <p className="text-gray-500 text-sm">Đăng nhập để tiếp tục mua sắm</p>
      </div>

      <FormCustom<LoginRequest> form={form} onFinish={handleLogin} layout="vertical" size="large">
        <FormItemCustom
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        >
          <InputCustom placeholder="Nhập địa chỉ email" />
        </FormItemCustom>

        <FormItemCustom
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <InputPasswordCustom placeholder="Nhập mật khẩu" />
        </FormItemCustom>

        <FormItemCustom className="mt-2">
          <ButtonCustom
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-green-700! border-green-700! hover:bg-green-600!"
            size="large"
          >
            Đăng nhập
          </ButtonCustom>
        </FormItemCustom>
      </FormCustom>

      <DividerCustom plain>hoặc</DividerCustom>

      <ButtonCustom
        type="default"
        size="large"
        onClick={() => { window.location.href = GOOGLE_OAUTH_URL; }}
        className="w-full flex items-center justify-center gap-2"
        icon={<GoogleIcon />}
      >
        Đăng nhập với Google
      </ButtonCustom>

      <p className="text-center mt-6 text-sm text-gray-500">
        Chưa có tài khoản?{' '}
        <Link href="/register" className="text-green-700 font-semibold hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.342 17.64 12.034 17.64 9.2z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}
