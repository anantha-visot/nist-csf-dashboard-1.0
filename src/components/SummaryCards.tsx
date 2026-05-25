import { Layers, LayoutGrid, BookOpen } from 'lucide-react';
import type { DashboardData } from '../hooks/useData';
import { TIER_COLORS, TIER_LABELS } from '../utils/tierUtils';

interface Props { data: DashboardData }

const TIERS = ['1', '2', '3', '4'] as const;

const TIER_BG: Record<string, string> = {
  '1': 'bg-slate-500/10 border-slate-500/25',
  '2': 'bg-blue-500/10 border-blue-500/25',
  '3': 'bg-violet-500/10 border-violet-500/25',
  '4': 'bg-cyan-500/10 border-cyan-500/25',
};

export default function SummaryCards({ data }: Props) {
  const { overallTierCounts, totalSubcategories, totalCategories } = data;
  const totalFunctions = data.functions.length;

  return (
    <div className="space-y-4">
      {/* Top row — generic framework counts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Controls Assessed
            </p>
            <BookOpen className="w-4 h-4 text-slate-600" />
          </div>
          <p className="text-3xl font-bold text-white">{totalSubcategories}</p>
          <p className="text-xs text-slate-500 mt-1">NIST CSF 2.0 subcategories</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Functions
            </p>
            <Layers className="w-4 h-4 text-slate-600" />
          </div>
          <p className="text-3xl font-bold text-white">{totalFunctions}</p>
          <p className="text-xs text-slate-500 mt-1">Govern · Identify · Protect · Detect · Respond · Recover</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Categories
            </p>
            <LayoutGrid className="w-4 h-4 text-slate-600" />
          </div>
          <p className="text-3xl font-bold text-white">{totalCategories}</p>
          <p className="text-xs text-slate-500 mt-1">across all 6 functions</p>
        </div>
      </div>

      {/* Tier distribution */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Implementation Tier Distribution — All Controls
        </p>

        {/* Stacked visual bar */}
        <div className="flex h-3 rounded-full overflow-hidden mb-5 gap-px bg-slate-800">
          {TIERS.map(t => {
            const count = overallTierCounts[t] ?? 0;
            const pct   = totalSubcategories ? (count / totalSubcategories) * 100 : 0;
            if (pct === 0) return null;
            return (
              <div
                key={t}
                style={{ width: `${pct}%`, background: TIER_COLORS[t] }}
                title={`${TIER_LABELS[t]}: ${count}`}
              />
            );
          })}
        </div>

        {/* Tier breakdown cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TIERS.map(t => {
            const count = overallTierCounts[t] ?? 0;
            const pct   = totalSubcategories ? Math.round((count / totalSubcategories) * 100) : 0;
            return (
              <div key={t} className={`rounded-lg border p-3 ${TIER_BG[t]}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: TIER_COLORS[t] }} />
                  <span className="text-[11px] font-semibold text-slate-300 leading-tight">
                    {TIER_LABELS[t]}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{count}</p>
                <p className="text-xs text-slate-500 mt-0.5">{pct}% of controls</p>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-600 mt-4 leading-relaxed">
          Implementation Tiers describe the degree to which an organisation's cybersecurity
          risk management practices exhibit the characteristics defined in the NIST CSF 2.0.
          The appropriate tier is determined by the organisation's risk appetite and
          cost-benefit analysis.
        </p>
      </div>
    </div>
  );
}
