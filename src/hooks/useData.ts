import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export interface SubCategory {
  code: string;
  description: string;
  implementationExamples: string;
  informativeReferences: string;
  controlsChecks: string;
  understandingOfControls: string;
  currentTierScore: number;
  currentImplementationTier: string;
  recommendation: string;
  clientComments: string;
}

export interface TierCounts {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
}

export interface Category {
  code: string;
  name: string;
  subcategories: SubCategory[];
  tierCounts: TierCounts;
}

export interface FunctionData {
  name: string;
  code: string;
  categories: Category[];
  tierCounts: TierCounts;
  totalSubcategories: number;
}

export interface DashboardData {
  functions: FunctionData[];
  overallTierCounts: TierCounts;
  totalSubcategories: number;
  totalCategories: number;
}

const FUNCTION_ORDER = ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'];

function emptyTierCounts(): TierCounts {
  return { '1': 0, '2': 0, '3': 0, '4': 0 };
}

function addTierCounts(a: TierCounts, b: TierCounts): TierCounts {
  return {
    '1': a['1'] + b['1'],
    '2': a['2'] + b['2'],
    '3': a['3'] + b['3'],
    '4': a['4'] + b['4'],
  };
}

export function useData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/nist-csf-data.csv')
      .then(res => res.text())
      .then(text => {
        const result = Papa.parse(text, { header: true, skipEmptyLines: true });
        const rows = result.data as Record<string, string>[];

        // Group by function → category → subcategory
        const fnMap = new Map<string, Map<string, SubCategory[]>>();

        for (const r of rows) {
          const fn      = r['function'];
          const catCode = r['category_code'];
          if (!fnMap.has(fn)) fnMap.set(fn, new Map());
          const catMap = fnMap.get(fn)!;
          if (!catMap.has(catCode)) catMap.set(catCode, []);

          catMap.get(catCode)!.push({
            code:                    r['subcategory_code'],
            description:             r['subcategory_description'],
            implementationExamples:  r['implementation_examples'],
            informativeReferences:   r['informative_references'],
            controlsChecks:          r['controls_checks'],
            understandingOfControls: r['Understanding_of_controls_Implemented'],
            currentTierScore:        parseFloat(r['current_tier_score']) || 0,
            currentImplementationTier: r['current_Implementation_tier'],
            recommendation:          r['recommendation'],
            clientComments:          r['client_comments'],
          });
        }

        // Lookup maps
        const catNameMap = new Map<string, string>();
        for (const r of rows) catNameMap.set(r['category_code'], r['category_name']);
        const fnCodeMap = new Map<string, string>();
        for (const r of rows) fnCodeMap.set(r['function'], r['functionCode']);

        const functions: FunctionData[] = FUNCTION_ORDER.map(fnName => {
          const catMap = fnMap.get(fnName) ?? new Map();

          const categories: Category[] = Array.from(catMap.entries()).map(([code, subs]) => {
            const tierCounts = emptyTierCounts();
            for (const s of subs) {
              const t = String(Math.round(s.currentTierScore)) as keyof TierCounts;
              if (tierCounts[t] !== undefined) tierCounts[t]++;
            }
            return { code, name: catNameMap.get(code) ?? code, subcategories: subs, tierCounts };
          });

          const fnTierCounts = categories.reduce(
            (acc, c) => addTierCounts(acc, c.tierCounts),
            emptyTierCounts()
          );

          return {
            name: fnName,
            code: fnCodeMap.get(fnName) ?? '',
            categories,
            tierCounts: fnTierCounts,
            totalSubcategories: categories.reduce((s, c) => s + c.subcategories.length, 0),
          };
        });

        const overallTierCounts   = functions.reduce((acc, f) => addTierCounts(acc, f.tierCounts), emptyTierCounts());
        const totalSubcategories  = functions.reduce((s, f) => s + f.totalSubcategories, 0);
        const totalCategories     = functions.reduce((s, f) => s + f.categories.length, 0);

        setData({ functions, overallTierCounts, totalSubcategories, totalCategories });
        setLoading(false);
      })
      .catch(err => {
        setError(String(err));
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
