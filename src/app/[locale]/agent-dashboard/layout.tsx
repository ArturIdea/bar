import { AdminSidebar } from '@/ui/components/Dashboard/AdminSidebar/AdminSidebar';
import AgentNavbar from '@/ui/components/Dashboard/AgentNavbar/AgentNavbar';

export default async function AgentDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <AgentNavbar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
