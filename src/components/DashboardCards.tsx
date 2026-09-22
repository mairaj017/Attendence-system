import React from 'react';
import { Clock, UserCheck, Users, UserX } from 'lucide-react';

type DashboardStat = { label: string; value: string; sub: string; icon: React.ElementType; border: string; iconBg: string };
const stats: DashboardStat[] = [
  { label: 'Total Students', value: '398', sub: '13 active classes', icon: Users, border: 'border-t-slate-400', iconBg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  { label: 'Present Today', value: '342', sub: '85.9% of total', icon: UserCheck, border: 'border-t-emerald-600', iconBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' },
  { label: 'Absent Today', value: '21', sub: '5.3% of total', icon: UserX, border: 'border-t-rose-600', iconBg: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' },
  { label: 'Pending Classes', value: '35', sub: '2 classes remaining', icon: Clock, border: 'border-t-amber-500', iconBg: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' },
];

export const DashboardCards: React.FC = () => <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Attendance summary">{stats.map(({ label, value, sub, icon: Icon, border, iconBg }) => <article key={label} className={`rounded-2xl border border-slate-200 border-t-4 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${border}`}><div className="mb-4 flex items-center justify-between gap-3"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</span><span className={`rounded-xl p-2.5 ${iconBg}`} aria-hidden="true"><Icon className="h-5 w-5" /></span></div><p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{sub}</p></article>)}</section>;
export default DashboardCards;
