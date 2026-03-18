export default function MemberDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
      <p className="text-slate-400">Welcome to your fitness hub.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
          <div className="text-sm text-slate-400 mb-2">Membership Status</div>
          <div className="text-2xl font-bold text-green-500">Active</div>
        </div>
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
          <div className="text-sm text-slate-400 mb-2">Next Workout</div>
          <div className="text-2xl font-bold text-white">Chest & Triceps</div>
        </div>
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
          <div className="text-sm text-slate-400 mb-2">Daily Calories</div>
          <div className="text-2xl font-bold text-orange-500">1,800 / 2,400</div>
        </div>
      </div>
    </div>
  );
}