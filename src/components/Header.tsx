import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex-shrink-0">
          <Shield className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-white leading-tight">
            NIST CSF Implementation Tier Dashboard
          </h1>
        </div>
      </div>
    </header>
  );
}
