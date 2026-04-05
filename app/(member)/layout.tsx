'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/member', label: 'Dashboard' },
    { href: '/member/workouts', label: 'My Workout' },
    { href: '/member/diet', label: 'My Diet' },
    { href: '/member/calorie-tracker', label: 'Calorie Tracker' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0A1118] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-6 flex flex-col hidden md:flex">
        <h2 className="text-xl font-bold text-orange-500 mb-8">Fusion24 Member</h2>
        <nav className="flex flex-col gap-4 text-sm text-slate-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-orange-400 cursor-pointer transition-colors ${
                pathname === item.href ? 'text-orange-400 font-medium' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar Placeholder */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/30 flex items-center px-6 justify-between">
          <div className="font-semibold text-slate-200">Member Portal</div>
          <div className="text-sm text-slate-400">Member User</div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
