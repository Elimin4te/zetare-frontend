export type ComparisonTarget = 'previousMonth' | 'previousYear' | 'projected';

export type ComparisonTimeframe = 'month' | 'year';

export interface ComparisonTargetInfo {
  value: ComparisonTarget;
  labelId: string;
  timeframe: ComparisonTimeframe;
}

export const comparisonTargetOptions: ComparisonTargetInfo[] = [
  {
    value: 'previousYear',
    labelId: 'sales-vs-previous-year',
    timeframe: 'year'
  },
  {
    value: 'previousMonth',
    labelId: 'sales-vs-previous-month',
    timeframe: 'month'
  }
];

export function getComparisonLabelId(target: ComparisonTarget): string {
  if (target === 'previousMonth') return 'sales-vs-previous-month';
  if (target === 'previousYear') return 'sales-vs-previous-year';
  return 'sales-vs-previous-projected';
}

export function getComparisonTimeframe(target: ComparisonTarget): 'month' | 'year' | 'projected' {
  if (target === 'previousMonth') return 'month';
  if (target === 'previousYear') return 'year';
  return 'projected';
}
