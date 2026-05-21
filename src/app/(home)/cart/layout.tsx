import RequireAuth from '@/components/auth/RequireAuth';

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <RequireAuth redirectTo="/login">{children}</RequireAuth>;
}
