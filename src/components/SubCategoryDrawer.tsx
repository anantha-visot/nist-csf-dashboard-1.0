import { X, FileText, Eye, Wrench, Code2, ShieldCheck, Target, MessageSquare } from 'lucide-react';
import type { SubCategory } from '../hooks/useData';
import { getTierBgColor, getTierColor } from '../utils/tierUtils';

interface Props {
  sub: SubCategory;
  onClose: () => void;
}

interface SectionConfig {
  icon: React.ElementType;
  title: string;
  content: string;
  borderColor: string;
  bgColor: string;
  iconColor: string;
  labelColor: string;
  textColor: string;
}

function SectionCard({ icon: Icon, title, content, borderColor, bgColor, iconColor, labelColor, textColor }: SectionConfig) {
  if (!content?.trim()) return null;
  return (
    <div className={`rounded-xl border p-4 ${borderColor} ${bgColor}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`flex items-center justify-center w-6 h-6 rounded-md ${bgColor} border ${borderColor}`}>
          <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
        </div>
        <h4 className={`text-xs font-semibold uppercase tracking-widest ${labelColor}`}>{title}</h4>
      </div>
      <p className={`text-sm leading-relaxed whitespace-pre-wrap ${textColor}`}>{content}</p>
    </div>
  );
}

export default function SubCategoryDrawer({ sub, onClose }: Props) {
  const gap = sub.targetTierScore - sub.currentTierScore;

  const sections: SectionConfig[] = [
    {
      icon: FileText,
      title: 'Description',
      content: sub.description,
      borderColor: 'border-slate-600/40',
      bgColor: 'bg-slate-800/50',
      iconColor: 'text-slate-400',
      labelColor: 'text-slate-400',
      textColor: 'text-slate-300',
    },
    {
      icon: Eye,
      title: 'Understanding of Controls Implemented',
      content: sub.understandingOfControls,
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/[0.07]',
      iconColor: 'text-blue-400',
      labelColor: 'text-blue-300',
      textColor: 'text-slate-300',
    },
    {
      icon: Wrench,
      title: 'Recommendation',
      content: sub.recommendation,
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/[0.07]',
      iconColor: 'text-emerald-400',
      labelColor: 'text-emerald-300',
      textColor: 'text-slate-300',
    },
    {
      icon: Code2,
      title: 'Implementation Examples',
      content: sub.implementationExamples,
      borderColor: 'border-indigo-500/30',
      bgColor: 'bg-indigo-500/[0.07]',
      iconColor: 'text-indigo-400',
      labelColor: 'text-indigo-300',
      textColor: 'text-slate-300',
    },
    {
      icon: ShieldCheck,
      title: 'Controls Checks',
      content: sub.controlsChecks,
      borderColor: 'border-purple-500/30',
      bgColor: 'bg-purple-500/[0.07]',
      iconColor: 'text-purple-400',
      labelColor: 'text-purple-300',
      textColor: 'text-slate-300',
    },
    {
      icon: Target,
      title: 'Target Tier Comments',
      content: sub.targetTierComments,
      borderColor: 'border-amber-500/30',
      bgColor: 'bg-amber-500/[0.07]',
      iconColor: 'text-amber-400',
      labelColor: 'text-amber-300',
      textColor: 'text-slate-300',
    },
    {
      icon: MessageSquare,
      title: 'Client Comments',
      content: sub.clientComments,
      borderColor: 'border-yellow-500/30',
      bgColor: 'bg-yellow-500/[0.07]',
      iconColor: 'text-yellow-400',
      labelColor: 'text-yellow-300',
      textColor: 'text-slate-300',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-2xl bg-[#0d1117] border-l border-slate-800 h-full flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="flex-shrink-0 bg-[#0d1117]/95 backdrop-blur border-b border-slate-800 px-5 pt-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2 py-0.5 rounded">
                  {sub.code}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white leading-snug">
                {sub.description?.split('\n')[0]}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tier score row */}
          <div className="flex items-stretch gap-3 mt-4">
            <div className={`flex-1 rounded-lg border p-3 ${getTierBgColor(sub.currentTierScore)}`}>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">Current</p>
              <p className="font-bold text-xl leading-none" style={{ color: getTierColor(sub.currentTierScore) }}>
                {sub.currentTierScore}.0
              </p>
              <p className="text-[11px] text-slate-400 mt-1 leading-tight">{sub.currentTier}</p>
            </div>

            <div className="flex items-center justify-center px-1">
              <div className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap
                ${gap > 0
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/25'
                  : 'text-green-400 bg-green-500/10 border border-green-500/25'
                }`}>
                {gap > 0 ? `▲ +${gap} gap` : '✓ On target'}
              </div>
            </div>

            <div className="flex-1 rounded-lg border border-cyan-500/25 bg-cyan-500/[0.07] p-3">
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">Target</p>
              <p className="font-bold text-xl leading-none text-cyan-400">{sub.targetTierScore}.0</p>
              <p className="text-[11px] text-cyan-300/60 mt-1 leading-tight">{sub.targetTier}</p>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto max-h-[85vh]">
          <div className="px-5 py-4 space-y-3">
            {sections.map((s) => (
              <SectionCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
