import React from 'react';
import { Clock, UserCheck, Users, UserX } from 'lucide-react';

type DashboardStat = {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  border: string;
  iconBg: string;
};

const stats: DashboardStat[] = [
  { label: 'Total Students', value: '398', sub: '13 active classes', icon: Users, border: 'border-t-slate-400', iconBg: 'bg-slate-100 text-slate-700' },
  { label: 'Present Today', value: '342', sub: '85.9% of total', icon: UserCheck, border: 'border-t-emerald-600', iconBg: 'bg-emerald-50 text-emerald-700' },
  { label: 'Absent Today', value: '21', sub: '5.3% of total', icon: UserX, border: 'border-t-rose-600', iconBg: 'bg-rose-50 text-rose-700' },
  { label: 'Pending Classes', value: '35', sub: '2 classes remaining', icon: Clock, border: 'border-t-amber-500', iconBg: 'bg-amber-50 text-amber-700' },
];

export const DashboardCards: React.FC = () => (
  <section className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6" aria-labelledby="dashboard-title">
    <header className="border-b border-slate-200 pb-4">
      <h1 id="dashboard-title" className="text-2xl font-bold text-slate-900">Uswa College Islamabad</h1>
      <p className="text-sm text-slate-600">Daily Attendance &amp; Academic Overview — Admin Dashboard</p>
    </header>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ label, value, sub, icon: Icon, border, iconBg }) => (
        <article key={label} className={`rounded-lg border border-slate-200 border-t-4 bg-white p-5 shadow-sm ${border}`}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</span>
            <span className={`rounded-md p-2 ${iconBg}`} aria-hidden="true"><Icon className="h-5 w-5" /></span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{sub}</p>
        </article>
      ))}
    </div>
  </section>
);

export default DashboardCards;
