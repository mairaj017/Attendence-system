import { useEffect, useState } from 'react';
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  LayoutDashboard,
  Menu,
  Moon,
  PanelLeftClose,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { DashboardCards } from './components/DashboardCards';

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Attendance', icon: ClipboardCheck },
  { label: 'Students', icon: Users },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Settings', icon: Settings },
];

const activity = [
  { name: 'Grade 10 — Computer Science', teacher: 'Sarah Ahmed', time: '09:00 AM', status: 'Present', color: 'emerald' },
  { name: 'Grade 9 — Mathematics', teacher: 'Usman Ali', time: '10:30 AM', status: 'Present', color: 'emerald' },
  { name: 'Grade 11 — Physics', teacher: 'Ayesha Khan', time: '11:45 AM', status: 'Pending', color: 'amber' },
  { name: 'Grade 8 — English', teacher: 'Hassan Raza', time: '01:00 PM', status: 'Absent', color: 'rose' },
];

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('attendance-theme') === 'dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('Dashboard');
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('attendance-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const filteredActivity = activity.filter((item) =>
    `${item.name} ${item.teacher}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {sidebarOpen && <button className="fixed inset-0 z-30 bg-slate-950/60 lg:hidden" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'lg:w-20' : 'lg:w-72'}`}>
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
          {!collapsed && <div><p className="text-lg font-bold tracking-tight text-indigo-600 dark:text-indigo-400">Attendence<span className="text-slate-900 dark:text-white">.io</span></p><p className="text-xs text-slate-500">Admin workspace</p></div>}
          <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800" aria-label="Close menu"><X className="h-5 w-5" /></button>
          <button onClick={() => setCollapsed(!collapsed)} className="hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:block dark:hover:bg-slate-800" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <Menu className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}</button>
        </div>
        <nav className="flex-1 space-y-1 p-4" aria-label="Main navigation">
          {!collapsed && <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Workspace</p>}
          {navigation.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActive(label); setSidebarOpen(false); }} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active === label ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`} title={collapsed ? label : undefined}><Icon className="h-5 w-5 shrink-0" />{!collapsed && <span>{label}</span>}{!collapsed && label === 'Attendance' && <span className="ml-auto rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">Live</span>}</button>)}
        </nav>
        <div className="m-4 rounded-2xl bg-indigo-600 p-4 text-white shadow-lg shadow-indigo-600/20">{!collapsed && <><ShieldCheck className="mb-3 h-6 w-6" /><p className="text-sm font-semibold">Secure attendance</p><p className="mt-1 text-xs text-indigo-100">Your data is protected and synced.</p></>}</div>
      </aside>

      <div className={`transition-all ${collapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-8 dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center gap-3"><button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu className="h-6 w-6" /></button><div><p className="text-sm text-slate-500 dark:text-slate-400">Good morning, Admin</p><h2 className="font-semibold">{active}</h2></div></div>
          <div className="flex items-center gap-2 sm:gap-4"><label className="relative hidden sm:block"><span className="sr-only">Search classes and teachers</span><Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search activity..." className="w-48 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none ring-indigo-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800" /></label><button onClick={() => setDark(!dark)} className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button><button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="View notifications"><Bell className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" /></button><div className="hidden items-center gap-2 border-l border-slate-200 pl-4 sm:flex dark:border-slate-700"><div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"><UserRound className="h-5 w-5" /></div><div className="hidden xl:block"><p className="text-xs font-semibold">Mairaj Khan</p><p className="text-[11px] text-slate-500">Administrator</p></div><ChevronDown className="h-4 w-4 text-slate-400" /></div></div>
        </header>

        <main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">Tuesday, September 22, 2026</p><h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Uswa College Islamabad</h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Daily attendance and academic overview</p></div><button className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700"><CheckCircle2 className="h-4 w-4" />Mark attendance</button></div>
          <DashboardCards />
          <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]" aria-label="Attendance insights">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="mb-6 flex items-center justify-between"><div><h2 className="font-semibold">Weekly attendance</h2><p className="text-xs text-slate-500 dark:text-slate-400">Average attendance by day</p></div><select className="rounded-lg border border-slate-200 bg-transparent px-2 py-1 text-xs dark:border-slate-700"><option>Last 7 days</option></select></div><div className="flex h-48 items-end gap-2 sm:gap-5">{[['Mon',72],['Tue',86],['Wed',78],['Thu',91],['Fri',84],['Sat',64],['Sun',0]].map(([day, value]) => <div key={day as string} className="flex flex-1 flex-col items-center gap-2"><span className="text-[10px] text-slate-500">{value ? `${value}%` : '—'}</span><div className="flex h-32 w-full items-end rounded-t-lg bg-slate-100 dark:bg-slate-800"><div className="w-full rounded-t-lg bg-indigo-500 transition-all hover:bg-indigo-400" style={{ height: `${value}%` }} /></div><span className="text-[11px] text-slate-500">{day}</span></div>)}</div></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="mb-5 flex items-center justify-between"><div><h2 className="font-semibold">Today's breakdown</h2><p className="text-xs text-slate-500 dark:text-slate-400">398 registered students</p></div><span className="text-xs font-medium text-emerald-600">85.9% overall</span></div><div className="mx-auto mb-6 grid h-40 w-40 place-items-center rounded-full" style={{ background: 'conic-gradient(#10b981 0 85.9%, #f59e0b 85.9% 91.2%, #f43f5e 91.2% 96.5%, #cbd5e1 96.5% 100%)' }}><div className="grid h-28 w-28 place-items-center rounded-full bg-white dark:bg-slate-900"><span className="text-2xl font-bold">342</span></div></div><div className="grid grid-cols-3 gap-2 text-center text-xs"><div><span className="mx-auto mb-1 block h-2 w-2 rounded-full bg-emerald-500" />Present<br /><b>342</b></div><div><span className="mx-auto mb-1 block h-2 w-2 rounded-full bg-rose-500" />Absent<br /><b>21</b></div><div><span className="mx-auto mb-1 block h-2 w-2 rounded-full bg-amber-500" />Pending<br /><b>35</b></div></div></div>
          </section>
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800"><div><h2 className="font-semibold">Class activity</h2><p className="text-xs text-slate-500 dark:text-slate-400">Latest attendance updates</p></div><button className="text-left text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">View all activity →</button></div><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800/50"><tr><th className="px-5 py-3 font-medium">Class</th><th className="px-5 py-3 font-medium">Teacher</th><th className="px-5 py-3 font-medium">Time</th><th className="px-5 py-3 font-medium">Status</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800">{filteredActivity.map((item) => <tr key={item.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td className="px-5 py-4 font-medium">{item.name}</td><td className="px-5 py-4 text-slate-500 dark:text-slate-400">{item.teacher}</td><td className="px-5 py-4 text-slate-500 dark:text-slate-400">{item.time}</td><td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${item.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : item.color === 'amber' ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'}`}>{item.status}</span></td></tr>)}</tbody></table>{filteredActivity.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No matching activity found.</p>}</div></section>
        </main>
      </div>
    </div>
  );
}

export default App;
