export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#0A1118] text-white overflow-hidden">
      {/* Sidebar Placeholder */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-6 flex flex-col hidden md:flex">
        <h2 className="text-xl font-bold text-orange-500 mb-8">Fusion24 Admin</h2>
        <nav className="flex flex-col gap-4 text-sm text-slate-300">
          <div className="hover:text-orange-400 cursor-pointer">Dashboard</div>
          <div className="hover:text-orange-400 cursor-pointer">Memberships</div>
          <div className="hover:text-orange-400 cursor-pointer">Members</div>
          <div className="hover:text-orange-400 cursor-pointer">Trainers</div>
          <div className="hover:text-orange-400 cursor-pointer">Payments</div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar Placeholder */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/30 flex items-center px-6 justify-between">
          <div className="font-semibold text-slate-200">Admin Portal</div>
          <div className="text-sm text-slate-400">Admin User</div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
