import AdminSidebar from '@/components/admin/AdminSidebar';
import RequireAuth from '@/components/auth/RequireAuth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth adminOnly redirectTo="/login">
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </RequireAuth>
  );
}
