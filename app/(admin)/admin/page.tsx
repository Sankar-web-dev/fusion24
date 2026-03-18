export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
      <p className="text-slate-400">Welcome to the Admin Dashboard.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
          <div className="text-sm text-slate-400 mb-2">Total Members</div>
          <div className="text-3xl font-bold text-white">0</div>
        </div>
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
          <div className="text-sm text-slate-400 mb-2">Active Memberships</div>
          <div className="text-3xl font-bold text-white">0</div>
        </div>
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
          <div className="text-sm text-slate-400 mb-2">Pending Payments</div>
          <div className="text-3xl font-bold text-orange-500">0</div>
        </div>
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
          <div className="text-sm text-slate-400 mb-2">Today's Attendance</div>
          <div className="text-3xl font-bold text-green-500">0</div>
        </div>
      </div>
    </div>
  );
}