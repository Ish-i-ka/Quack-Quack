// apps/participant-client/app/dashboard/layout.tsx
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}