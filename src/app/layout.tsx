import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ReduxProvider from '@/providers/ReduxProvider';
import QueryProvider from '@/providers/QueryProvider';
import ToastProvider from '@/providers/ToastProvider';
import './globals.css';

export const metadata: Metadata = {
  title: '7-Eleven Vietnam',
  description: 'Cửa hàng tiện lợi trực tuyến',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning>
        <AntdRegistry>
          <ReduxProvider>
            <QueryProvider>
              <ToastProvider />
              {children}
            </QueryProvider>
          </ReduxProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
