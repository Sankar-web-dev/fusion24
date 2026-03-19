import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen w-full bg-[#0A1118] text-white overflow-hidden">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/30 flex items-center px-6 justify-between shrink-0 w-full z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-orange-500">Fusion24 Admin</h2>
        </div>
        <div className="text-sm text-slate-400">Admin User</div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-6 hidden md:flex flex-col shrink-0">
          <nav className="flex flex-col gap-4 text-sm text-slate-300">
            <Link href="/admin" className="hover:text-orange-400 cursor-pointer">Dashboard</Link>
            <Link href="/admin/memberships" className="hover:text-orange-400 cursor-pointer">Memberships</Link>
            <Link href="/admin/members" className="hover:text-orange-400 cursor-pointer">Members</Link>
            <Link href="/admin/trainers" className="hover:text-orange-400 cursor-pointer">Trainers</Link>
            <Link href="/admin/payments" className="hover:text-orange-400 cursor-pointer">Payments</Link>
            <Link href="/admin/workouts" className="hover:text-orange-400 cursor-pointer">Workouts</Link>
            <Link href="/admin/diets" className="hover:text-orange-400 cursor-pointer">Diets</Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
