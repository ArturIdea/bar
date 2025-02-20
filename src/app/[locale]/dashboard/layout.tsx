import AdminNavbar from '@/ui/components/Dashboard/AdminNavbar/AdminNavbar';
import { AdminSidebar } from '@/ui/components/Dashboard/AdminSidebar/AdminSidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', overflow: 'auto' }}>
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out">
        <AdminNavbar />
        <div>{children}</div>
      </main>
    </div>
  );
}
