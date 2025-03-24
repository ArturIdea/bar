import AdminNavbar from '@/ui/components/Dashboard/AdminNavbar/AdminNavbar';
import { AdminSidebar } from '@/ui/components/Dashboard/AdminSidebar/AdminSidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
