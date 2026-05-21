'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authService } from '@/features/auth/services/auth.service';
import FormCustom, { FormItemCustom, useFormCustom } from '@/components/ui/FormCustom';
import InputCustom, { InputPasswordCustom } from '@/components/ui/InputCustom';
import ButtonCustom from '@/components/ui/ButtonCustom';
import type { RegisterRequest } from '@/features/auth/types/auth.type';

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{};':"\\|,.<>/?]).{12,100}$/;

export default function RegisterPage() {
  const [form] = useFormCustom<RegisterRequest>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (values: RegisterRequest) => {
    setLoading(true);
    setError('');
    try {
      await authService.register(values);
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      router.push('/login');
    } catch (err) {
      setError((err as Error).message || 'Đăng ký thất bại');
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
        <p className="text-gray-500 text-sm">Tạo tài khoản mới</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <FormCustom<RegisterRequest> form={form} onFinish={handleRegister} layout="vertical" size="large">
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
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
        >
          <InputCustom placeholder="Nhập họ và tên đầy đủ" />
        </FormItemCustom>

        <FormItemCustom
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' },
            {
              pattern: PASSWORD_REGEX,
              message: 'Mật khẩu 12–100 ký tự, gồm chữ thường, chữ hoa, số và ký tự đặc biệt',
            },
          ]}
        >
          <InputPasswordCustom placeholder="Nhập mật khẩu" />
        </FormItemCustom>

        <p className="text-xs text-gray-400 -mt-3 mb-4">
          Mật khẩu từ 12–100 ký tự, ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt.
        </p>

        <FormItemCustom>
          <ButtonCustom
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full bg-green-700! border-green-700! hover:bg-green-600!"
            size="large"
          >
            Đăng ký
          </ButtonCustom>
        </FormItemCustom>
      </FormCustom>

      <p className="text-center mt-4 text-sm text-gray-500">
        Đã có tài khoản?{' '}
        <Link href="/login" className="text-green-700 font-semibold hover:underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
